__author__ = 'levhita'

import tweepy
import json
from pymongo import MongoClient
import ConfigParser

# Listener responable de recibir los datos
class StdOutListener(tweepy.StreamListener):
    def on_data(self, data):
        global db
        
        decoded = json.loads(data)
        if decoded['geo'] is not None:
            processed = {}
            processed['id_str'] = decoded['id_str']
            processed['text'] = decoded['text']
            processed['timestamp_ms'] = decoded['timestamp_ms']
            processed['latitude'] = decoded['geo']['coordinates'][0]
            processed['longitude'] = decoded['geo']['coordinates'][1]
            processed['user_id'] = decoded['user']['id']
            processed['user_name'] = decoded['user']['name'] 
            processed['screen_name'] = decoded['user']['screen_name']
            processed['picture'] = decoded['user']['profile_image_url_https']

            db.twitts.insert(processed)
            
            # Ignorar caracteres no ASCII
            print '@%s: %s' % (decoded['user']['screen_name'], decoded['text'].encode('ascii', 'ignore'))
        else:

            print '(Not Geo) @%s: %s' % (decoded['user']['screen_name'], decoded['text'].encode('ascii', 'ignore'))
            if decoded['coordinates'] is not None:
                print 'But coordinates exists'
        return True

    def on_error(self, status):
        print status

if __name__ == '__main__':
    config = ConfigParser.RawConfigParser()   
    configFilePath = 'config.ini'
    config.read(configFilePath)

    #Tlajomulco, Tesistan, El Salto
    capture_region = [float(config.get('region', 'left')),float(config.get('region', 'bottom')), float(config.get('region', 'right')), float(config.get('region', 'top'))]
   
    client = MongoClient(config.get('mongo', 'connection_string'))
    db = client[config.get('mongo', 'db_name')]
    
    l = StdOutListener()
    auth = tweepy.OAuthHandler(config.get('twitter', 'consumer_key'), config.get('twitter', 'consumer_secret'))
    auth.set_access_token(config.get('twitter', 'access_token'), config.get('twitter', 'access_token_secret'))
    
    print "Collecting Twitts"

    # Existen diversos tipos de streams: public stream, user stream, multi-user streams
    # Mas detalles en https://dev.twitter.com/docs/streaming-apis
    stream = tweepy.Stream(auth, l)
    stream.filter(locations=capture_region)
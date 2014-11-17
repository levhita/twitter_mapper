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
        db.twitts.insert(decoded)
        # Ignorar caracteres no ASCII
        print '@%s: %s' % (decoded['user']['screen_name'], decoded['text'].encode('ascii', 'ignore'))
        # twitter_mapper.twitts
        print ''
        return True

    def on_error(self, status):
        print status

if __name__ == '__main__':
    config = ConfigParser.RawConfigParser()   
    configFilePath = 'config.ini'
    config.read(configFilePath)

    #Tlajomulco, Tesistan, El Salto
    capture_region = [float(config.get('region', 'left')),float(config.get('region', 'bottom')), float(config.get('region', 'right')), float(config.get('region', 'top'))]
   
    client = MongoClient(config.get('mongo', 'host'), int(config.get('mongo', 'port')))
    db = client.twitter_mapper
    
    l = StdOutListener()
    auth = tweepy.OAuthHandler(config.get('twitter', 'consumer_key'), config.get('twitter', 'consumer_secret'))
    auth.set_access_token(config.get('twitter', 'access_token'), config.get('twitter', 'access_token_secret'))
    
    print "Capturing Twitts"

    # Existen diversos tipos de streams: public stream, user stream, multi-user streams
    # Mas detalles en https://dev.twitter.com/docs/streaming-apis
    stream = tweepy.Stream(auth, l)
    stream.filter(locations=capture_region)
var express = require('express');
var router = express.Router();

/* GET twitts listing. */
router.get('/', function(req, res) {
	var tweets_collection = db.collection('twitts');
	var results = [];
	var results_string = "";
	var query = {};
	var options = {'sort': [['_id', 'desc']]};
	
	if(typeof req.query.limit !=='undefined'){
		options.limit=req.query.limit;
	}

	if( (typeof req.query.older_than !=='undefined') && (typeof req.query.younger_than !=='undefined') ){
		var older_than = (parseInt(req.query.older_than) + (6*60*60)) + '000';
		var younger_than = (parseInt(req.query.younger_than) + (6*60*60)) +'000';
		query.timestamp_ms = { $gt :  older_than, $lt : younger_than};
	} else {
		if(typeof req.query.younger_than !=='undefined'){
			var younger_than = (parseInt(req.query.younger_than) + (6*60*60))+'000';
			query.timestamp_ms = {$lt : younger_than};
		}
		if(typeof req.query.older_than !=='undefined'){
			var older_than = (parseInt(req.query.older_than) + (6*60*60))+ '000';
			query.timestamp_ms = {$gt : older_than};
		}
	}
	
	if(typeof req.query.search !=='undefined'){
		query.text = {$regex : ".*"+req.query.search+".*"}
	}
	var as_text=false;
	if(typeof req.query.as_text !=='undefined'){
		as_text=true;
	}

	if(typeof req.query.user_id !=='undefined'){
		query.user_id = req.query.user_id;
	}

	if(typeof req.query.screen_name !=='undefined'){
		query.screen_name = req.query.screen_name;
	}

	var direction='both';
	if ( typeof req.query.direction !=='undefined' ) {
		direction = req.query.direction;
	}

	if ( typeof req.query.region_lat1 !=='undefined' && typeof req.query.region_lng1 !=='undefined' && typeof req.query.region_lat2 !=='undefined' && typeof req.query.region_lng2 !=='undefined' ) {
		var region1 = {'latitude': parseFloat(req.query.region_lat1), 'longitude': parseFloat(req.query.region_lng1)};
		var region2 = {'latitude': parseFloat(req.query.region_lat2), 'longitude': parseFloat(req.query.region_lng2)};
	}
	
	tweets_collection.find(query, options, function(err, tweets) {
		var tweets_locations = [];
		var lines = [];
		
		tweets.each( function(err, tweet) {

			if (tweet !== null) {
				tweet.latitude = parseFloat(tweet.latitude);
				tweet.longitude = parseFloat(tweet.longitude);

				if(typeof tweets_locations[tweet.user_id] == 'undefined'){
					/** First locations known for this user **/
					tweets_locations[tweet.user_id]=[{
						'latitude': tweet.latitude,
						'longitude': tweet.longitude,
						'timestamp_ms': tweet.timestamp_ms,
					}];
				} else {
					var last_location  = tweets_locations[tweet.user_id].slice(-1)[0];
					var latitude_diff  = last_location.latitude - tweet.latitude;
					var longitude_diff = last_location.longitude - tweet.longitude;

					if( Math.abs(latitude_diff) > 0.005  || Math.abs(longitude_diff) > 0.005 ){

						tweets_locations[tweet.user_id].push({
							'latitude': tweet.latitude,
							'longitude': tweet.longitude,
							'timestamp_ms': tweet.timestamp_ms,
						});
					}
				}
			} else {	
				
				if ( typeof region1 !== 'undefined' ) { 

					for (var user_id in tweets_locations) {
						
						if (user_id === 'length' || !tweets_locations.hasOwnProperty(user_id)){continue;}
						if(tweets_locations[user_id].length==1){continue;}
						
						for (i=0; i<tweets_locations[user_id].length;i++) {
							
							if (tweets_locations[user_id][i].latitude  > region1.latitude && tweets_locations[user_id][i].latitude  < region2.latitude && tweets_locations[user_id][i].longitude > region1.longitude && tweets_locations[user_id][i].longitude < region2.longitude) {

								if (direction=='both') {
									if ( i>0 ) {
										if ( lines.length==0 ) { //First Line
											lines.push({
												'start': tweets_locations[user_id][i-1],
												'end': tweets_locations[user_id][i],
											});
										} else if(lines[lines.length-1].end.latitude  !== tweets_locations[user_id][i].latitude && lines[lines.length-1].end.longitude !== tweets_locations[user_id][i].longitude){
											lines.push({
												'start': tweets_locations[user_id][i-1],
												'end': tweets_locations[user_id][i],
											});
										}
									}
								}

								if (direction == 'in') {
									if ( i>0 ) {
										lines.push({
											'start': tweets_locations[user_id][i-1],
											'end': tweets_locations[user_id][i],
										});
									}
								}
								
								if (direction == 'out' || direction == 'both') {
									if ( i<tweets_locations[user_id].length-1 ) {
										lines.push({
											'start': tweets_locations[user_id][i],
											'end': tweets_locations[user_id][i+1],
										});
									}
								}
							}
						}
					}

				} else {
					for (var user_id in tweets_locations) {

						if (user_id === 'length' || !tweets_locations.hasOwnProperty(user_id)) {continue;} 
						if(tweets_locations[user_id].length==1) {continue;} 
						for(i=1; i<tweets_locations[user_id].length;i++) {
							lines.push({
								'start': tweets_locations[user_id][i-1],
								'end': tweets_locations[user_id][i],
							});
						}
					}
				}
				res.end(JSON.stringify(lines));
			}
		});
	});
});



module.exports = router;

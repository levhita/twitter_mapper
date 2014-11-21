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

	if(  typeof req.query.region_lat1 !=='undefined'
		&& typeof req.query.region_lng1 !=='undefined'
		&& typeof req.query.region_lat2 !=='undefined'
		&& typeof req.query.region_lng2 !=='undefined' ) {
		query.latitude  = {$gt: parseFloat(req.query.region_lat1), $lt: parseFloat(req.query.region_lat2)};
		query.longitude = {$gt: parseFloat(req.query.region_lng1), $lt: parseFloat(req.query.region_lng2)};
	}

	tweets_collection.find(query, options, function(err, tweets) {
		if(!as_text){
			tweets.each(function(err, tweet) {
				if (tweet !== null) {
					results.unshift(tweet);
				} else {
					res.setHeader('Content-Type', 'application/json');
					res.end(JSON.stringify(results));
		    }
			});
		} else {
			tweets.each(function(err, tweet) {
				if (tweet !== null) {
					results_string +="  "+tweet.text;
				} else {
					var stop_words = ["es","para", "lo", "le", "los","al", "el", "en", "las", "te","un", "con","ese", "y", "de", "la","e", "a"];
					for(i=0; i<stop_words.length;i++) {
						var find = " "+stop_words[i]+" ";
						var re = new RegExp(find, 'gi');
						results_string = results_string.replace(re, ' ');
					}
					res.setHeader('Content-Type', 'text/pain');
		    	res.end(results_string);
		    }
			});
		}
	});
});

module.exports = router;

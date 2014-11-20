var express = require('express');
var router = express.Router();

/* GET twitts listing. */
router.get('/', function(req, res) {
	var tweets_collection = db.collection('twitts');
	var results = [];
	var query = {};
	var options = {'sort': [['_id', 'desc']]};
	
	if(typeof req.query.limit !=='undefined'){
		options.limit=req.query.limit;
	}

	if( (typeof req.query.older_than !=='undefined') && (typeof req.query.younger_than !=='undefined') ){
		var older_than = (parseInt(req.query.older_than) + (6*60*60)) + '000';
		var younger_than = (parseInt(req.query.younger_than) + (6*60*60)) +'000';
		console.log(older_than, younger_than);
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
	
	if(typeof req.query.user_id !=='undefined'){
		query.user_id = req.query.user_id;
	}
	
	if(typeof req.query.screen_name !=='undefined'){
		query.screen_name = req.query.screen_name;
	}
	
	tweets_collection.find(query, options, function(err, tweets) {
		tweets.each(function(err, tweet) {
			if (tweet !== null) {
				results.unshift(tweet);
			} else {
				res.json(results);
			}
		});
	});
});

module.exports = router;

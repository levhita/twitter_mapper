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
		query.timestamp_ms = { $gt :  req.query.older_than, $lt : req.query.younger_than};
	} else {
		if(typeof req.query.younger_than !=='undefined'){
			query.timestamp_ms = {$lt : req.query.younger_than};
		}
		if(typeof req.query.older_than !=='undefined'){
			query.timestamp_ms = {$gt : req.query.older_than};
		}
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

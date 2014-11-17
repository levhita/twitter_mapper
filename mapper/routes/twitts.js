var express = require('express');
var router = express.Router();

/* GET twitts listing. */
router.get('/', function(req, res) {
	var twitts = db.collection('twitts');
	var data = [];
	var options = {"limit": 500, 'sort': [['_id', 'desc']]};
	
	twitts.find({}, options, function(err, twitts) {
		twitts.each(function(err, twitt) {
			if (twitt !== null) {
				data.unshift(twitt);
			} else {
				res.json(data);
			}
		});
	});
});

module.exports = router;

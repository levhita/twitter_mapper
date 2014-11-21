var express = require('express');
var router = express.Router();

/* GET movements. */
router.get('/', function(req, res) {
	res.render('movements');
});

module.exports = router;

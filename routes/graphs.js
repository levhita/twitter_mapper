var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:graph', function(req, res) {
	var graph='intensity';
	console.log(req.params.graph);
	if(typeof req.params.graph!=='undefined'){
		graph=req.params.graph;
	}	
	res.render('graphs', {'graph':graph});
});

module.exports = router;

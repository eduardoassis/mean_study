var express = require('express')
	, router = express.Router();

router.get('/:user', function(req, res){
	res.send('Page for user ' + req.params.user + ' with option ' + req.query.option);
});

module.exports = router;
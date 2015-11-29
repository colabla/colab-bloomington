var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  	title: 'Express',
  	pkg: {
  		keywords: [
  			'colab',
  			'bloomington',
  			'venture',
  			'studio'
  		],
  		description: 'Colab Bloomington: A Colab Initiative'
  	}
  });
});

module.exports = router;

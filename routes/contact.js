var express = require('express');
var nodemailer = require('nodemailer');
var router = express.Router();

router.post('/', function(req, res){
  console.log(req.body)
  var name = 'Name: ' + req.body.name + '\n';
  var email = 'Email: '+req.body.email+'\n';
  var position = 'Position: ' + req.body.position + '\n';
  var description = 'Description: '+req.body.description;
  var body = name + email + position + description;

  var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
          user: 'artur@colab.la',
          pass: 'Wc3asdasd'
      }
  });
  transporter.sendMail({
      from: 'sender@address',
      //to: 'artur@lat.io', 
      to: 'david@colabbloomington.com', 
      subject: 'Colab Bloomington Contact',
      text: body
  });
  res.json({});
});

module.exports = router;

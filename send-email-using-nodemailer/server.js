const express = require('express');
const path = require('path');
const app = express();
const nodemailer = require('nodemailer');

// app.set('views', path.join(__dirname+'/public'));
// app.set('view engine', 'html');
var smtpConfig = {
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
      user: 'hawksaggs@gmail.com',
      pass: ''
    }
};
var smtpTransport = nodemailer.createTransport(smtpConfig);
app.get('/', function(req,res){
  res.sendFile(__dirname +'/index.html');
});

app.get('/send', function(req,res){

  var mailOptions={
    to : req.query.to,
    subject : req.query.subject,
    text : req.query.text
  }
  console.log(mailOptions);
  smtpTransport.sendMail(mailOptions, function(error, response){
    if(error){
      console.log(error);
      res.end("error");
    }else{
      console.log("Message sent: " + response.message);
      res.end("sent");
    }
  });
});

app.listen(3000, function(){
  console.log('Server is listening on port 3000');
});

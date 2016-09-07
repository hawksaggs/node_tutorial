const express = require('express');
const app = express();
// console.log(process.pid);
app.get('/', function(req, res){
  res.end('Clustering the app with '+process.pid);
});

app.listen(3000, function(){
  console.log('server running on port 3000');
});

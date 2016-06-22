var express = require('express')
var app = express();
var http = require('http').Server(app);
var pubnub  = require("pubnub")({
      publish_key : 'XXXX',
      subscribe_key : 'XXXX'
});

console.log(__dirname)
app.use(express.static(__dirname));

app.get('/user', function(req, res){
      res.sendFile(__dirname + '/user.html');
});

app.get('/agent', function(req, res){
      res.sendFile(__dirname + '/agent.html');
});

pubnub.subscribe({
    state:{
        name : "rahul"+pubnub.uuid()
    },
      channel : "available_agent",
      callback : function(m){
        console.log("m > >> >> "+m);
      }
})



http.listen(3000, function(){
  console.log('listening on *:3000');
});

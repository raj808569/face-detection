var express = require('express');
var app=express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
app.use(express.static(__dirname + '/public'));

app.set('port',(process.env.PORT||3000));
app.get('/',function(req,res){
  res.sendFile(__dirname + '/index.html');
});

http.listen (app.get('port'),function() {
  console.log("listening to port number "+app.get('port'));
});
var oxford = require('project-oxford'),
    client = new oxford.Client('631297ea8915437f80129990b2b491e8');

var NodeWebcam = require( "node-webcam" );


//Default options

var opts = {

    width: 1280,

    height: 720,

    delay: 0,

    quality: 100,

    output: "jpeg",

    verbose: true

}

var Webcam = NodeWebcam.create( opts );
io.on('connection',function(socket){
var name=socket.id;console.log(name);

//Will automatically append location output type
 socket.on('click',function(data){
   var locat1='/home/sadist69/Desktop/face/public/'+name;
   Webcam.capture( locat1,function(err,res){
     console.log('soka');
   } );
   console.log("working");
 });
 socket.on('result',function(data){
   console.log("working2");var located='/home/sadist69/Desktop/face/public/'+name+'.jpg';console.log(located);
   client.face.detect({
    path: located,
    analyzesAge: true,
    analyzesGender: true
}).then(function (response) {
    console.log(response[0].faceAttributes);
    io.sockets.in(socket.id).emit('answer',response[0].faceAttributes);
});
 });

});

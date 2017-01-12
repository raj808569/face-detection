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
var cloudinary = require('cloudinary');
cloudinary.config({ 
  cloud_name: 'student-shubhamraj', 
  api_key: '665371917748924', 
  api_secret: 'gjaPdGyD5UJvppfSl3l_wjcbuC0' 
});

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
   var locat1='C:/Users/User/Desktop/face-detection/face-detection-master/public/'+name;
   Webcam.capture(function(err){
     console.log('soka');
	 cloudinary.uploader.upload("test_picture.jpeg", function(result) { 
  console.log(result) 
});
   } );
   console.log("working");
 });
 socket.on('result',function(data){
   console.log("working2");var located='C:/Users/User/Desktop/face-detection/face-detection-master/public/'+name+'.jpg';console.log(located);
   client.face.detect({
    url: 'http://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcSjTKxD56iMMj5KD5q4n0tRUBRyTqbOgIIz518L2jyKPxlsKQaFFg',
    analyzesAge: true,
    analyzesGender: true
}).then(function (response) {
    console.log(response[0].faceAttributes);
    io.sockets.in(socket.id).emit('answer',response[0].faceAttributes);
});
 });

});

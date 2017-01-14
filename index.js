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
var name=socket.id;console.log(name);var image_url;

//Will automatically append location output type
 socket.on('click',function(data){
	console.log(data);
	var dtm=data;
	cloudinary.uploader.upload(dtm,function(result){
		console.log(result.url);
		image_url=result.url;
	});
   console.log("working");
 });
 socket.on('result',function(data){
   console.log("working2");var located='C:/Users/User/Desktop/face-detection/face-detection-master/public/'+name+'.jpg';console.log(located);
   client.face.detect({
    url: image_url,
    analyzesAge: true,
    analyzesGender: true
}).then(function (response) {
    console.log(response[0].faceAttributes);
    io.sockets.in(socket.id).emit('answer',response[0].faceAttributes);
});
 });

});

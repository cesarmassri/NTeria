var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 5000;
const { Keccak } = require('sha3');
const hash = new Keccak(256);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('num', function(msg){
	console.log(msg)
	var res = "";
	while(res != msg) {
		var hashed_vote = makeid(18);
		hash.update(process.env.PRIVATEKEY + hashed_vote);
		res = hash.digest('hex').charAt(63);
	}
	io.emit('hash', hashed_vote);
  });
});

http.listen(port, function(){
  console.log('listening on *:' + port);
});

function makeid(length) {
   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var result = '';
   for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
   }
   return result;
}



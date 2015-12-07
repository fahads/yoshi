var ctx = new AudioContext();
var piano = null;
var time = ctx.currentTime
soundfont(ctx, sessinstrument.innerText).then(function(instrument) {
  //from Scott
  piano = instrument;
});

var socket = io();

function playNote(note) {
  socket.emit('played note', note);
}

socket.on('played note', function(note){
  piano.play(note, time);
});
var ctx = new AudioContext();
var time = ctx.currentTime
var socket = io();

function playNote(note) {
	var noteAndInstrument = [note, sessinstrument.innerText];
  socket.emit('played note', noteAndInstrument);
}

socket.on('played note', function(noteAndInstrument){
	soundfont(ctx, noteAndInstrument[1]).then(function(instrument) {
  	instrument.play(noteAndInstrument[0], time);
	});
});
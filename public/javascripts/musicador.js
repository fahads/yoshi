var ctx = new AudioContext();
var time = ctx.currentTime
soundfont(ctx, sessinstrument.innerText).then(function(instrument) {
  localinstrument = instrument;
});

var socket = io();

function playNote(note) {
	var noteAndInstrument = [note, sessinstrument.innerText];
  socket.emit('played note', noteAndInstrument);
}

socket.on('played note', function(noteAndInstrument){
	soundfont(ctx, noteAndInstrument[1]).then(function(instrument) {
  	localinstrument = instrument;
	});
  localinstrument.play(noteAndInstrument[0], time);
});
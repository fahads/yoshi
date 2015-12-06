var ctx = new AudioContext();
var piano = null;
var note = "C4"
var time = ctx.currentTime
soundfont(ctx, sessinstrument.innerText).then(function(instrument) {
  piano = instrument;
});

function playNote(note) {
  piano.play(note, time);
}
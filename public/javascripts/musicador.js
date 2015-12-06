var ctx = new AudioContext();
var piano = null;
var note = "C4"
var time = ctx.currentTime
soundfont(ctx, 'acoustic_grand_piano').then(function(instrument) {
  piano = instrument;
});

function playNote(note) {
  piano.play(note, time);
}
var Soundfont = require('soundfont-player');

var ctx = new AudioContext();
var soundfont = new Soundfont(ctx);

try {
    var instrument = soundfont.instrument(process.argv[2]);
    instrument.onready(function() {
        instrument.play('C4', 0);
    });
} catch (err) {
    console.log("There was an error: " + err);
}
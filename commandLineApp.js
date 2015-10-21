var BeatBox, dm, error, midi, midiOut, rl;

BeatBox = (function() {
  function BeatBox(midi1) {
    var i;
    this.midi = midi1;    
    this.currentStep = 1;
    this.totalSteps = 16;
    this.steps = (function() {
      var j, results;
      results = [];
      for (i = j = 1; j <= 16; i = ++j) {
        results.push([]);
      }
      return results;
    })();
  }

  BeatBox.prototype.instruments = {
    kick: 36,
    hihat: 49,
    clap: 39,
    snare: 40,
    cowbell: 56,
    crash: 49
  };

  BeatBox.prototype.barDuration = function() {
    return 240000 / this.bpm;
  };

  BeatBox.prototype.playNote = function(note, velocity, duration) {
    if (velocity < 0) {
      velocity = 0;
    }
    if (velocity > 127) {
      velocity = 127;
    }
    // console.log(note + "\t");
    this.midi.sendMessage([144, this.instruments[note], velocity]);
  };

  BeatBox.prototype.playStep = function(step) {
    var j, len, note, ref, results;
    ref = this.steps[step];
    results = [];
    for (j = 0, len = ref.length; j < len; j++) {
      note = ref[j];
      results.push(this.playNote(note[0], note[1]));
    }
  };

  BeatBox.prototype.play = function() {
    var lp;
    this.playing = true;
    return lp = setInterval((function(_this) {
      return function() {
        _this.playStep(_this.currentStep - 1);
        _this.currentStep++;
        if (_this.currentStep === _this.totalSteps + 1) {
          _this.currentStep = 1;
        }
      };
    })(this), this.barDuration() / this.totalSteps);
  };

  BeatBox.prototype.set = function(instrument, steps, velocity) {
    var j, len, results, step;
    if (velocity == null) {
      velocity = 127;
    }
    results = [];
    for (j = 0, len = steps.length; j < len; j++) {
      step = steps[j];
      results.push(this.steps[step - 1].push([instrument, velocity]));
    }
  };

  return BeatBox;

})();

midi = require('midi');
midiOut = new midi.output;
midiOut.openVirtualPort('');

dm = new BeatBox(midiOut);
dm.bpm = 96;

rl = require('readline');
var read = rl.createInterface({input: process.stdin, output: process.stdout});
read.question("Enter 1 to create your own beat, or 2 to use one that we have: ", function(answer) {
  if (answer === '2') {
    dm.set('hihat', [1, 3, 5, 7, 9, 11, 13, 15], 100);
    dm.set('hihat', [2, 4, 6, 8, 10, 12, 14, 16], 39);
    dm.set('kick', [1, 4, 7, 11]);
    dm.set('snare', [5, 13]);
    dm.set('cowbell', [2, 4, 7, 12], 20);
    dm.set('cowbell', [3, 5, 8, 13], 80);
    dm.set('crash', [15], 20);
    dm.set('clap', [5, 13], 80);
    dm.set('clap', [16], 50);
    dm.play();
    read.close();
  } else if (answer === '1') {
    read.question("You have 16 steps, which ones will be for the Kick Drum (separate with spaces): ", function(answer) {
      dm.set('kick', answer.split(" ").map(Number));
      read.question("You have 16 steps, which ones will be for the Snare Drum (separate with spaces): ", function(answer) {
        dm.set('snare', answer.split(" ").map(Number));
      });
    });
    dm.play();
  } else {
    console.log("Invalid entry. Bye!");
    read.close();
  }
})

process.addListener("SIGTERM", function() {
  return midiOut.closePort();
});
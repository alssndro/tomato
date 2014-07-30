var globalTimer;

function Timer(duration) {
  this.duration = duration;
  this.secsLeft = duration;
  this.stopped = true;
}

Timer.prototype.start = function() {
  this.stopped = false;
  this.tick();
}

Timer.prototype.tick = function() {
  if (this.stopped != true && this.secsLeft > -1) {
    
    if (this.timerAction != undefined) {
      this.timerAction();  
    }

    this.secsLeft -= 1;
    var that = this;
    setTimeout(function(){that.tick();}, 1000);
  } else {
    this.stopped = true;
  }
}

Timer.prototype.stop = function() {
   this.stopped = true;  
}

// Useful object to represent the view of the Timer
var timerView = {
  "startEl": $("#time-start"),
  "endEl": $("#time-finish"),
  "currOpacity": 1,
  "resetUI": function() {
    this.startEl.css("opacity", 1);
    this.currOpacity = 1;
  }
};

// Used as a callback for the Timer obejct that is executed every
// time a second passes
var updateUI = function(timer) {
  $("#the-time").text(secsToMins(timer.secsLeft));
  $("#time-start").css("opacity", timerView.currOpacity);
  timerView.currOpacity -= (1 / timer.duration);
}

// Creates and starts a new Timer with the corresponding duration according to the
// UI button clicked
$("#buttons").on('click', 'p', function(e){
  globalTimer = new Timer($(this).data('duration') * 60);
  globalTimer.timerAction = function() { 
    updateUI(globalTimer) 
  };
  timerView.resetUI();
  globalTimer.start();
});

function secsToMins(seconds) {
  var newMinutes = 0;
  var newSeconds = 0;
  if (seconds % 60 == 0) {
    newMinutes = String(seconds / 60);
    newSeconds = "00";
  } else {
    newMinutes = String(Math.floor( seconds / 60));
    newSeconds = seconds % 60;
    if (newSeconds < 10) {
      newSeconds = "0" + newSeconds;
    }
  }
  return newMinutes + ":" + newSeconds;
}

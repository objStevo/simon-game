var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStart = false;

$(".btn").click(function(event) {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);
});

$(document).keypress(function(e) {
  if (!gameStart) {
    $("h1").text("Level " + level);
    nextSequence();
    gameStart = true;
  }
});

var nextSequence = function() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);

};

var playSound = function(name) {
  var colorSound = new Audio("./sounds/" + name + ".mp3");
  colorSound.play();
};

var animatePress = function(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
};

var checkAnswer = function(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass('game-over');
    setTimeout(function() {
      $("body").removeClass('game-over');
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
    }, 200);
  }
};
var startOver = function() {
  gameStart = false;
  level = 0;
  gamePattern = [];
};


//Variables

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;

//Button Click Function
$(".btn").click(function () {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  animatePress(userChosenColour);
  playSound(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});


//Keyboard key press function
$(document).on('keypress', function (event) {
  $("h1").text("Level 0");
  nextSequence();
});


function nextSequence() {
  userClickedPattern = [];
  $("h1").text("Level " + level);
  level = level + 1;
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
}


function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").attr("class", "game-over");
    setTimeout(function () {
      $("body").removeAttr("class", "game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();

  }
}

function startOver() {
  level = 0;
  gamePattern = [];

}


function playSound(randomChosenColour) {
  var audio = new Audio("sounds/" + randomChosenColour + ".mp3");
  audio.play();
}
function animatePress(randomChosenColour) {
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);
}

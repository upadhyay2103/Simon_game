var buttonColors = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var gamePattern = [];

var level = 0;
var startedToToggle = true;

function startOver()
{
    gamePattern=[];
    level=0;
    startedToToggle=true;
}

$(document).keydown(function (event) {
  if (startedToToggle) {
    $("h1").text("level " + level);
    nextSequence();
    startedToToggle = false;
  }
});

function nextSequence() {
   userClickedPattern=[];
  
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.random();
  randomNumber = Math.floor(4 * randomNumber);

  var randomChosenColor = buttonColors[randomNumber];

  gamePattern.push(randomChosenColor);

  $("#" + randomChosenColor)
    .fadeOut(70)
    .fadeIn(70);
  playSound(randomChosenColor);
}

//detect when a button got clicked

$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel)
{
   if(gamePattern[currentLevel]===userClickedPattern[currentLevel])
   {
     console.log("true");

     if(userClickedPattern.length===gamePattern.length)
     {
        setTimeout(function()
        {
            nextSequence();
        },1000);
     }

   }
   else
   {
      $("h1").text("Game Over! , press any key to restart");
      var audio=new Audio("sounds/wrong.mp3");
      audio.play();
      $("body").addClass("game-over");
      setTimeout(function()
      {
          $("body").removeClass("game-over");
      },200);

      startOver();
   }
}
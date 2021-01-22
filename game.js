var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

if (!localStorage.getItem("previous-score")){
    localStorage.setItem("previous-score", 0)
}
$("#ps").text("Previous Score: " + localStorage.getItem("previous-score"));

if (!localStorage.getItem("high-score")){
    localStorage.setItem("high-score", 0)
}
$("#hs").text("High Score: " + localStorage.getItem("high-score"));

$(document).keypress(function() {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }

    } else {

        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        startOver();
    }

}

function nextSequence() {

    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    if(localStorage.getItem("high-score") <= level)
        localStorage.setItem("high-score", level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function startOver() {
    if (level > 0) {
        localStorage.setItem("previous-score", level-1);
        $("#ps").text("Previous Score: " + localStorage.getItem("previous-score"));
    }
    if (level > localStorage.getItem("high-score")) {
        localStorage.setItem("high-score", level-1)
        $("#hs").text("High Score: " + localStorage.getItem("high-score"));
    }
    level = 0;
    gamePattern = [];
    started = false;
}

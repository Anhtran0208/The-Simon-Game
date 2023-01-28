//Create a new empty array called userClickedPattern
var userClickedPattern = [];

//Create a new array called buttonColours 
var buttonColours = ["red", "blue", "green", "yellow"];

//Create a new empty array caleld gamePattern
var gamePattern = [];

//Create a new function called nextSequence()
function nextSequence(){
    //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level
    userClickedPattern = [];
    //Inside nextSequence(), increase the level by 1 every time nextSequence() is called
    level++;

    //Update the h1 with this change in the value of level
    $("#level-title").text("Level " + level);

    //Generate a random number between 0 and 3
    var randomNumber = Math.floor(Math.random()*4);

    //Select a random color from buttonColours array 
    var randomChosenColour = buttonColours[randomNumber];

    //Add the new randomChosenColour to the end of the gamePattern array
    gamePattern.push(randomChosenColour);

    //Select the button with the same id as the randomChosenColour
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
   
}

//Detect when any of the buttons are clicked and trigger a handler function
$(".btn").click(function(){
    //Create a new variable called userChosenColour to store the id of the button that got clicked
    var userChosenColour = $(this).attr("id");

    //Add the contents of the variable userChosenColour to the end of the array userClickedPattern
    userClickedPattern.push(userChosenColour);

    //When a user clicks on a button, the corresponding sound should be played 
    playSound(userChosenColour);
    animatePress(userChosenColour);

    //Call checkAnswer after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence 
    checkAnswer(userClickedPattern.length - 1);
});

//Create a new function called playSound() that takes a single input parameter caleld name 
function playSound(name){
 var audio = new Audio(name + ".mp3");
 audio.play();
}

//Create a function called animatePress() that takes a paramater called currentColour
function animatePress(currentColour){
    //Add the pressed class to the button that gets clicked inside animatePress()
    $("#" + currentColour).addClass("pressed");

    //remove the class after 100 miliseconds
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    },100);
}

//Keep track of if the game has started or not 
var started = false;
//Create a new variable called level and start at level 0
var level = 0;
//Detect when a keyboard key has been pressed, when that happends for the first time called nextSequence()
$(document).keydown(function(){
    if (!started){
        //When the game has started, change h1 title to say Level 0
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
})

//Create a new functionc called checkAnswer that takes one input with the name currentLevel
function checkAnswer(currentLevel){

//Check if the most recent user answer is the same as the game pattern
if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){

//Check that they have finished their sequence 
if (userClickedPattern.length === gamePattern.length){
    //Call nextSequence() after a 1000 milisecond delay 
    setTimeout(function(){
        nextSequence();
    },100);
}
}
else{
    // If the user got one of the answers wrong, play wrong sound
    playSound("wrong");

    //Apply the "game-over" class to the body of the website and remove it after 200 milliseconds
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

    //Change the h1 title to say "Game over, press any key to restart"
    $("#level-title").text("Game Over, Press Any Key to Restart");

    //Call startOver() if the user gets the sequence wrong 
    startOver();
}
}

//Create a function called startOver()
function startOver(){
//reset the level, gamePattern, started
level = 0;
gamePattern = [];
started = false;
}



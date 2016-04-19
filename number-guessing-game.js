
/*Challenge: create a simple HTML file that will only be used for the purposes of running JavaScript in the browser. Create a guess.js file and add it to a <script> tag of your HTML file. This is simply so you can load your HTML file in the browser and do the challenge: creating a number guessing game.
Generate a random number between 1 and 100. Using the browser functions prompt and alert, ask the user to guess the number. You should give them 4 tries to guess the number. If they guess wrong, tell them if it's higher or lower. If they guess right, congratulate them. Otherwise, give them a message saying what the correct number was, as well as their list of guesses.*/

/*Number guessing game!
Create a file called number-guessing-game.js.
In this file, re-write your number guessing game (from the basic javascript workshop) for the command line!
Instead of using prompt and alert, you will have to use capabilities from NodeJS and any external module. HINT: there is an npm library called prompt that can help you with that :)
Save/commit/push*/

function randBetween(a, b) {
 return Math.floor(Math.random() * (b - a + 1)) + a;
}

var prompt = require("prompt");
var schema = {
    properties: {
      number: {
        type: 'integer',
        message: 'Your guess must be a number between 1 and 100!',
        required: true,
        conform: function (value) {
            if (value > 100 || value < 1) {
                return false;
            }
            return true;
        }
      }
    }
};

prompt.message = "I've thought of a number between 1 and 100, can you guess what it is?";
prompt.start();

var numberToGuess = randBetween(1,100);
var guessCounter = 1;
function promptNumber(){
    return prompt.get(schema, function(err, result) {
    var parsedNum = parseInt(result.number);
    if (numberToGuess === parsedNum && guessCounter === 1) {
        console.log("WOW!!! You've guessed the number on the first try!! You are amazing!!");
    }
    else if (numberToGuess === parsedNum) {
        console.log("Congratulations! You've guessed the number after " + guessCounter + " attempts. Nice!");
    }
    else {
        if (parsedNum < numberToGuess) {
            console.log("The number is bigger than " + parsedNum);
        }
        else {
            console.log("The number is smaller than " + parsedNum);
        }
    }
    if (guessCounter > 4) {
        return console.log("You didn't guess the number after 5 attempts! Try again next time!");
    }
    if (parsedNum !== numberToGuess){
        guessCounter++;
        promptNumber();
    }
});
}

promptNumber()
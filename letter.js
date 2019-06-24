function Letter(char) {
    this.char = char;
    this.guessed = false;
    this.guessCheck = function (playerGuess) {
        if (playerGuess === this.char) {
            this.guessed = true;
        };
    };
    this.display = function () {
        if (this.guessed === true) {
            return this.char;
        } else {
            return "_";
        };
    };
};

/*

// TESTING //
// New letter, 'a'
var testLetter = new Letter ('a');

// Consoling out the properties
console.log(testLetter);

// Throwing a test guess in
var guessCheckTest = 'b';

// Running guessCheck on it and then showing the result if the letter's been exposed
testLetter.guessCheck(guessCheckTest);
console.log(testLetter.guessed);
console.log(testLetter.display());


// A new guess that matches the letter
guessCheckTest = 'a';
testLetter.guessCheck(guessCheckTest);
console.log(testLetter.guessed);
console.log(testLetter.display());

*/

module.exports = Letter;

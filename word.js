var Letter = require("./letter.js"); // Uses the constructor in letter.js.

function Word(letters) {
    this.letters = letters.split(''); // Splits the letters of the round's word to create individual letters as an array.
    this.letterObjs = []; // Establishing the letter object array variable.
    this.guessedLettersArr = []; // Establishing the array of letters the player has guessed.
    this.displayWordArr = []; // Establishing the array that will be used for displaying the word as it is solved, including blanks and solved letters.
    this.solutionLettersArr = []; // Establishing a set of correct letters to guess for the round - this is the array that will be compared against with each guess.
    this.guessesLeft = 6; // Setting the number of remaining guesses for hangman.
    this.guessCorrect = ''; // Blank for now.
    this.guessBad = 0; // Boolean used for duplicate guesses, non-letters, spaces, etc.
    this.createWord = function (input) {
        this.letterObjs = [];
        this.guessedLettersArr = [];
        this.displayWordArr = [];
        this.solutionLettersArr = [];
        this.guessesLeft = 6;
        this.guessCorrect = '';
        // The above block is just resetting these variables for a fresh round.
        for (i = 0; i < input.length; i++) {
            var letterObj = new Letter(input[i]);
            this.letterObjs.push(letterObj);
        }; // Using the letter constructor for the new word, creating a new letter object for each character.
        for (i = 0; i < this.letterObjs.length; i++) {
            var solutionLetter = this.letterObjs[i].char;
            this.solutionLettersArr.push(solutionLetter);
        }; // Now populating the solution array, against which we compare each guess.
    };
    this.displayWord = function () {
        displayWordArr = [];
        for (i = 0; i < this.letterObjs.length; i++) {
            var displayLetter = this.letterObjs[i].displayLetter();
            this.displayWordArr.push(displayLetter);
        };
        console.log('\n' + this.displayWordArr.join('  ') + '\n');
    }; // This whole function is designed to just display the blanks and solved letters using the individual letter objects and their 'guessed' property.
    this.processGuess = function (inputPlayerGuess) { // This function is responsible for most of the processing of each guess.
        this.guessBad = 0; // By default, the guess is going to be good.
        var letterValidate = /[A-Z]/; // Establishing the proper set of characters that can be used as guesses.
        var guess = inputPlayerGuess.toUpperCase(); // Assuming it's a letter that's guessed, this sets it to uppercase for case matching.
        if (this.guessedLettersArr.includes(guess)) {
            console.log("\nYou've already guessed that letter. Make sure to check the Guessed Letters list!\n");
            this.guessBad = 1;
            return;
            // This will give an error and start a new 'play' if the letter has already been guessed.
        } else if (!guess.match(letterValidate)) {
            console.log("\nMake sure you guess a letter - not a number or symbol or somethin' else!\n");
            this.guessBad = 1;
            return;
            // This will give an error and start a new 'play' if the guess doesn't qualify as a letter as defined by 'letterValidate' up above.
        } else if (guess.length > 1) {
            console.log("\nOnly enter one letter at a time.\n");
            this.guessBad = 1;
            return;
            // This will give an error and start a new 'play' if more than one character was entered for the guess.
        }
        if (this.solutionLettersArr.includes(guess)) {
            this.guessCorrect = 1;
        } else {
            this.guessCorrect = 0;
            this.guessesLeft--;
        };
        // Finally processing the guess; if the guess is found in the solution array, consider it good; otherwise, deduct a turn and call it bad.

        this.guessedLettersArr.push(guess); // Adding the guess to the guessed letters array for comparing future guesses and displaying to the player.

        for (var i = 0; i < this.letterObjs.length; i++) {
            this.letterObjs[i].guessCheck(guess);
        }; // Running the guessCheck function on each individual letter object. See letter.js for more details.
    };

    // Below: Just displays the solution in the case of a loss.
    this.displaySolution = function () {
        var solutionArr = [];
        for (i = 0; i < this.letterObjs.length; i++) {
            var solutionLetter = this.letterObjs[i].char;
            solutionArr.push(solutionLetter);
        };
        console.log(solutionArr.join('  '));
    }; 

    // Below: Shows the hangman gallows graphics after each round, some rows of the graphics based on the number of remaining guesses.
    this.displayHangman = function () {
        console.log("\n\n\n     +======+") // Top row of the gallows.
        console.log("     |      |") // 2nd row

        if (this.guessesLeft === 6) {
            console.log("     |");
        } else {
            console.log("     |      O");
        } // 3rd row, shows head after one wrong guess.

        if (this.guessesLeft > 4) {
            console.log("     |");
        } else if (this.guessesLeft > 3) {
            console.log("     |      |");
        } else if (this.guessesLeft > 2) {
            console.log("     |     /|");
        } else {
            console.log("     |     /|\\")
        }; // 4th row; shows body and arms after guesses 2, 3, and 4.

        if (this.guessesLeft > 4) {
            console.log("     |")
        } else {
            console.log("     |      |")
        }; // 5th row; shows lower body segment after 2nd guess.

        if (this.guessesLeft > 1) {
            console.log("     |")
        } else if (this.guessesLeft > 0) {
            console.log("     |     /")
        } else {
            console.log("     |     / \\")
        }; // 6th row; shows legs after guesses 5 and 6.

        console.log("     |            "); // 7th row.
        console.log(" =========        "); // 8th row, the base of the gallows.
    }
};

module.exports = Word; // Exports for use in index.js.
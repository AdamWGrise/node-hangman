var Letter = require("./letter.js");

function Word(letters) {
    this.letters = letters.split('');
    this.letterObjs = [];
    this.guessedLettersArr = [];
    this.displayWordArr = [];
    this.solutionLettersArr = [];
    this.guessesLeft = 6;
    this.guessCorrect = '';
    this.createWord = function (input) {
        this.letterObjs = [];
        this.guessedLettersArr = [];
        this.displayWordArr = [];
        this.solutionLettersArr = [];
        this.guessesLeft = 6;
        this.guessCorrect = '';
        for (i = 0; i < input.length; i++) {
            var letterObj = new Letter(input[i]);
            this.letterObjs.push(letterObj);
        };
        for (i = 0; i < this.letterObjs.length; i++) {
            var solutionLetter = this.letterObjs[i].char;
            this.solutionLettersArr.push(solutionLetter);
        };
    };
    this.displayWord = function () {
        for (i = 0; i < this.letterObjs.length; i++) {
            var displayLetter = this.letterObjs[i].displayLetter();
            this.displayWordArr.push(displayLetter);
        };
        console.log('\n\n' + this.displayWordArr.join('  ') + '\n\n');
        console.log('\nGuessed letters: ' + this.guessedLettersArr.join(' '));
    };
    this.processGuess = function (inputPlayerGuess) {
        var guess = inputPlayerGuess.toUpperCase();
        if (this.solutionLettersArr.includes(guess)) {
            this.guessCorrect = 1;
        } else {
            this.guessCorrect = 0;
            this.guessesLeft--;
        };
        this.guessedLettersArr.push(guess);
        for (var i = 0; i < this.letterObjs.length; i++) {
            this.letterObjs[i].guessCheck(guess);
        };
    };
    this.displaySolution = function () {
        var solutionArr = [];
        for (i = 0; i < this.letterObjs.length; i++) {
            var solutionLetter = this.letterObjs[i].char;
            solutionArr.push(solutionLetter);
        };
        console.log(solutionArr.join('  '));
    }
};

module.exports = Word;
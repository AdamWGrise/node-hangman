var Letter = require("./letter.js");

function Word(letters) {
    this.letters = letters.split('');
    this.letterObjs = [];
    this.createWord = function(input) {
        for (i = 0 ; i < input.length ; i++){
            var letterObj = new Letter (input[i]);
            this.letterObjs.push(letterObj);
        };
    };
    this.displayWord = function() {
        var displayWordArr = [];
        for (i = 0 ; i < this.letterObjs.length ; i++) {
            var displayLetter = this.letterObjs[i].displayLetter();
            displayWordArr.push(displayLetter);
        };
        console.log(displayWordArr.join('  '));
    };
    this.processGuess = function (inputPlayerGuess) {
        var guess = inputPlayerGuess.toUpperCase();
        for (var i = 0 ; i < this.letterObjs.length; i++ ) {
            this.letterObjs[i].guessCheck(guess);
        };
    };
    this.displaySolution = function() {
        var solutionArr = [];
        for (i = 0 ; i < this.letterObjs.length ; i++) {
            var solutionLetter = this.letterObjs[i].char;
            solutionArr.push(solutionLetter);
        };
        console.log(solutionArr.join('  '));
    }
};

module.exports = Word;
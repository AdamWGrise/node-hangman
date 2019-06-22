var Letter = require("./letter.js");

function Word(letters) {
    this.letters = letters.split();
    this.display = function () {
        var displayedWord = '';
        for (var i = 0; i < this.letters.length; i++) {
            var letter = Letter.display(this.letters[i]);
            displayedWord += letter;
        };
        console.log(displayedWord);
    };
    this.processGuess = function (playerGuess) {
        for (var i = 0 ; i < this.letters.length; i++ ) {
            Letter.guessCheck(playerGuess);
        };
    };

};

module.exports = Word;
function Letter(char) {
    this.char = char;
    this.guessed = false;
    this.guessCheck = function (playerGuess) {
        if (playerGuess === this.char) {
            this.guessed = true;
        };
    };
    this.displayLetter = function () {
        if (this.guessed === true) {
            return this.char;
        } else {
            return "_";
        };
    };
};

module.exports = Letter;

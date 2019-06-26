function Letter(char) {
    this.char = char; // The actual letter.
    this.guessed = false; // Starting off with the letter being *not* guessed yet.
    this.guessCheck = function (playerGuess) {
        if (playerGuess === this.char) {
            this.guessed = true;
        };
    }; // If the guessed letter is this character, set the "guessed" property to true.
    this.displayLetter = function () {
        if (this.guessed === true || this.char === ' ') {
            return this.char;
        } else {
            return "_";
        };
    }; // If "guessed" is true, display the actual character; otherwise, continue showing a blank.
};

module.exports = Letter; // Export this for other js files to use.
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
    // this.display = function () {
    //     var displayedWord = '';
    //     for (var i = 0; i < this.letters.length; i++) {
    //         var letter = Letter.display(this.letters[i]);
    //         displayedWord += letter;
    //     };
    //     console.log('11' + displayedWord);
    // };
    this.displayWord = function() {
        var displayWordArr = [];
        for (i = 0 ; i < this.letterObjs.length ; i++) {
            var displayLetter = this.letterObjs[i].display();
            displayWordArr.push(displayLetter);
        };
        console.log(displayWordArr.join('  '));
    };
    this.processGuess = function (inputPlayerGuess) {
        for (var i = 0 ; i < this.letterObjs.length; i++ ) {
            this.letterObjs[i].guessCheck(inputPlayerGuess);
        };
    };

};

module.exports = Word;
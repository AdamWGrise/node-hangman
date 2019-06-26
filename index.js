// Requiring the word file and Inquirer
var Word = require('./word.js');
var inquirer = require('inquirer');

// Options for a word.
var wordBank = ['TABLE SAW', 'POWER DRILL', 'JIG SAW', 'BAND SAW', 'HAMMER', 'TAPE MEASURE', 'CHISEL', 'SCREWDRIVER', 'CALIPER', 'CLAMP', 'SAW HORSE', 'WORK BENCH', 'GRINDER', 'PALM SANDER', 'ROUTER', 'DRILL PRESS', 'GOGGLES', 'EAR PLUGS', 'JOINTER', 'PLANER', 'FACE MASK', 'PLIERS']

// Loads on file run to see if the person wants to play.
inquirer
    .prompt([{
        type: 'list',
        name: 'startGame',
        message: '=======================================\n\n\nWelcome to Node Hangman! You ready to start a game?\n',
        choices: [
            "Heck yes, let's get this party started.\n",
            "No way, I'm scared. I want out.\n"
        ]
    }])
    .then(answers => {
        if (answers.startGame === "Heck yes, let's get this party started.\n") {
            console.log('Rock on! Starting game...\n\n');
            runGame.newRound(); // Start a round if the player wants to play!
        } else {
            console.log('Alright, no prob. Exiting game...\n');
            process.exit(); // Exit Node if not.
        }
    });

// Our main game object is here. Any functions or variables indicated by "roundWord" are in the word.js file; see that for more details.
var runGame = {
    roundWord: '',
    newRound: function () {
        roundWord = new Word(wordBank[Math.floor(Math.random() * wordBank.length)]); // Gets one of the words from the word bank and uses it to construct a new Word object using word.js.
        roundWord.createWord(roundWord.letters); // Breaks up the word into individual letters with their own properties - see letter.js for more details.
        roundWord.displayHangman(); // Shows the hangman gallows 'graphics.' See word.js.
        roundWord.displayWord(); // Shows the blanks for the word being solved.
        this.play(); // Runs the gameplay function below.
    },
    play: function () {
        // Getting the guess from the player here.
        inquirer
            .prompt([{
                type: 'input',
                name: 'playerGuess',
                message: 'Guess a LETTER: ',
            }])
            .then(response => {
                console.log('============================================');
                var playerGuess = response.playerGuess; // Establishing the Inquirer response as the guessed letter...
                roundWord.processGuess(playerGuess); // See word.js for details on this function.
                if (roundWord.guessBad === 1) {
                    this.play();
                    return;
                }; // If the guess was bad (i.e., duplicate guess, a number/symbol, space, more than one character, etc.), start a new guess.

                roundWord.displayHangman(); // Showing the gallows graphics again; see word.js for details.
                roundWord.displayWordArr = []; // Resetting the word array so we get a fresh display.
                roundWord.displayWord(); // Displays the blanks/solved characters.

                if (roundWord.guessCorrect === 1) {
                    console.log("Yes! Showing '" + playerGuess.toUpperCase() + "'s in the puzzle.");
                } else {
                    console.log("No '" + playerGuess.toUpperCase() + "'s. Sorry!");
                }; // Shows a message based on whether or not the guess was correct.

                console.log('\nGuessed letters: ' + roundWord.guessedLettersArr.join(' ') + '\n'); // Displays guessed letters.

                // Below: Checks for win or loss.
                if (roundWord.guessesLeft === 0) {
                    console.log("Bummer! You lost. That poor guy. The correct word was:\n");
                    roundWord.displaySolution();
                    console.log('');
                    this.newGameCheck();
                    // If a loss, show the solution, then ask if the player wants to start another round.
                } else if (roundWord.displayWordArr.includes("_")) {
                    this.play();
                    // If there are still guesses left and there are blanks, keep playing!
                } else {
                    this.youWin();
                    // If guesses are left and there aren't any more blanks, you win.
                }; 
            });
    },

    // Below: Function to start a new game.
    newGameCheck: function () {
        inquirer
            .prompt([{
                type: 'list',
                name: 'startGame',
                message: 'Play again?',
                choices: [
                    "Let's do this!",
                    "No thanks, I'm good."
                ]
            }])
            .then(answers => {
                if (answers.startGame === "Let's do this!") {
                    console.log('Rock on! Starting game...\n\n');
                    this.newRound();
                } else {
                    console.log('Alright, no prob. Exiting game...\n');
                    process.exit();
                }
            });
    },

    // Below: Win function, showing remaining number of guesses and offering to start a new game.
    youWin: function () {
        console.log("Congrats! You won this round with " + roundWord.guessesLeft + " mistakes remaining!\n");
        this.newGameCheck();
    }
};
// The file containing the logic for the course of the game, which depends on Word.js and:

// Randomly selects a word and uses the Word constructor to store it

// Prompts the user for each guess and keeps track of the user's remaining guesses
var Word = require('./word.js');
var inquirer = require('inquirer');
var wordBank = ['TABLESAW', 'POWERDRILL', 'JIGSAW', 'BANDSAW', 'HAMMER', 'TAPEMEASURE', 'CHISEL', 'SCREWDRIVER', 'CALIPER', 'CLAMP', 'SAWHORSE', 'WORKBENCH', 'GRINDER', 'PALMSANDER', 'ROUTER', 'DRILLPRESS', 'GOGGLES', 'EARPLUGS', 'JOINTER', 'PLANER', 'FACEMAS', 'PLIERS']

inquirer
    .prompt([{
        type: 'list',
        name: 'startGame',
        message: 'Welcome to Node Hangman! You ready to start a game?',
        choices: [
            "Heck yes, let's get this party started.",
            "No way, I'm scared. I want out."
        ]
    }])
    .then(answers => {
        console.log(answers);
        if (answers.startGame === "Heck yes, let's get this party started.") {
            console.log('Starting game...');
            runGame.newRound();
        } else {
            console.log('Exiting game...');
            process.exit();
        }
    });

var runGame = {
    roundWord: '',
    newRound: function () {
        roundWord = new Word(wordBank[Math.floor(Math.random() * wordBank.length)]);
        roundWord.createWord(roundWord.letters);
        roundWord.displaySolution(); // REMOVE
        this.play();
    },
    play: function () {
        console.log("Guesses left: " + roundWord.guessesLeft);
        inquirer
            .prompt([{
                type: 'input',
                name: 'playerGuess',
                message: 'Guess a letter: ',
            }])
            .then(response => {
                var playerGuess = response.playerGuess;
                roundWord.processGuess(playerGuess);
                roundWord.displayWord();
                if (roundWord.guessCorrect === 1) {
                    console.log("Correct letter!");
                } else {
                    console.log("Incorrect letter!");
                }
                if (roundWord.guessesLeft === 0) {
                    console.log("Bummer! You're out of turns. The correct word was:\n");
                    roundWord.displaySolution();
                    console.log('');
                    this.newGameCheck();
                } else if (roundWord.displayWordArr.includes("_")) {
                    this.play();
                } else {
                    this.youWin();
                }
            });
    },

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
                console.log(answers);
                if (answers.startGame === "Let's do this!") {
                    console.log('Starting game...');
                    this.newRound();
                } else {
                    console.log('Exiting game...');
                    process.exit();
                }
            });
    },

    youWin: function () {
        console.log("Congrats! You won this round!");
        this.newGameCheck();
    }
};
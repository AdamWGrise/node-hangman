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
            console.log('Exiting game');
        }
    });

var runGame = {
    roundWord:'',
    newRound:function() {
        roundWord = new Word(wordBank[Math.floor(Math.random()*wordBank.length)]);
        roundWord.createWord(roundWord.letters);
        roundWord.displaySolution();
        this.play();
        
    },
    play:function(){
        console.log("playing game!");
        var guessTest = 'a';
        console.log("guess 1: " + guessTest);
        roundWord.processGuess(guessTest);
        roundWord.displayWord();
        guessTest = 't';
        console.log("guess 2: " + guessTest);
        roundWord.processGuess(guessTest);
        roundWord.displayWord();
        guessTest = 's';
        console.log("guess 3: " + guessTest);
        roundWord.processGuess(guessTest);
        roundWord.displayWord();
        guessTest = 'e';
        console.log("guess 4: " + guessTest);
        roundWord.processGuess(guessTest);
        roundWord.displayWord();
    }
};

/*
////////////////// TESTING

var guessTest = 'i';


var guessTest2 = 't';

roundWord.processGuess(guessTest2);
roundWord.displayWord();


console.log(roundWord.letterObjs);
*/
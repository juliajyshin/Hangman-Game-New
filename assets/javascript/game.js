var hangmanGame = {
    wordsToPick: {
        jigglypuff: {
            picture: "jigglypuff.png",
        },
        pikachu: {
            picture: "pikachu.png",
        },
        togepi: {
            picture: "togepi.png",
        },
        mew: {
            picture: "mew.png",
        },
        charmander: {
            picture: "charmander.png",
        },
        squirtle: {
            picture: "squirtle.png",
        }
    },

        wordInPlay: null,
        lettersOfTheWord: [],
        matchedLetters: [],
        guessedLetters: [],
        guessesLeft: 0,
        totalGuesses: 0,
        lettersGuessed: null,
        wins: 0,



        setupGame: function() {

            var objKeys = Object.keys(this.wordsToPick);
            this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];
            this.lettersOfTheWord = this.wordInPlay.split("");
            this.rebuildWordView();
            this.processUpdateTotalGuesses();
    },

        updatePage: function(letter) {
            if (this.guessesLeft === 0) {
                this.restartGame();
            }
            else {
                this.updateGuesses(letter);
                this.updateMatchedLetters(letter);
                this.rebuildWordView();

                if (this.updateWins() === true) {
                    this.restartGame();
                }
            }
        },

        updateGuesses: function(letter) {
            if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {
                this.guessedLetters.push(letter);
                this.guessesLeft--;

                document.querySelector("#guesses-left").innerHTML = this.guessesLeft;
                document.querySelector("#letters-guessed").innerHTML = this.guessedLetters.join(", ");
            }
        },

        processUpdateTotalGuesses: function() {
            this.totalGuesses = this.lettersOfTheWord.length + 5;
            this.guessesLeft = this.totalGuesses;

            document.querySelector("#guesses-left").innerHTML = this.guessesLeft;
        },

        updateMatchedLetters: function(letter) {
            for (var i = 0; i < this.lettersOfTheWord.length; i++) {
                if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
                    this.matchedLetters.push(letter);
                }
            }
        },

        rebuildWordView: function() {
            var wordView = " ";
            for (var i = 0; i < this.lettersOfTheWord.length; i++) {
                if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
                    wordView += this.lettersOfTheWord[i];
                }
                else {
                    wordView += "&nbsp;_&nbsp;";
                }
            }

            document.querySelector("#word-to-guess").innerHTML = wordView;
        },

        restartGame: function() {
            document.querySelector("#letters-guessed").innerHTML = "";
            this.wordInPlay = null;
            this.lettersOfTheWord = [];
            this.matchedLetters = [];
            this.guessedLetters = [];
            this.guessesLeft = 0;
            this.totalGuesses = 0;
            this.lettersGuessed = null;
            this.setupGame();
            this.rebuildWordView();
        },

        updateWins: function() {
            var win;

            if (this.matchedLetters.length === 0) {
                win = false;
            }
            else {
                win = true;
            }
            for (var i = 0; i < this.lettersOfTheWord.length; i++) {
                if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
                    win = false;
                }
            }
            if (win) {
                this.wins = this.wins + 1;
                document.querySelector("#wins-here").innerHTML = this.wins;
                document.querySelector("#wins-here").innerHTML = "<img class='it-me' src='assets/images/" + this.wordsToPick[this.wordInPlay].picture + "'>";
                return true;
            }
            return false;
            win++;

        }

    };


hangmanGame.setupGame();

document.onkeyup = function(event) {
    hangmanGame.lettersGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    hangmanGame.updatePage(hangmanGame.lettersGuessed);
};


//     var winCounter = 0;
//     var lossCounter = 0;

//     function roundComplete() {
//     document.getElementById("wins-here").innerHTML = winCounter;
//     document.getElementById("loses").innerHTML = lossCounter;

//     if (this.matchedLetters.length === 0) {
//         win = false;
//         lossCounter++;
//     }
//     else {
//         win = true;
//         win++;
// }
// };

// console.log(this.wins);
// console.log(this.wordInPlay);

var hangmanGame = {
    // Object of all pokemon that can be chosen along with thier picture
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

    // Variables that set the initial state of hangman game
    wordInPlay: null,
    lettersOfTheWord: [],
    matchedLetters: [],
    guessedLetters: [],
    guessesLeft: 0,
    totalGuesses: 0,
    lettersGuessed: null,
    wins: 0,
    losses: 0,


    // setupGame method is called when the page first loads
    setupGame: function () {
        // Pick pokemon to guess
        var objKeys = Object.keys(this.wordsToPick);
        this.wordInPlay = objKeys[Math.floor(Math.random() * objKeys.length)];
        // Split word up into indiviual letters
        this.lettersOfTheWord = this.wordInPlay.split("");
        // Display of where the word will be, currently underscores
        this.rebuildWordView();
        // This function sets number or guesses the user gets & renders to HTML
        this.processUpdateTotalGuesses();
    },
    // Function is run when the user guesses a letter
    updatePage: function (letter) {
        // If user has no more guesses left, restart the game
        if (this.guessesLeft === 0) {
            this.restartGame();
        }
        else {
            // Checks for incorrect guesses
            this.updateGuesses(letter);
            // Checks and updates correct guesses
            this.updateMatchedLetters(letter);
            // Updates the display of the word being solved
            this.rebuildWordView();
            // If user wins, restart the game
            if (this.updateWins() === true) {
                this.restartGame();
            }
        }
    },
    // Function governs what happens when the user makes an incorrect guess
    updateGuesses: function (letter) {
        // If the letter is not in the guessed letters and also not in the letters of the word array
        if ((this.guessedLetters.indexOf(letter) === -1) && (this.lettersOfTheWord.indexOf(letter) === -1)) {
            // Add the letter to the guessed letters array
            this.guessedLetters.push(letter);
            // Decrease the guess by one
            this.guessesLeft--;
            // Update number or remaning guesses and letters on page
            document.querySelector("#guesses-left").innerHTML = this.guessesLeft;
            document.querySelector("#letters-guessed").innerHTML = this.guessedLetters.join(", ");
        }
    },
    // Function sets the initial number of guesses the user gets
    processUpdateTotalGuesses: function () {
        // User will always get 5 extra letters longer than the word
        this.totalGuesses = this.lettersOfTheWord.length + 5;
        this.guessesLeft = this.totalGuesses;
        // Render how many guesses are left 
        document.querySelector("#guesses-left").innerHTML = this.guessesLeft;
    },
    // Function governs what happens when the user makes a correct guess
    updateMatchedLetters: function (letter) {
        // Loop through the letters of the solution
        for (var i = 0; i < this.lettersOfTheWord.length; i++) {
            // If the guessed letter is in the solution and we haven't guessed it already
            if ((letter === this.lettersOfTheWord[i]) && (this.matchedLetters.indexOf(letter) === -1)) {
                // Push newly guessed letter into matched letters array
                this.matchedLetters.push(letter);
            }
        }
    },
    // Function is the display of the word that is currently being guessed
    rebuildWordView: function () {
        // Start with an empty string
        var wordView = " ";
        // Loop through the letters of the word we are guessing
        for (var i = 0; i < this.lettersOfTheWord.length; i++) {
            // If correct guessed letter, display the letter
            if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) !== -1) {
                wordView += this.lettersOfTheWord[i];
            }
            // If it still hasn't been guessed, display underscore
            else {
                wordView += "&nbsp;_&nbsp;";
            }
        }
        // Update the page with the new string we built "i.e. J _ _ _ L Y"
        document.querySelector("#word-to-guess").innerHTML = wordView;
    },
    // Function restarts the game by resetting all the variables 
    restartGame: function () {
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
    // Function checks to see if user won
    updateWins: function () {
        var win;
        // If you have not guessed any correct letters, we set win to false
        if (this.matchedLetters.length === 0) {
            win = false;
        }
        // If you have guessed a letter in the word, we set win to true
        else {
            win = true;
        }
        // If you haven't guessed all the letter of the word, win is still false
        for (var i = 0; i < this.lettersOfTheWord.length; i++) {
            if (this.matchedLetters.indexOf(this.lettersOfTheWord[i]) === -1) {
                win = false;
            }
        }
        // If you do guess all the letters, the win is true 
        if (win) {
            // So we increment by 1 point
            this.wins = this.wins + 1;
            // Update the photo of the pokemon in the "who's that pokemon" section
            document.querySelector("#wins-here").innerHTML = "<img class='it-me' src='assets/images/" + this.wordsToPick[this.wordInPlay].picture + "'>";
            // Update the score of wins on page
            document.querySelector("#score-here").innerHTML = this.wins;
            // Return true, which will trigger restart of the game in the update page function
            return true;
        }
        // If guessed left is 0
        else if (this.guessesLeft === 0) {
            // Update the score of losses on page
            this.losses = this.losses + 1;
            document.querySelector("#loses").innerHTML = this.losses;
            // If win is false, return false to the updatePage function & the game continues
            return false;
        }


    }
};

// Initialize the game on page load
hangmanGame.setupGame();
// When a key is pressed
document.onkeyup = function (event) {
    // Capture pressed key and change it to lowercase
    hangmanGame.lettersGuessed = String.fromCharCode(event.keyCode).toLowerCase();
    // Pass the guessed letter into our update page function to run game logic
    hangmanGame.updatePage(hangmanGame.lettersGuessed);
};

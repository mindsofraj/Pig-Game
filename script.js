'use strict';
//Selecting Elements
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const rollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const newBtn = document.querySelector(".btn--new");
const diceEl = document.querySelector(".dice");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1"); 
const current0El = document.querySelector("#current--0"); 
const current1El = document.querySelector("#current--1"); 

//Starting Conditions
let currentScore, activePlayer, scores, playing;
newBtn.classList.add("hidden");
const init = function () {
    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    current0El.textContent = 0;
    current1El.textContent = 0;
    scores = [0, 0];
    diceEl.classList.remove("hidden");
    rollBtn.classList.remove("hidden");
    holdBtn.classList.remove("hidden");
    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
    player0.classList.add("player--active");
    player1.classList.remove("player--active");
    newBtn.classList.add("hidden");
};
init();

const switchPlayer = function() {
    document.querySelector(`#current--${activePlayer}`).textContent = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
}

//Rolling Dice Functionality
rollBtn.addEventListener('click', function() {
    if(playing) {

    //Generating a random dice roll
    const dice = Math.trunc((Math.random() * 6) + 1);

    //Display Dice
    diceEl.classList.remove("hidden");
    diceEl.src = `assets/dice-${dice}.png`;

    //Check for rolled dice, if it is 1 add dice to current score and switch to the next player
    if (dice != 1){
        currentScore += dice;
        document.querySelector(`#current--${activePlayer}`).textContent = currentScore;
    }else{
       switchPlayer();
    }
}
});

//Hold Button Function
holdBtn.addEventListener('click', function() {
    if(playing) {
    //Add current score to the active player
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent = scores[activePlayer];

    //Check if score is >= 100
    if (scores[activePlayer] >= 100) {
        playing = false;
        //Finish the Game
        document.querySelector(`.player--${activePlayer}`).classList.add("player--winner");
        document.querySelector(`.player--${activePlayer}`).classList.remove("player--active");
        diceEl.classList.add("hidden");
        rollBtn.classList.add("hidden");
        holdBtn.classList.add("hidden");
        newBtn.classList.remove("hidden");

    }else{
        //switch to the next player
        switchPlayer();
    }
}
});

//New Game Button Function
newBtn.addEventListener('click', init);


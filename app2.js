/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game



/*on déclare d'abord les variables globales */
var scores, roundScore, activePlayer, gamePlaying, previousDice;
//on initialise la partie avec la fonction crée
reset();

// 1 - Clique sur le bouton roll

//function anonyme car elle n'a pas de nom et ne peut etre utilisé qu'une seule fois à la différence de la callback function

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    //1. Random number
    var dice0 = Math.floor(Math.random() * 6) + 1; //methode pour un chiffre entre 1 et 6 au hasard et arrondi
    var dice1 = Math.floor(Math.random() * 6) + 1; //methode pour un chiffre entre 1 et 6 au hasard et arrondi
    // if (dice0 === 6 && previousDice === 6) {
    //   scores[activePlayer] = 0;
    //   nextPlayer();
    // }
    //2. Display result of the roll dice
    var diceDOM = document.querySelector(".dice-0"); //on attribut cet element sous une variable pour ne pas répéter
    diceDOM.style.display = "block"; //from display none to display block
    diceDOM.src = "img_css/dice-" + dice0 + ".png"; //on selectionne l'attribut src lié à la class dice et on modifie l'image lié au chiffre hasardeux tiré via la variable dice

    var diceDOM = document.querySelector(".dice-1"); //on attribut cet element sous une variable pour ne pas répéter
    diceDOM.style.display = "block"; //from display none to display block
    diceDOM.src = "dice-" + dice1 + ".png"; //on selectionne l'attribut src lié à la class dice et on modifie l'image lié au chiffre hasardeux tiré via la variable dice

    //3. update the round score IF the roll number is not 1 (rules of the game)
    if (dice0 !== 1 && dice1 !== 1) {
      //add score
      roundScore += dice0; //on ajoute le résultat si le score est diff de 1
      roundScore += dice1; //on ajoute le résultat si le score est diff de 1
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    } else if (dice0 === 1 || dice1 === 1) {
      //next player
      nextPlayer();
    }
    previousDice = dice0;
    previousDice = dice1;
  }
});

// 2 - bouton hold
document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    //Add the current score to the global score
    scores[activePlayer] += roundScore;

    //update the user interface
    document.querySelector("#score-" + activePlayer).textContent =
      scores[activePlayer];

    var input = document.getElementById("winning-game").value;
    var winningScore;

    if (input) {
      winningScore = input;
    } else {
      winningScore = 100;
    }
    //check if player won the game
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner";
      document.querySelector(".dice-0").style.display = "none";
      document.querySelector(".dice-1").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      //arreter la partie
      gamePlaying = false;
    } else {
      //next player
      nextPlayer();
    }
  }
});

//on crée une fonction pour ne jamais répéter deux fois le même code. ici pour changer de joueur
function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0; //reset le score

  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";

  //Cette méthode vérifie chaque élément pour les classes spécifiées. Les classes  actives seront ajoutées si manquantes et enlevé si déjà existantes ce qui crée un effet de bascule. Ou comme un interrupteur.
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  document.querySelector(".dice-0").style.display = "none";
  document.querySelector(".dice-1").style.display = "none";
}

function reset() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0; //ligne html 27 &  36
  gamePlaying = true; //on parametre le jeu sur true
  //selectionne l'élément par sa class avec l'élement CSS (# ou .)
  document.querySelector(".dice-0").style.display = "none"; //cache l'image du dice via style display
  document.querySelector(".dice-1").style.display = "none"; //cache l'image du dice via style display

  //selection l'élément du document par son id sans le #
  document.getElementById("score-0").textContent = "0";
  document.getElementById("score-1").textContent = "0";
  document.getElementById("current-0").textContent = "0";
  document.getElementById("current-1").textContent = "0";
  document.getElementById("name-1").textContent = "Player 2";
  document.getElementById("name-0").textContent = "Player 1";
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.add("active");
}

//Reset the game when click New
document.querySelector(".btn-new").addEventListener("click", reset); //fonction reset appelé en callback

// var newObj = document
//   .querySelector(".submit")
//   .addEventListener("click", function () {
//     document.getElementById("winning-game").value;
//   });

/*methode pour selectionner un element du doc HTML et textcontent pour modifier le texte de cet element
document.querySelector("#current-" + activePlayer).textContent = "hello";

Methode pour selectionner un element du doc html et ajouter un element HTML
document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>";

On peut utiliser cet element sur une variable afin de racourcir le code 
var x = document.querySelector("#score-0").textContent;*/

/*exemple Call back function
function btn() {}
btn();

selectionne la class btn roll et un event en cliquant sur la class selectionné.
document.querySelector(".btn-roll").addEventListener("click", btn); ici btn sans les () est appelé par une autre fonction donc il s'agit d'une function callback.*/

/*enleve la class active de l'élément selectionné
    document.querySelector(".player-0-panel").classList.remove("active");
    ajoute la class active à l'élément selectionné
    document.querySelector(".player-1-panel").classList.add("active");*/

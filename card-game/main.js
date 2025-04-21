import { Blackjack } from "./game.js";

const game = new Blackjack();

const playerHandDiv = document.getElementById("player-hand");
const dealerHandDiv = document.getElementById("dealer-hand");
const hitButton = document.getElementById("hit-button");
const standButton = document.getElementById("stand-button");
const startButton = document.getElementById("start-button");
const playerScoreDiv = document.getElementById("player-score");
const dealerScoreDiv = document.getElementById("dealer-score");

startButton.addEventListener("click", () => {
  game.startGame();
  updateUI();
  enableControls();
});

hitButton.addEventListener("click", () => {
  const result = game.hit();
  updateUI();

  const { player, dealer } = game.getScores();
  if (player == 21) {
    endGame("You win!");
  }

  if (result?.busted) {
    endGame("You busted! Dealer wins.");
  }
});

standButton.addEventListener("click", () => {
  game.stand();
  updateUI(true); // reveal dealer's hidden card
  checkWinner();
});

function updateUI(revealDealer = false) {
  const { player, dealer } = game.getHands();

  // Clear hands
  playerHandDiv.innerHTML = "";
  dealerHandDiv.innerHTML = "";

  // Show player cards
  player.forEach((card) => {
    card.reveal();
    playerHandDiv.appendChild(card.element);
  });

  // Show dealer cards
  dealer.forEach((card, idx) => {
    if (idx === 1 && game.getGameStatus().isPlayerTurn && !revealDealer) {
      card.hide();
    } else {
      card.reveal();
    }
    dealerHandDiv.appendChild(card.element);
  });

  // Update scores
  const scores = game.getScores();
  playerScoreDiv.textContent = `Score: ${scores.player}`;
  dealerScoreDiv.textContent =
    revealDealer || game.getGameStatus().isGameOver
      ? `Score: ${scores.dealer}`
      : `Score: ?`;
}

function endGame(message) {
  disableControls();
  updateUI(true);
  setTimeout(() => alert(message), 300);
}

function checkWinner() {
  const { player, dealer } = game.getScores();

  if (dealer > 21 || player > dealer || player == 21) {
    endGame("You win!");
  } else if (player === dealer) {
    endGame("Push! It's a tie.");
  } else {
    endGame("Dealer wins!");
  }
}

function disableControls() {
  hitButton.disabled = true;
  standButton.disabled = true;
}

function enableControls() {
  hitButton.disabled = false;
  standButton.disabled = false;
}

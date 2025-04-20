import { Deck } from '../shared/deck.js';

class Blackjack {
    /** 
     * Represents the state of the Blackjack game
     * @constructor
     */
    constrcutor() {
        this.playerHand = [];
        this.dealerHand = [];
        this.playerScore = 0;
        this.dealerScore = 0;

        this.isGameOver = false;
        this.isPlayerTurn = true;

        this.deck = new Deck;
        this.deckIndex = 0; // "stack" tracker
    }

    /**
     *  A reusable function to set-up the start of a new Blackjack game.
     */
    startGame()
    {
        this.gameDeck.shuffle();

        this.playerHand.push(this.gameDeck.cards[0]);
        this.playerHand.push(this.gameDeck.cards[1]);
        this.dealerHand.push(this.gameDeck.cards[2]);
        this.dealerHand.push(this.gameDeck.cards[3]); // Remember to hide 1 card.

        this.deckIndex = 4;

        this.isGameOver = false;
        this.isPlayerTurn = true;
    }

    /**
     *  Adds a card to the player or dealer.
     */
    hit() {
        const currCard = this.gameDeck.cards[this.deckIndex];
        this.deckIndex++;

        if (this.isPlayerTurn) {
            this.playerHand.push(currCard);
        } else {
            this.dealerHand.push(currCard);
        }

        this.updateScore();
    }

    /**
     *  Ends the current side's turn.
     *  This implementation handles the dealer's turn.
     *  - The dealer will automatically stand (i.e. only two cards in the dealer's hand).
     */
    stand() {
        this.isPlayerTurn = !this.isPlayerTurn;

        // Dealer's Turn
        // This should only run once with the current dealer algorithm.
        this.updateScore();
    }

    /**
     *  Update the side's score. Note that the dealer's score should not be publicly visible.
     */
    updateScore() {
        
    }
}
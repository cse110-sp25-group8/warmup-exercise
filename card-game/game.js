import { Deck } from '../shared/deck.js';

export class Blackjack {
    /** 
     * Represents the state of the Blackjack game
     * @constructor
     */
    constructor() {
        this.deck = new Deck;
        this.deck.shuffle();
        this.deckIndex = 0; // "stack" tracker

        this.playerHand = [];
        this.dealerHand = [];
        this.playerScore = 0;
        this.dealerScore = 0;

        this.isGameOver = false;
        this.isPlayerTurn = true;
    }

    /**
     *  A reusable function to set-up the start of a new Blackjack game.
     */
    startGame() {
        this.deck = new Deck(); // fresh deck
        this.deck.shuffle();
        this.deckIndex = 0;

        this.playerHand = [];
        this.dealerHand = [];
        this.isGameOver = false;
        this.isPlayerTurn = true;

        this.playerHand.push(this.deck.cards[this.deckIndex++]);
        this.dealerHand.push(this.deck.cards[this.deckIndex++]);
        this.playerHand.push(this.deck.cards[this.deckIndex++]);
        this.dealerHand.push(this.deck.cards[this.deckIndex++]);

        this.updateScore();
    }

    /**
     *  Adds a card to the player or dealer.
     */
    hit() {
        if (this.isGameOver) return null;

        const card = this.deck.cards[this.deckIndex++];

        // if (this.isPlayerTurn) {
        //     this.playerHand.push(currCard);
        // } else {
        //     this.dealerHand.push(currCard);
        // }

        // this.updateScore();

        if (this.isPlayerTurn) {
            this.playerHand.push(card);
            this.updateScore();
            if (this.playerScore > 21) {
                this.isGameOver = true;
                return { card, busted: true };
            }
        } else {
            this.dealerHand.push(card);
            this.updateScore();
        }

        return { card, busted: false };
    }

    // /**
    //  *  Ends the current side's turn.
    //  *  This implementation handles the dealer's turn.
    //  *  - The dealer will automatically stand (i.e. only two cards in the dealer's hand).
    //  */
    // stand() {
    //     this.isPlayerTurn = !this.isPlayerTurn;

    //     // Dealer's Turn
    //     // This should only run once with the current dealer algorithm.
    //     this.updateScore();
    // }

    // /**
    //  *  Update the side's score. Note that the dealer's score should not be publicly visible.
    //  */
    // updateScore() {

    // }

    /**
     * Ends the player's turn and performs dealer's moves.
     */
    stand() {
        this.isPlayerTurn = false;

        // Dealer hits until 17 or more
        while (this.calculateHandValue(this.dealerHand) < 17) {
            this.dealerHand.push(this.deck.cards[this.deckIndex++]);
        }

        this.updateScore();
        this.isGameOver = true;
    }

    /**
     * Calculates the value of a hand with Ace logic.
     */
    calculateHandValue(hand) {
        let total = 0;
        let aces = 0;

        for (let card of hand) {
            if (['J', 'Q', 'K'].includes(card.rank)) {
                total += 10;
            } else if (card.rank === 'A') {
                total += 11;
                aces++;
            } else {
                total += parseInt(card.rank);
            }
        }

        while (total > 21 && aces > 0) {
            total -= 10;
            aces--;
        }

        return total;
    }

    /**
     * Updates internal scores for both player and dealer.
     */
    updateScore() {
        this.playerScore = this.calculateHandValue(this.playerHand);
        this.dealerScore = this.calculateHandValue(this.dealerHand);
    }

    getScores() {
        return {
            player: this.playerScore,
            dealer: this.dealerScore
        };
    }

    getHands() {
        return {
            player: this.playerHand,
            dealer: this.dealerHand
        };
    }

    getGameStatus() {
        return {
            isGameOver: this.isGameOver,
            isPlayerTurn: this.isPlayerTurn
        };
    }
}
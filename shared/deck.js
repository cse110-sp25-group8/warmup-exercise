import { Card } from './card.js';

export class Deck {
    /**
     * Represents a playing card deck.
     * @constructor
     */
    constructor() {
        this.cards = this.createDeck();
    }

    /** 
     *  Creates an unshuffled standard playing card deck with 52 cards and the
     *  respective suits.
     *  @return {Card[]} - unshuffled standard Card array
     */
    createDeck() {
        const suits = [
            { symbol: '♠', color: 'black' },
            { symbol: '♣', color: 'black' },
            { symbol: '♥', color: 'red' },
            { symbol: '♦', color: 'red' },
        ];
        const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
        const cards = [];

        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                const card = new Card(suits[i], ranks[j]);
                cards.push(card);
            }
        }
        return cards;
    }

    /** 
     *  Shuffles the cards using Fisher-Yates algorithm
     */
    shuffle() {
        for (let i = this.cards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

}
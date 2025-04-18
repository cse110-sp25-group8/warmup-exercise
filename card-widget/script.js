class Card {
    /**
     * Represents a single playing card.
     * @constructor
     * @param {Object} suit - symbol and color of the card
     * @param {string} suit.symbol - the card's symbol
     * @param {string} suit.color - the card's color
     * @param {string[]} rank - the card's value
     */
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.faceUp = false;

        this.element = document.createElement("div");
        this.element.className = "card";

        // Todo: add middle component later

        this.element.innerHTML = `
        <div class="card-inner ">
           
            <div class="card-front ${this.suit.color}">
                <div class="card-corner top-left">
                    <div>${this.rank}</div>
                    <div>${this.suit.symbol}</div>
                </div>
                <div class="card-corner bottom-right">
                    <div>${this.rank}</div>
                    <div>${this.suit.symbol}</div>
                </div>
            </div>
            <div class="card-back"></div>
        </div>
        `;


        const preview = document.getElementById("preview");
        preview.appendChild(this.element);

        // Flips card(s) to the other state (e.g. face up -> face down)
        this.element.addEventListener("click", () => {
            this.faceUp = !this.faceUp
            this.element.classList.toggle("flipped");
        });
    }
}

class Deck {
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
            const j = Math.floor(Math.random() * (i+1));
            [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
        }
    }

}

function main() {
    let deck = new Deck();

    document.getElementsByClassName("shuffle")[0].addEventListener("click", () => {
        preview.innerHTML = "";
        deck.shuffle();
        deck.cards.forEach(c => preview.appendChild(c.element));
      });
}

main();

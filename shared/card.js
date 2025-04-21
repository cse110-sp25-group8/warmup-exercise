export class Card {
    /**
     * Represents a single playing card.
     * @constructor
     * @param {Object} suit - symbol and color of the card
     * @param {string} suit.symbol - the card's symbol
     * @param {string} suit.color - the card's color
     * @param {string} rank - the card's value
     */
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.faceUp = false;

        this.element = document.createElement("div");
        this.element.className = "card";

        this._render();
        this.element.classList.toggle('flipped', !this.faceUp);
        this.element.addEventListener("click", () => this.flip());
    }


    #getFaceCardImage(rank, color) {
        const lowerRank = rank.toLowerCase();
        return `../shared/faces/${lowerRank}_${color}.svg`;
    }

    _render() {
        const isFaceCard = ['J', 'Q', 'K'].includes(this.rank);

        const centerContent = isFaceCard
            ? `
            <div class="face-card">
                <img src="${this.#getFaceCardImage(this.rank, this.suit.color)}" alt="${this.rank}" />
            </div>`
            : `<div class="card-center">${this.suit.symbol}</div>`;

        this.element.innerHTML = `
        <div class="card-inner ">
            
            <div class="card-front ${this.suit.color}">
                <div class="card-corner top-left">
                    <div>${this.rank}</div>
                    <div>${this.suit.symbol}</div>
                </div>

                ${centerContent}
                
                <div class="card-corner bottom-right">
                    <div>${this.rank}</div>
                    <div>${this.suit.symbol}</div>
                </div>
            </div>
            <div class="card-back"></div>
        </div>
        `;
    }

    /** 
     * Flips the card to opposite side
     */
    flip() {
        this.faceUp = !this.faceUp;
        this.element.classList.toggle('flipped', !this.faceUp);
    }

    /** 
     *  If the card is hided, reveal
     */
    reveal() {
        if (!this.faceUp) {
            // Force a reflow to ensure flip animation is applied
            requestAnimationFrame(() => this.flip());
        }
    }

    /** 
     *  If the card is revealed, hide
     */
    hide() {
        if (this.faceUp) this.flip();
    }
}







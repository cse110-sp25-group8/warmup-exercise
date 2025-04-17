class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        this.faceUp=false;

        this.element=document.createElement("div");
        this.element.className="card";


        // Todo: add middle component later

        
        this.element.innerHTML=`
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

/** 
 *  Creates the card deck
 *  @param {}
 *  @param {}
 *  @return 
 */
function createCardElement(suits, ranks) {
    for(let i = 0; i < suits.length; i++) {
        for(let j = 0; j < ranks.length; j++) {
            new Card(suits[i], ranks[j]);
        }
    }
}


/** 
 *  Flips card(s) to the other state (e.g. face up -> face down)
 *  @param
 *  @return 
 */
function flip() {
    
}

function main(){
    const suits = [
        { symbol: '♠', color: 'black' },
        { symbol: '♣', color: 'black' }, 
        { symbol: '♥', color: 'red' },
        { symbol: '♦', color: 'red' }, 
    ];

    const ranks = ["A","2","3","4","5","6","7","8","9","10","J", "Q", "K"];

    createCardElement(suits,ranks);

    
}

main();


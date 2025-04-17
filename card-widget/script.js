class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
        //

        this.element=document.createElement("div");
        this.element.className="card";
        this.element.innerHTML=`
        <div class="card-inner"> 
            <div class="card-front">
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
        
    }
}

/** 
 *  what the function does
 *  @param
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
 *  what the function does
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
        { symbol: '♦', color: 'red' }, // diamonds
    ];

    const ranks = ["A","2","3","4","5","6","7","8","9","10","J", "Q", "K"];

    createCardElement(suits,ranks);

    
}

main();



//define suits and cards
let suits = ["clubs", "spades", "hearts", "diamonds"];
let unsuitedCards = [2, 3, 4, 5, 6, 7, 8, 9, 10, "jack", "queen", "king", "ace"];

// Create a full deck
const createDeck = () => {
    let deck = [];
    for (let suit of suits) {
        for (let card of unsuitedCards) {
            deck.push(`${card} of ${suit}`);
        }
    }
    return deck;
};

let deck = createDeck(); // Initialize the deck

// Function to draw a random card from the deck
const drawCard = () => {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck[randomIndex];
    deck.splice(randomIndex, 1); // Remove the drawn card from the deck
    return card; //return the card which goes into hand 
};

//define a function to make a hand for the start of the game
const makeHand = () => {
    return {
        cardOne: drawCard(),
        cardTwo: drawCard(),
    };
};

//tracking for number of displayed comp cards on board
let displayedCompCards = 2
//tracking for number of displayed player cards on board
let displayedPlayerCards = 2

// createPlayer factory function
const createPlayer = (name, hand) => {
    const cards = [hand.cardOne, hand.cardTwo]; //initialize start of game with 2 cards for the hand
    let total = 0;

    const getTotal = () => total

    const getFirstCard = () => cards[0]
    const getSecondCard = () => cards[1]
const aces = [] //for matching against calcTotal decision
    const getPlayerName = () => name;

    const getHand = () => cards

    const hit = () => {
       
        let newCard = drawCard();
        cards.push(newCard);
    calcTotal()
    };

    const calcTotal = () => {
        total = 0; // Reset total

        for (let i = 0; i < cards.length; i++) {
            let card = cards[i].split(" ")[0];

            if (!isNaN(card)) {
                const hasAce = cards.some(card => /ace of \w+/.test(card));
                if (hasAce) {
                    
                }


            total += parseInt(card);
       
        }
             else {
                switch (card) {
                    case "jack":
                    case "queen":
                    case "king":
                        
                        total += 10;
                    
                        break;
                    case "ace":
                        if (total >= 11) {
                            total += 1;
                            console.log(total)
                        } 
                        else if (total < 11) {
                            total += 11;
                            console.log(total)
                        }
                        break;
                    default:
                        console.log("Invalid card:", cards[i]);
                }
            }
        }

        if (total > 21) {
            if (getPlayerName() == `Computer`) {
            const score = document.body.querySelector(".score")
            score.setAttribute("style", "display: block;")
            const result = document.body.querySelector(".result")
            result.setAttribute("style", "display: block;")
            result.innerHTML="You win!"
            const stay = document.body.querySelector("button.stay")
            stay.disabled = true
            const hit = document.body.querySelector("button.hit")
            hit.disabled = true
            return console.log(`${name}'s total is over 21. ${name} loses`)
        } 
        else if (getPlayerName() != `Computer`) {
            const score = document.body.querySelector(".score")
            score.setAttribute("style", "display: block;")
            const result = document.body.querySelector(".result")
            result.setAttribute("style", "display: block;")
            result.innerHTML="You lose! :("
            const stay = document.body.querySelector("button.stay")
            stay.disabled = true
            const hit = document.body.querySelector("button.hit")
            hit.disabled = true
            return console.log(`${name}'s total is over 21. ${name} loses`)
        }
    }
        else if (total < 21) {
            return `${name}'s total is ${total}.`;
        } 
        else if (total === 21) {
            if (getPlayerName() != `Computer`) {
            const score = document.body.querySelector(".score")
            score.setAttribute("style", "display: block;")
            const result = document.body.querySelector(".result")
            result.setAttribute("style", "display: block;")
            result.innerHTML="Winner! You got Blackjack :D"
            const stay = document.body.querySelector("button.stay")
            stay.disabled = true
            const hit = document.body.querySelector("button.hit")
            hit.disabled = true
            return console.log(`${name} wins!`)
        }
        else if (getPlayerName() == `Computer`) {
            const score = document.body.querySelector(".score")
            score.setAttribute("style", "display: block;")
            const result = document.body.querySelector(".result")
            result.setAttribute("style", "display: block;")
            result.innerHTML="Computer wins :("
            const stay = document.body.querySelector("button.stay")
            stay.disabled = true
            const hit = document.body.querySelector("button.hit")
            hit.disabled = true
            return console.log(`${name} wins!`)
        }
    }
    };

    return { getPlayerName, getHand, hit, calcTotal, getTotal, getFirstCard, getSecondCard };
};

//make human and computer players and get player's total from hand//
const player = createPlayer("Rob", makeHand()); 
player.calcTotal()

const computer = createPlayer("Computer", makeHand());


const hit = document.body.querySelector("button.hit")

hit.addEventListener('click', () => {
    player.hit()
//add players card to board

const playerCards = document.body.querySelector(".player-cards")

//loop through player hand and set i = displayedplayercards
for (let i = displayedPlayerCards; i < player.getHand().length; i++) {
   
    const newCard = document.createElement("img")
    newCard.src = `./images/cards/${player.getHand()[i]}.jpg`
  
        playerCards.appendChild(newCard)
    
}

  // Update the count of displayed player cards
  displayedPlayerCards = player.getHand().length;


})

//logic for after human player clicks stay//
const gamePlay = () => {


    //disable buttons
    const stay = document.body.querySelector("button.stay")
    stay.disabled = true 

    const hit = document.body.querySelector("button.hit")
    hit.disabled = true

    console.log(`${player.getPlayerName()} has decided to stay`)

    
const compCardTwo =  document.body.querySelector("img.computer-card-two")

setTimeout(() => {
    compCardTwo.src = `./images/cards/${computer.getSecondCard()}.jpg`;

//get computer's total from its hand
   computer.calcTotal()


if (computer.getTotal() <= 16) {
  
   computer.hit()

   //get computer cards class
const compCards = document.body.querySelector(".computer-cards")

//loop through comp's hand from i=displayedCompCards and make src of each one equal to card

for (let i = displayedCompCards; i < computer.getHand().length; i++) {
   
    const newCard = document.createElement("img")
    newCard.src = `./images/cards/${computer.getHand()[i]}.jpg`
  
        compCards.appendChild(newCard)
    
}

  // Update the count of displayed comp cards
  displayedCompCards = computer.getHand().length;


computer.calcTotal()
gamePlay() //recalls the function got computer to hit again

}

 else if (computer.getTotal() > 16 && computer.getTotal() < 22) {


    //Computer wins
    if (computer.getTotal() > player.getTotal()) {
        const score = document.body.querySelector(".score")
        score.setAttribute("style", "display: block;")
        const result = document.body.querySelector(".result")
        result.setAttribute("style", "display: block;")
        result.innerHTML="You lose! :("
        const stay = document.body.querySelector("button.stay")
        stay.disabled = true
        const hit = document.body.querySelector("button.hit")
        hit.disabled = true
    
    }


    //Human player wins
    else if (computer.getTotal() < player.getTotal()) {
        const score = document.body.querySelector(".score")
            score.setAttribute("style", "display: block;")
            const result = document.body.querySelector(".result")
            result.setAttribute("style", "display: block;")
            result.innerHTML="You win! Your hand was bigger :)"
            const stay = document.body.querySelector("button.stay")
            stay.disabled = true
            const hit = document.body.querySelector("button.hit")
            hit.disabled = true

}


//Draw scenario
else if (computer.getTotal() == player.getTotal()) {
    const score = document.body.querySelector(".score")
    score.setAttribute("style", "display: block;")
    const result = document.body.querySelector(".result")
    result.setAttribute("style", "display: block;")
    result.innerHTML="Draw!"
    const stay = document.body.querySelector("button.stay")
    stay.disabled = true
    const hit = document.body.querySelector("button.hit")
    hit.disabled = true
   
    }
}}, 2500);
}

//button function calls
const stay = document.body.querySelector("button.stay")
stay.addEventListener('click', gamePlay)

//player img elements
const playerCardOne = document.body.querySelector(".player-cards img")
const playerCardTwo =  document.body.querySelector("img.player-card-two")


playerCardOne.src=`./images/cards/${player.getFirstCard()}.jpg`
playerCardTwo.src=`./images/cards/${player.getSecondCard()}.jpg`


//comp img elements

const compCardOne = document.body.querySelector(".computer-cards img")
const compCardTwo =  document.body.querySelector("img.computer-card-two")

compCardOne.src=`./images/cards/${computer.getFirstCard()}.jpg`
compCardTwo.src=`./images/cards/cards-backs/Red_back.jpg`


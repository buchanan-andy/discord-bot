import { Card, cards } from "../assets/cards"

export class BlackJack {

    player:string = ''
    playerHand:Card[] = []
    tobiHand:Card[] = []



    constructor(player) {
        this.player = player;
    }

     addPlayerCard(card) {
        this.playerHand.push(card)
        if (this.getPlayerScore() >21 && this.playerHand.some(obj => obj.value === 11)){
           let ace = this.playerHand.find(obj => obj.value === 11);
           ace!.value = 1;
        }
        
    }

    getPlayerScore():number{
        return this.playerHand.reduce((acc, obj) => acc + obj.value, 0);
    }

    getTobiScore():number{
        return this.tobiHand.reduce((acc, obj) => acc + obj.value, 0);
    }

    addTobiCard(card){
        this.tobiHand.push(card)
        if (this.getTobiScore()>21 && this.tobiHand.some(obj => obj.value === 11)){
            let ace =  this.tobiHand.find(obj => obj.value === 11);
            ace!.value = 1;
         }
    }

    hit(){
        let index = Math.floor(Math.random() * cards.length)
        let card = cards[index]
        cards.splice(index, 1);
        this.addPlayerCard(card);
        return this.checkScore();
    }

    tobiHit(){
        let index = Math.floor(Math.random() * cards.length)
        let card = cards[index]
        cards.splice(index, 1);
        this.addTobiCard(card);
        return card.name
    }

    tobiHitCards(cards){
        let out = cards;
       // Soft 17
       if (this.tobiHand.find(obj => obj.value === 11) && this.getTobiScore() == 17 || this.getTobiScore()<17){
        let card = this.tobiHit();
        out = `${out}I hit. ${card}.\n`;

       }
        if (this.getTobiScore() < 17) {
            out = this.tobiHitCards(out);
        }

        return out;
    }

    tobiPlay() {
        let response = this.tobiHitCards('');

        if (this.getTobiScore() == 21){
            response = `${response}My Hand: ${this.tobiHand.map(card => card.name).join(', ')}. Mwehehe I win!`
        }

        if (this.getTobiScore()>21){
            response = `${response}My Hand: ${this.tobiHand.map(card => card.name).join(', ')}, ${this.getTobiScore()} Aww man, I lost!`
        }

        if (this.getTobiScore() >= 17 && this.getTobiScore() <=21){
            let winner = ''
            if (this.getPlayerScore() > 21 || (this.getPlayerScore()>=21 && this.getTobiScore() >= this.getPlayerScore()) || this.getTobiScore() >= this.getPlayerScore()){
                winner = 'Mwehehe I win!'
            }
            else {
                winner = 'Aww man, you won!'
            }
            
             response = `${response}I stay. My Hand: ${this.tobiHand.map(card => card.name).join(', ')}. You had ${this.getPlayerScore()}, I had ${this.getTobiScore()}. ${winner}`
        }

        return response

    }

    myHand(){
        return `${this.playerHand.map(card => card.name).join(', ')}, ${this.getPlayerScore()}`
    }

    checkScore() {

        if (this.getPlayerScore() > 21 ) {
            return `${this.myHand()}, Ooops you busted! the Tuna is mine!`
        }

        return `${this.playerHand.map(card => card.name).join(', ')}, ${this.getPlayerScore()}`

    }

    gameOver() {
        return (this.getPlayerScore() >=21 || this.getTobiScore() >= 21);
    }



}
import { Card, cards } from "../assets/cards"

export class BlackJack {

    player:string = ''
    playerHand:Card[] = []
    botHand:Card[] = []



    constructor(player:string) {
        this.player = player;
    }

    getCard(){
        let index = Math.floor(Math.random() * cards.length)
        let card = cards[index]
        cards.splice(index, 1);
        return card;
    }

    getScore(hand:Card[]):number{
        return hand.reduce((acc, obj) => acc + obj.value, 0);
    }

    checkAce(hand:Card[]){
        if (this.getScore(hand) >21 && hand.some(obj => obj.value === 11)){
            let ace = hand.find(obj => obj.value === 11);
            ace!.value = 1;
         }
    }

     addPlayerCard(card:Card) {
        this.playerHand.push(card)
        this.checkAce(this.playerHand)
        
    }


    addBotCard(card:Card){
        this.botHand.push(card)
        this.checkAce(this.botHand)
    }

    hit(){
        this.addPlayerCard(this.getCard());
        return this.checkScore();
    }

    botHit(){
        const card = this.getCard();
        this.addBotCard(card);
        return card.name
    }

    botGetHitCards(cards:string){
        let out = cards;
       // Soft 17
       if (this.botHand.find(obj => obj.value === 11) && this.getScore(this.botHand) <= 17){
        let card = this.botHit();
        out = `${out}I hit. ${card}.\n`;

        if (this.getScore(this.botHand) < 17) {
            out = this.botGetHitCards(out);
        }
    }
        return out;
    }

    botPlay() {
        let response = this.botGetHitCards('');

        if (this.getScore(this.botHand) == 21){
            response = `${response}My Hand: ${this.botHand.map(card => card.name).join(', ')}. Mwehehe I win!`
        }

        if (this.getScore(this.botHand)>21){
            response = `${response}My Hand: ${this.botHand.map(card => card.name).join(', ')}, ${this.getScore(this.botHand)} Aww man, I lost!`
        }

        if (this.getScore(this.botHand) >= 17 && this.getScore(this.botHand) <21){
            let winner = ''
            if (this.getScore(this.playerHand) > 21 || (this.getScore(this.playerHand)<=21 && this.getScore(this.botHand) >= this.getScore(this.playerHand)) || this.getScore(this.botHand) >= this.getScore(this.playerHand)){
                winner = 'Mwehehe I win!'
            }
            else {
                winner = 'Aww man, you won!'
            }
            
             response = `${response}I stay. My Hand: ${this.botHand.map(card => card.name).join(', ')}. You had ${this.getScore(this.playerHand)}, I had ${this.getScore(this.botHand)}. ${winner}`
        }

        return response

    }

    myHand(){
        return `${this.playerHand.map(card => card.name).join(', ')}, ${this.getScore(this.playerHand)}`
    }

    checkScore() {

        if (this.getScore(this.playerHand) > 21 ) {
            return `${this.myHand()}, Ooops you busted! the Tuna is mine!`
        }

        return `${this.playerHand.map(card => card.name).join(', ')}, ${this.getScore(this.playerHand)}`

    }

    gameOver() {
        return (this.getScore(this.playerHand) >=21 || this.getScore(this.botHand) >= 21);
    }



}
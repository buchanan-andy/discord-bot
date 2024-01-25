import { BlackJack } from "../games/blackjack";
import { Wordle } from "../games/wordle";

export var blackjackGames:BlackJack[] = [];
export var wordleGames:Wordle[] = [];


export function removeBlackJackGame(game:BlackJack){
    blackjackGames.splice(blackjackGames.indexOf(game), 1)
}

export function removeWordleGame(game:Wordle){

}
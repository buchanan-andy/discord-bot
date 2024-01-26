export class Wordle {

    player:string = ''
    playerGuesses:string[] = []
    wordle:string = ''
    wordleLetters:string[] = []

    yellow = '🟨'
    green = '🟩'
    grey = '⬛'


    constructor(player:string) {

        this.player = player
    }

    setWord(word:string){
        this.wordle = word
        this.wordleLetters = this.wordle.split('')
    }

    guessWord(word:string){
        let response = ['','','','','']
        let letters = word.split('');
        let guessInstance = [...this.wordleLetters];

        for (let i = 0; i < letters.length; i++) {
            if (guessInstance.includes(letters[i])) {
              
                //Exact place
                if (guessInstance.indexOf(letters[i]) == i){
                    guessInstance[i] = '*'
                    response[i] = this.green
                }
            }
        }

        for (let j = 0; j < letters.length; j++) {
            if (guessInstance.includes(letters[j])) {
                response[j] = this.yellow
            }
            else if (response[j] === '') {
                response[j] = this.grey;
            }
          }

          let thisGuess = `${response.join('')} ${word}`
          this.playerGuesses.push(thisGuess)

          // If you got the word
          if (response.every((color) => color === this.green)){
            return `${this.playerGuesses.join('\n')}\nYou got it! It only took ${this.playerGuesses.length} tries!\nPlay again sometime!`
          }

          // Run out of playerGuesses
          if (this.playerGuesses.length == 6) {
            return `${this.playerGuesses.join('\n')}\nMwehehe I win!\nThe word was ${this.wordle}.\nPlay again sometime!`
          }

        return thisGuess
    }

    myGuesses(){
        return this.playerGuesses.join('\n')
    }
}
export class Wordle {

    player:string = ''
    guesses:string[] = []
    word:string = ''
    wordLetters:string[] = []

    yellow = '🟨'
    green = '🟩'
    grey = '⬛'


    constructor(player) {

        this.player = player
    }

    setWord(word){
        this.word = word
        this.wordLetters = this.word.split('')
    }

    guessWord(word){
        let response = ['','','','','']
        let letters = word.split('');
        let guessInstance = [...this.wordLetters];

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

          let string = `${response.join('')} ${word}`
          this.guesses.push(string)

          // If you got the word
          if (response.every((color, index) => color === this.green)){
            return `${this.guesses.join('\n')}\nYou got it! It only took ${this.guesses.length} tries!\nPlay again sometime!`
          }

          // Run out of guesses
          if (this.guesses.length == 6) {
            return `${this.guesses.join('\n')}\nMwehehe I win!\nThe word was ${this.word}.\nPlay again sometime!`
          }

        return string
    }

    myGuesses(){
        return this.guesses.join('\n')
    }
}
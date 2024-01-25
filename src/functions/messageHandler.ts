import { Message } from "discord.js";
import { serverEmoji, getRandomTobi } from "../assets/customEmoji"
import { capitalize } from "../assets/helpers"
import { AttachmentBuilder } from "discord.js";
import { blackjackGames, wordleGames, removeBlackJackGame,removeWordleGame } from "../assets/games";
import { BlackJack } from "../games/blackjack";
import { Wordle } from "../games/wordle";

type Command = {
    [key: string]: Function;
}

export const commands = {
    tobitime: (message:Message)=>{
            message.react(getRandomTobi())
            message.react('⏰')
          },
    pjtime: async (message:Message)=>{
        const resP = await fetch(`https://random-word-api.vercel.app/api?words=10&letter=p`);
        const pWord:any = await resP.json();
    
        const resJ = await fetch(`https://random-word-api.vercel.app/api?words=10&letter=j`);
        const jWord:any = await resJ.json();
        message.reply(`They call him PJ because he's the ${capitalize(pWord[0])} ${capitalize(jWord[0])}`);
    },
    heytobi: (message:Message)=> {
        let amount = Math.floor(Math.random()*5)+1
        let heytobi = Array.from({ length:amount }, () => "meow")
        message.reply(`${heytobi.join(' ')}`);
    },
    damn: (message:Message)=> {
        message.react(serverEmoji.larry)
    },
    sudo: (message:Message)=> {
        message.reply(`${message.author.username} is not in the sudoers file. This incident will be reported.`);
    },
    tobifriend: async(message:Message)=> {
        let res = await fetch('https://cataas.com/cat');
        let cat =Buffer.from(await res.arrayBuffer());
        let attach = new AttachmentBuilder(cat, {name:'cat.png'})
        message.reply({files: [attach]});
    },
    blackjack: (message:Message)=> {
        if (!blackjackGames.some(obj => obj.player === message.author.username)){
            let game = new BlackJack(message.author.username)
            blackjackGames.push(game);
            game.hit();
            game.hit();
            game.tobiHit();
            game.tobiHit();
            
            message.reply(`Welcome to PlackJack!\nLets Play!\nType 'hit me' to hit, 'stay' to stay, and 'my hand' to check your score.`);
            message.reply(`
                            Your Hand: ${game.myHand()}\n);
                            Dealer Shows: ${game.tobiHand[1].name}
                        `);
          }
          else {
          message.reply(`You already have an active game!`);
          }
    },
    hit: (message:Message)=> {
        if (!blackjackGames.some(obj => obj.player === message.author.username)){
            message.reply(`You have no active game!`);
            return
        }
    
        let game = blackjackGames.find(obj => obj.player === message.author.username);
        game!.hit();
        let out = game!.checkScore();
        if (game!.gameOver()) {
          removeBlackJackGame(game)
        }
          message.reply(out);
       
    },
    myhand: (message:Message)=> {
        if (!blackjackGames.some(obj => obj.player === message.author.username)){
            message.reply(`You have no active game!`);
            return
        }
      
        let game = blackjackGames.find(obj => obj.player === message.author.username);
          message.reply(game!.myHand());
    },
    stay: (message:Message)=> {
        if (!blackjackGames.some(obj => obj.player === message.author.username)){
            message.reply(`You have no active game!`);
            return
          }
      
        let game = blackjackGames.find(obj => obj.player === message.author.username);
          message.reply(`${message.author.username} stays. My turn mwehehe!`)
          let response = game!.tobiPlay();
          message.reply(response);
          removeBlackJackGame(game);
    },
    wordle: async (message:Message)=> {
        if (!wordleGames.some(obj => obj.player === message.author.username)){
            let wordle = new Wordle(message.author.username);
            let res = await fetch('https://random-word-api.vercel.app/api?words=1&length=5');
            let word = (await res.json())[0];
            wordle.setWord(word.toUpperCase());
            wordleGames.push(wordle);
            message.reply(`Welcome to PJordle!\nLets Play!\nType 'guess' and then your word to guess, and 'my words' to check your past guesses.`);
          }
          else {
          message.reply(`You already have an active PJordle!`);
          }
    },
    guess: async (message:Message)=> {
        if (!wordleGames.some(obj => obj.player === message.author.username)){
            return
        }
    
        let game = wordleGames.find(obj => obj.player === message.author.username);
        const match = message.content.toLowerCase().match(/guess\s(.+)/);
        // The captured group (index 1) will be the other word
        const otherWord = match ? match[1] : null;
    
        if (!otherWord){
          message.reply('You need to include a guess!')
          return
        }
    
        if (otherWord.length < 5){
          message.reply('your guess isnt long enough!')
          return
        }
    
        if (otherWord.length > 5){
          message.reply('your guess is too long!')
          return
        }
    
        let res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${otherWord}`)
        let out:any = await res.json();
        if (out.title == 'No Definitions Found') {
          message.reply('Thats not a word!')
          return
        }
    
        let response = game!.guessWord(otherWord.toUpperCase());
    
          message.reply(response);
          if (response.includes('Play again sometime!')){
            removeWordleGame(game);
          }
    },
    mywords: (message:Message)=> {
        if (!wordleGames.some(obj => obj.player === message.author.username)){
            message.reply(`You have no active game!`);
            return
        }
      
        let game = wordleGames.find(obj => obj.player === message.author.username);
        let out = game!.myGuesses() ? game!.myGuesses() : `You haven't guessed yet!`
          message.reply(out);
    },
    help: (message: Message)=> {
         message.reply(`Tobi is here to help!\nTobiBot supports the following commands:\n${Object.keys(commands).map(command => `\t!${command}`).join('\n')}`);
  }
}

    

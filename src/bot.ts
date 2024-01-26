import { Client, Events, GatewayIntentBits, TextChannel } from 'discord.js';
import { config } from 'dotenv';
import { commands } from './functions/messageHandler';
import { channels as serverChannels} from './assets/channels'

config();

const prefix = '!'

const keyCommands = Object.keys(commands);

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

function readyDiscord() {
  console.log('😺 ', client.user?.tag);
  (client.channels.cache.get(serverChannels.general) as TextChannel).send('Meow Meow! I am here!');
}

client.on("messageCreate", async (message) => {
  if (message.author.bot) return;

  // Respond to !commands
  if (message.content.startsWith(prefix)){
    const args = message.content.slice(prefix.length).trim().toLowerCase().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!keyCommands.includes(command)) return;

    await commands[command](message);
  }

  // Respond directly to text content
  else {
    if (message.content.includes('damn')){
      commands.damn(message);
    }
    if (message.content.includes('sudo')){
      commands.sudo(message);
    }
  }

});

client.once(Events.ClientReady, readyDiscord);

client.login(process.env.TOKEN);
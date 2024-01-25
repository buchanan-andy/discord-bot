// Importing modules using ES6 syntax
import { SlashCommandBuilder } from 'discord.js';

// Command Builder export
export const data = new SlashCommandBuilder()
  .setName('tobi')
  .setDescription('Tobi the itty bitty kitty');

// Execute function export
export async function execute(interaction) {
  await interaction.reply('meow gimme tuna!');
}

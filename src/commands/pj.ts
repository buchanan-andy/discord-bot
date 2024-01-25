// Importing modules using ES6 syntax
import { SlashCommandBuilder } from 'discord.js';

const OptionsP= [
  "Pineapple",
  "Parrot",
  "Playground",
  "Pizza",
  "Purple",
  "Piano",
  "Pumpkin",
  "Penguin",
  "Planet",
  "Pancake",
  "Pencil",
  "Puzzle",
  "Peacock",
  "Palace",
  "Popcorn",
  "Pegasus",
  "Pluto",
  "Pilot",
  "Puddle"
];

const OptionsJ = [
  "Jungle",
  "Jazz",
  "Jacket",
  "Jump",
  "Jigsaw",
  "Jelly",
  "January",
  "Jupiter",
  "Jade",
  "Joy",
  "Jaguar",
  "Journal",
  "Judge",
  "Jogging",
  "Jar",
  "Jeans",
  "Jolly",
  "Jigsaw",
  "Jolt",
  "Journey"
];
// Command Builder export
export const data = new SlashCommandBuilder()
  .setName('pj')
  .setDescription('Why do they call him PJ?');

// Execute function export
export async function execute(interaction) {

  await interaction.reply(`
  They call him PJ because he's the ${OptionsP[Math.floor(Math.random() * OptionsP.length)]} ${OptionsJ[Math.floor(Math.random() * OptionsJ.length)]}
  
  `);
}

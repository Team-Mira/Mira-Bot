const { Client, Intents } = require('discord.js');

// 32767 gives our client all intents. Should change as soon as we know
// the exact scope our bot will need
const intents = new Intents(32767);
const client = new Client({ intents });

const messageAdd = require('./api/messageAdd')
const messageDelete = require('./api/messageDelete')
const messageUpdate = require('./api/messageUpdate')
const reactionAdd = require('./api/reactionAdd')
const reactionRemove = require('./api/reactionRemove')

client.on('ready', () => {
  console.log(`Bot initiated!`);
});


/*
  Creates event listeners for creating, updating, and deleting messages and
  reactions. The axios calls are handled in the api folder.
*/
client.on("messageCreate", async (msg) => {
  const { author, content } = msg

  // The bot will not save empty messages or messages from other bots
  if(content !== '' && !(author.bot)){
    messageAdd(msg)
  }
})

client.on('messageDelete', async (msg) => {
  messageDelete(msg)
})

client.on('messageUpdate', async (msg) => {
  messageUpdate(msg)
})


client.on('messageReactionAdd', async (reaction, user) => {
  reactionAdd(reaction, user)
})

client.on('messageReactionRemove', async (reaction, user)  => {
  reactionRemove(reaction, user)
})

client.login(process.env.BOT_TOKEN)

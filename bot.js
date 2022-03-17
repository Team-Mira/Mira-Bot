require('dotenv').config()
const axios = require('axios');
const { Client, Intents } = require('discord.js');
const intents = new Intents(32767);
const client = new Client({ intents });

client.on('ready', () => {
  console.log(`Bot initiated!`);
});

client.on("messageCreate", msg => {
  const { guildId, channelId, author, id, content } = msg
  const isReply = msg.type === 'REPLY' ? true : false
  const repliedUser = msg.mentions.repliedUser === null ? null : msg.mentions.repliedUser.id

  if(content !== '' && !(author.bot)){
    const user = {
      id: author.id,
      name: author.username
    }

    const message = {
      id,
      content,
      isReply,
      repliedUser
    }

    const server = {
      id: guildId
    }

    const channel = {
      id: channelId
    }

    const body = {
      user,
      message,
      server,
      channel,
    }

    // axios.post('http://localhost:8080/api/message/add', body)
    axios.post('https://mira-api-cs.herokuapp.com/api/message/add', body)
  }
})

client.on('messageDelete', msg => {
  const { id } = msg
  axios.delete('https://mira-api-cs.herokuapp.com/api/message/delete', { data: { id }})
})

client.on('messageUpdate', msg => {
  const { id } = msg
  const { content } = msg.reactions.message

  axios.put('https://mira-api-cs.herokuapp.com/api/message/update', { id, content })
})


client.on('messageReactionAdd', reaction => {
  const message = {
    id: reaction.message.id
  }
  axios.put('https://mira-api-cs.herokuapp.com/api/message/reaction/add', { message })
})

client.on('messageReactionRemove', reaction => {
  const message = {
    id: reaction.message.id
  }
  axios.put('https://mira-api-cs.herokuapp.com/api/message/reaction/remove', { message })
})


client.login(process.env.BOT_TOKEN)

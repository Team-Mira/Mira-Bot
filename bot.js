require('dotenv').config()
const axios = require('axios');
const { Client, Intents } = require('discord.js');
const intents = new Intents(32767);
const client = new Client({ intents });
const address = process.env.ADDRESS || 'http://localhost:8080'

client.on('ready', () => {
  console.log(`Bot initiated!`);
});

client.on("messageCreate", msg => {
  const { guildId, channelId, author, id, content, mentions } = msg
  const isReply = msg.type === 'REPLY' ? true : false
  const repliedUser = msg.mentions.repliedUser === null ? null : msg.mentions.repliedUser.id
  const mentionedUsers = []

  mentions.users.each(user =>  mentionedUsers.push({name: user.username, id: user.id, avatar: user.displayAvatarURL()}))

  if(content !== '' && !(author.bot)){
    const user = {
      id: author.id,
      name: author.username,
      avatar: author.displayAvatarURL()
    }

    const message = {
      id,
      content,
      isReply,
      repliedUser,
      mentionedEveryone: mentions.everyone,
      mentionedUsers
    }

    const server = {
      id: guildId,
      name: msg.guild.name
    }

    const channel = {
      id: channelId,
      name: msg.channel.name
    }

    const body = {
      user,
      message,
      server,
      channel,
    }

    axios.post(`${address}/api/message/add`, body)
  }
})

client.on('messageDelete', msg => {
  const { id } = msg
  // axios.delete('https://mira-api-cs.herokuapp.com/api/message/delete', { data: { id }})
  axios.delete(`${address}/api/message/delete`, { data: { id }})
})

client.on('messageUpdate', msg => {
  const { id } = msg
  const { content } = msg.reactions.message

  axios.put(`${address}/api/message/update`, { id, content })
})


client.on('messageReactionAdd', (reaction, user) => {
  const message = {
    id: reaction.message.id,
    userId: reaction.message.author.id
  }

  const emoji = {
    id: reaction.emoji.id,
    name: reaction.emoji.name
  }

  const reactor = {
    id: user.id,
    name: user.username,
    avatar: user.displayAvatarURL()
  }

  const body = {
    message,
    emoji,
    reactor
  }

  axios.put(`${address}/api/message/reaction/add`, body)
})

client.on('messageReactionRemove', (reaction, user)  => {

  const message = {
    id: reaction.message.id
  }

  const emoji = {
    id: reaction.emoji.id,
  }

  const reactor = {
    id: user.id
  }

  const body = {
    message,
    emoji,
    reactor
  }

  axios.put(`${address}/api/message/reaction/remove`, body)
})

client.login(process.env.BOT_TOKEN)

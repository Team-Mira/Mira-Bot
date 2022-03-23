require('dotenv').config()
const axios = require('axios');
const address = process.env.ADDRESS || 'http://localhost:8080'

async function reactionAdd(reaction, user){
  const newReaction = {
    reactorId: user.id,
    messageId: reaction.message.id,
    emojiId: reaction.emoji.id,
    authorId: reaction.message.author.id,
    emojiName: reaction.emoji.name
  }

  try {
    const { data } = await axios.post(`${address}/api/reaction/add`, { newReaction })
    console.log(data)
  } catch(error) {
    console.log(error.code)
  }
}

module.exports = reactionAdd

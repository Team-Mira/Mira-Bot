require('dotenv').config()
const axios = require('axios');
const address = process.env.ADDRESS || 'http://localhost:8080'

async function reactionRemove(reaction, user){
  const ids = {
    reactorId: user.id,
    messageId: reaction.message.id,
    emojiId: reaction.emoji.id
  }


  try {
    const { data } = await axios.delete(`${address}/api/reaction/delete`, {data: { ids }})
    console.log(data)
  } catch(error) {
    console.log(error.code)
  }
}

module.exports = reactionRemove

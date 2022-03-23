require('dotenv').config()
const axios = require('axios');
const address = process.env.ADDRESS || 'http://localhost:8080'

async function mentionAdd(mentionedId, authorId, messageId){

  const newMention = {
    mentionedId,
    authorId,
    messageId
  }

  try {
    const { data } = await axios.post(`${address}/api/mention/add`, { newMention })
    console.log(data)
  } catch(error) {
    console.log(error.code)
  }
}

module.exports = mentionAdd

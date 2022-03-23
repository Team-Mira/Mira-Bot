require('dotenv').config()
const axios = require('axios');
const address = process.env.ADDRESS || 'http://localhost:8080'

async function messageUpdate(msg){
  const { id } = msg
  const { content } = msg.reactions.message

  try {
    const { data } = await axios.put(`${address}/api/message/update`, { id, content })
    console.log(data)
  } catch(error) {
    console.log(error.code)
  }
}

module.exports = messageUpdate

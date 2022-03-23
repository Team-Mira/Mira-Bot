require('dotenv').config()
const axios = require('axios');
const address = process.env.ADDRESS || 'http://localhost:8080'
const messageExtract = require('../utility/messageExtract')
const mentionAdd = require('./mentionAdd')

/*
  Maps over the mentioned users if present, then deconstructs the msg
  object and sends it to our server.
*/

async function messageAdd(msg){

  const newMessage = messageExtract(msg)

  try {
    const { data } = await axios.post(`${address}/api/message/add`, { newMessage })
    console.log(data)
  } catch(error) {
    console.log(error.code)
  }

  msg.mentions.users.map(user => mentionAdd(user.id, msg.author.id, msg.id))
}

module.exports = messageAdd

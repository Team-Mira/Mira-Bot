require('dotenv').config()
const axios = require('axios');
const address = process.env.ADDRESS || 'http://localhost:8080'

async function messageDelete(msg){
  const { id } = msg

  try {
    const { data } = await axios.delete(`${address}/api/message/delete`, { data: { id }})
    console.log(data)
  } catch(error) {
    console.log(error.code)
  }
}

module.exports = messageDelete

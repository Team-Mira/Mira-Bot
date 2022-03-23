/*
  This function just deconstructs the msg object while also adding an
  'isReply' and 'repliedUserId'. It was made into a seperate function for
  cleanliness sake.
*/

function messageExtract(msg){
  const { guildId, channelId, author, id, content, mentions } = msg
  const isReply = msg.type === 'REPLY' ? true : false
  const repliedUserId = msg.mentions.repliedUser === null ? null : msg.mentions.repliedUser.id
  const message = {
    id,
    authorId: author.id,
    channelId,
    guildId,
    content,
    isReply,
    repliedUserId,
    mentionedEveryone: mentions.everyone,
  }

  return message
}

module.exports = messageExtract

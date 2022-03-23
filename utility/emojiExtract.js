/*
  Not using this at the moment, however it might be valuable for grabbng
  emojis when processing data
*/

function emojiExtract(content){
  const emojis = []
  content.forEach((element) => {
    const eFirstIndex = element.indexOf(':')
    const eLastIndex = element.lastIndexOf(':')
    const stringEnd = element.indexOf('>')

    const emoji = {
      name: element.slice(eFirstIndex + 1, eLastIndex),
      id: element.slice(eLastIndex + 1, stringEnd)
    }
    emojis.push(emoji)
  })

  return emojis
}

module.exports = emojiExtract

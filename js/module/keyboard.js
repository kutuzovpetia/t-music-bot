module.exports = function Keyboards(dataArray){
    const option = {
        reply_markup: {
            inline_keyboard: []
        }
    }
    dataArray.forEach(item=>{
         option.reply_markup.inline_keyboard.push([{text: `${item.artist.name ? item.artist.name : item.artist[0].name} - ${item.name}`, callback_data: item.videoId}])
    })
    return option;
}
const TelegramApi = require('node-telegram-bot-api');
const Search = require('./js/module/search-music');
const option = require('./js/module/downloadOption');
const Keyboard = require('./js/module/keyboard');
const fs = require('fs');
const YoutubeMp3Downloader = require("youtube-mp3-downloader");

if (!fs.existsSync('./music')){
    fs.mkdirSync('./music');
}

const token = '1596428981:AAG5zWC68zFnxFXiCe1veYKrFks8vdQ7QEI';
const bot = new TelegramApi(token, {polling: true})

const start = () => {

    bot.setMyCommands([
        // {command: '/start', description: 'Начальное приветствие'},
        // {command: '/info', description: 'Информация'},
        // {command: '/game', description: 'Game'},
        {command: '/music', description: 'Music'},
    ])

    bot.on('message', async msg =>{
        const text = msg.text;
        const chatId = msg.chat.id;

        if(text == '/start'){
            await bot.sendMessage(chatId, `Добро пожаловать ${msg.from.first_name} ${msg.from.last_name}`)
            return await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/54b/cec/54bceca3-3448-44e0-9772-fa7d598b2a87/2.webp')
        }
        if(text == '/info'){
           return await bot.sendMessage(chatId, `Тебя зовут ${msg.from.first_name} ${msg.from.last_name}`)
        }

        const s = new Search();
        let lol = null;
        await s.getMusic(text).then( async res=>{
            lol = await res;
        })
        return await bot.sendMessage(chatId, `Исполнитель ${text}`, Keyboard(lol));

    })

    bot.on('callback_query',  msg =>{
        const chatId = msg.message.chat.id;
        const videoId = msg.data;
        const YD = new YoutubeMp3Downloader(option);
        YD.download(videoId, "1.mp3");
        YD.on("finished", function(err, data) {
            // console.log(JSON.stringify(data));
            return bot.sendAudio(chatId, './music/1.mp3')
        });
        YD.on("error", function(error) {
            console.log(error);
        });
    })
}

start();
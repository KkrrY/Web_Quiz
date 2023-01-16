let message = "";

const TelegramBot = require('node-telegram-bot-api');

const token = '';

const bot = new TelegramBot(token, {polling: true});

const chatId = 423424;

bot.sendMessage(chatId, message);
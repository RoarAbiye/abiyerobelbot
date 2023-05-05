require('dotenv').config()
const express = require('express');

const token = process.env.TELEGRAM_TOKEN;
const url = process.env.SERVER_URL;
const port = process.env.PORT || 5000;

const TelegramBot = require('node-telegram-bot-api');

// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(token);

// This informs the Telegram servers of the new webhook.
bot.setWebHook(`${url}/bot${token}`);

const app = express();

// parse the updates to JSON
app.use(express.json());

// We are receiving updates at the route below!
app.post(`/bot${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

// Start Express Server
app.listen(port, () => {
  console.log(`Express server is listening on ${port}`);
});

// Just to ping!
bot.on('message', async msg => {
  // bot.sendMessage(msg.dice.id, `${bot.sendDice()}`)
  // bot.sendMessage(msg.chat.id, 'I am alive!');
  await bot.sendMessage(msg.chat.id, `${msg.from.first_name} wrote a String with length of ${msg.text.length}`);
})

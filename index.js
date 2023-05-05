require("dotenv").config()

import express from "express"
import { json } from "body-parser"
import { get, post } from "axios"

const { TOKEN, SERVER_URL } = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
const URI = `/webhook/${TOKEN}`
const WEBHOOK_URL = SERVER_URL   + URI

const app = express()
app.use(json())

const init = async () => {
  const res = await get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
  console.log(res.data)
}

app.post(URI, async (req, res) => {
  console.log(req.body)

  const chatId = req.body.message.chat.id;
  const text = req.body.message.text;

  await post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text: text
  })
  return res.send()
})

app.listen(process.env.PORT || 5000, async () => {
  console.log('🚀 app running on port', process.env.PORT || 5000);
  await init();
})

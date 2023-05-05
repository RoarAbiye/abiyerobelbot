require("dotenv").config()

const express = require("express")
const bodyParser = require("body-parser")
const axios = require("axios")

const { TOKEN, SERVER_URL } = process.env
const TELEGRAM_API = `https://api.telegram.org/bot${TOKEN}`
const URI = `/webhook/${TOKEN}`
const WEBHOOK_URL = SERVER_URL + URI

const app = express()
app.use(bodyParser.json())

const init = async () => {
  const res = await axios.get(`${TELEGRAM_API}/setWebhook?url=${WEBHOOK_URL}`)
  console.log(res.data)
}

app.post(`${URI}`, async (req, res) => {
  console.log(req.body)

  const chatId = req.body.message.chat.id;
  const text = req.body.message.text;

  await axios.post(`${TELEGRAM_API}/sendMessage`, {
    chat_id: chatId,
    text: text
  })
  console.log("message sending triggered")
  return res.send()
})

app.get('/debug', (req, res) => {
  return res.body({
    "TELEGRAM_API": TELEGRAM_API,
    "URI": URI,
    "WEBHOOK_URL": WEBHOOK_URL
  })
})
app.listen(process.env.PORT || 10000, async () => {
  console.log('🚀 app running on port', process.env.PORT || 10000);
  await init();
})

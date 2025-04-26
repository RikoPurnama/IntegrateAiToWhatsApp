const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use((req, res, next) => {
    if (req.method === "POST") {
        bodyParser.json()(req, res, next);
    } else {
        next();
    }
});

// Webhook Verification
app.get("/webhook", (req, res) => { // ✅ fix kebalik req, res
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token) {
        if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
            console.log("WEBHOOK_VERIFIED");
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

// Webhook Receiver
app.post("/webhook", async (req, res) => {
    const body = req.body;

    if (body.object) {
        if (
            body.entry &&
            body.entry[0].changes &&
            body.entry[0].changes[0].value.messages
        ) {
            const phone_number_id = body.entry[0].changes[0].value.metadata.phone_number_id;
            const from = body.entry[0].changes[0].value.messages[0].from;
            const msg_body = body.entry[0].changes[0].value.messages[0].text.body;

            console.log(`Pesan masuk dari ${from}: ${msg_body}`);

            const aiResponse = await getChatGPTResponse(msg_body);

            await sendMessage(from, aiResponse);
        }
        res.sendStatus(200);
    } else {
        res.sendStatus(404);
    }
});

// Kirim Pesan ke WhatsApp
async function sendMessage(to, text) {
    try {
        const response = await axios({
            method: "POST",
            url: `https://graph.facebook.com/v19.0/${process.env.PHONE_NUMBER_ID}/messages`,
            headers: {
                "Authorization": `Bearer ${process.env.WHATSAPP_TOKEN}`,
                "Content-Type": "application/json",
            },
            data: {
                messaging_product: "whatsapp",
                to: to,
                text: { body: text }
            }
        });

        console.log("Pesan terkirim:", response.data);
    } catch (error) {
        console.error("Gagal mengirim pesan:", error.response ? error.response.data : error.message);
    }
}

// Dapatkan Balasan dari ChatGPT
async function getChatGPTResponse(message) {
    try {
        const response = await axios({
            method: "POST",
            url: "https://api.openai.com/v1/chat/completions",
            headers: {
                "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
                "Content-Type": "application/json"
            },
            data: {
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: message }]
            }
        });

        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error("Gagal mendapatkan balasan AI:", error.response ? error.response.data : error.message);
        return "Maaf, saya tidak bisa memproses pesanmu.";
    }
}

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});

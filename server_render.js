
// server_render.js
// UTF-8 encoding to handle Bangla text properly

const express = require('express');
const fetch = require('node-fetch');
const app = express();

app.use(express.json());

// আপনার চ্যাট আইডি এবং বট টোকেন
const CHAT_ID = "-1002524862125";
const BOT_TOKEN = "8281909060:AAGpyeBOTXP_hWDSOYe4A9mzYbKiyCbJ_rk";

// শুধুমাত্র Microworkers এর মেসেজ পাঠাবে
app.post('/send', async (req, res) => {
    const { text } = req.body;
    if (!text.toLowerCase().includes("microworkers")) {
        return res.status(200).send({ status: "ignored" });
    }

    try {
        const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text })
        });
        const data = await response.json();
        res.send(data);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.get('/', (req, res) => {
    res.send('Telegram Proxy Server is running...');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

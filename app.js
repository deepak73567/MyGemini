

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors = require('cors');

app.use(bodyParser.json());

app.use(cors({
  origin: 'https://my-gemini-eta-nine.vercel.app', // Your frontend URL
  methods: ['GET', 'POST'],
  credentials: true
}));

app.post('/getResponse', async (req, res) => {
  try {
    const question = req.body.question;
    console.log("Received question:", question);

    const genAI = new GoogleGenerativeAI('AIzaSyAgbBMGxHtGH18EsH3VThHKrNFoJZB7vCk'); // 🔒 Replace with real key
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(question);
    const aiResponse = result?.response?.text?.();

    if (!aiResponse) {
      return res.status(500).json({ response: "No response received from AI." });
    }

    console.log("AI RESPONSE:", aiResponse);

    res.status(200).json({ response: aiResponse });
  } catch (error) {
    console.error("Error generating content:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.use((req, res) => {
  res.status(404).json({ msg: 'Route not found' });
});

module.exports = app;

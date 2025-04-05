const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");
const cors=require('cors')
app.use(bodyParser.json());

app.use(cors({
  origin: 'https://my-gemini-eta-nine.vercel.app/getResponse', // Ya jo bhi tumhara frontend domain ho
  methods: ['GET', 'POST'],
  credentials: true // Agar cookies ya headers use kar rahe ho toh
}));


app.post('/getResponse', async (req, res) => {
    console.log("Received question:", req.body.question);

    const genAI = new GoogleGenerativeAI('AIzaSyAgbBMGxHtGH18EsH3VThHKrNFoJZB7vCk'); // Replace with your API key
    const model=genAI.getGenerativeModel({model:"gemini-1.5-flash"});

  model.generateContent(req.body.question).then(result=>{
   console.log(result.response.text());
   const response=result.response.text();
   res.status(200).json({
    response:response
   })
  }) .catch(err=>{
    console.log(err);
    res.status(500).json({
        error:err
    })
  })

    
});
app.use((req, res) => {
  res.status(404).json({ msg: 'Route not found' });
});
module.exports = app;

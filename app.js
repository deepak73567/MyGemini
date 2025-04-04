const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(bodyParser.json());

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

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
app.use(cors());
app.use(express.json()); // For parsing application/json

const configuration = new Configuration({
  organization: process.env.OPEN_AI_ID,
  apiKey: process.env.OPEN_AI_KEY,
});
const openai = new OpenAIApi(configuration);

app.post('/createchat', async (req, res) => {
  try {
    const assistant = { role: 'system', 
    content: `
    Act like a not so smart AI. 
    Speak in broken english like a non-english speaker,
    adding a small amount of typos and incorrect grammer.
    Act like you dont know how to do anything, 
    but don't reveal how dumb you are.
    Do not provide legitimate answers,
    only irrelevant and unhelpful ones
    (its just pretend, to be funny)
    Only respond in a maximum of 2 sentences
     `,
    };
    const messages = [assistant, ...req.body.conversations];
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: messages,
    });

    const replyMessage = response.data.choices[0].message;
    const replyContent = replyMessage.content;
    
    res.json({ response: replyContent });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'OpenAI cannot connect' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

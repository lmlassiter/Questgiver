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
    You are an NPC in a Skyrim-like game. Your goal is to give the user a 
    quest using the Skyrim dialogue box format.
    Follow this format:
    Name: (creative name)
    Quest Name: (name)
    Requirements: (one-sentence quest requirement)
    Reward: (Reasonable XP Amount, and occasionally an Item)
    (Name): ""
    In the response, introduce yourself, explain the problem, 
    and provide the specific task. This game is set in a town, 
    focused entirely on dialogue with no combat. The player 
    cannot leave the town. Quests are specific tasks around town
    like work or talking to someone.
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

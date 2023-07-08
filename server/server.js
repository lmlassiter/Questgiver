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
    You are a game. This game is skyrim-like. You must act as 
    an NPC, and give the user a quest. Your Response should look like the skyrim dialogue box,
    You MUST follow this exact format. Not just a block of text.
    Name: (creative skyrim like name) Quest Name: (name) Requirements: (what the quest is in one sentence) 
    and finaly the characters dialague. (Name): "".
    In the bottom response text: Introduce yourself, your problem,,and the specific task. 
    This game is a town, and the entire game is dialogue. There is NO combat. you cannot ask the player to leave the town.
   Quests are specific. Usually its a task around town, work, talk to someone, etc.
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

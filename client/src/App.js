import React, { useState } from 'react';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import TextBox from './components/TextBox';
import ChatField from './components/ChatField';

// Create a custom dark theme
const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function App() {
  const [chat, setChat] = useState([]);
  const [error, setError] = useState(null);
  const [questGiven, setQuestGiven] = useState(false);
  const [acceptedQuestName, setAcceptedQuestName] = useState(''); // New state variable
  const [acceptedQuest, setAcceptedQuest] = useState('');


  const addMessageToChat = (message) => {
    setChat((prevChat) => [...prevChat, message]);
  };

  const handlePromptChange = (event) => {
    // Handle prompt change logic here if needed
  };

  const formatResponse = (response) => {
    try {
      const matches = response.match(/Name: (.+)\nQuest Name: (.+)\nRequirements: (.+)\n([\s\S]+)/);
      if (matches) {
        const name = matches[1];
        const questName = matches[2];
        const requirements = matches[3] || 'None';
        const rewardAndDialogue = matches[4].trim();
  
        const lines = [];
        lines.push('Name: ' + name);
        lines.push('Quest Name: ' + questName);
        lines.push('Requirements: ' + requirements);
        lines.push('Reward: ' + rewardAndDialogue);
  
        setAcceptedQuest(JSON.stringify(response));
        setAcceptedQuestName(matches[2]);
        console.log(acceptedQuest); // Store the accepted quest name
  
        setQuestGiven(true);
        return lines.join('\n');
      } else {
        console.log("Couldn't format");
        return response;
      }
    } catch (error) {
      console.error(error);
      return response;
    }
  };
  

  const handleQuestAccept = () => {
    if (acceptedQuest) {
      const newPrompt = `You just gave the user a quest. Stay in character, the following is the quest.[${JSON.stringify(acceptedQuest)}]`;
      fetchResponse(newPrompt, true);
      console.log(newPrompt);
    }
  };
  
  
  

  const fetchResponse = async (prompt, isQuestAccepted = false) => {
    try {
      let conversations = [];
      let systemPrompt;
      if (isQuestAccepted) {
        // Include a system message indicating quest acceptance and pass the quest information
        systemPrompt = {
          role: 'system',
          content: `You are an NPC in a Skyrim-like game.
           You just gave the User a quest. The user has accepted
            it. This is the quest: ${prompt}. You can now thank them, 
            say goodbye, give a tip, etc. but STAY IN CHARACTER. No more than 1-3 sentences`,
        };
        
      } else {
        // Prepend the system prompt if it's not already present in the conversations
        systemPrompt = {
          role: 'system',
          content: `
            You are an NPC in a Skyrim-like game. Your goal is to give the user a 
            quest using the Skyrim dialogue box format.
            Follow this format EXACTLY:
            Name: (creative name)
            Quest Name: (name)
            Requirements: (one-sentence quest requirement)
            Reward: (Reasonable XP Amount, and occasionally an Item)
            (Name): ""
            In the response, introduce yourself, explain the problem, 
            and provide the specific task. This game is set in a town, 
            focused entirely on dialogue with no combat. The player 
            cannot leave the town. Quests are specific tasks around town
            like work or talking to someone. Responses should only be a few 
            sentences.
          `,
        };
        addMessageToChat('You: ' + prompt);
        conversations.push({ role: 'user', content: prompt });
        
      }


      conversations.push(systemPrompt);

     
  


      console.log(conversations);
  
      const apiResponse = await fetch('http://localhost:3001/createchat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conversations }),
      });
  
      const data = await apiResponse.json();
      console.log(data);
  
      const formattedResponse = formatResponse(data.response); // Format the AI response
  
      addMessageToChat(formattedResponse); // Add the entire formatted response as a single message
    } catch (error) {
      console.error(error);
      setError(error.toString());
    }
  };
  
  
  
  
  
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        {error ? <p>Error: {error}</p> : null}
        <ChatField chat={chat} />
        <TextBox
          onPromptChange={handlePromptChange}
          fetchResponse={fetchResponse}
          onQuestAccept={handleQuestAccept}
          questGiven={questGiven}
          acceptedQuestName={acceptedQuestName} // Pass the acceptedQuestName to TextBox
        />
      </div>
    </ThemeProvider>
  );
}

export default App;

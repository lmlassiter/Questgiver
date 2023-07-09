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

  const addMessageToChat = (message) => {
    setChat((prevChat) => [...prevChat, message]);
  };

  const handlePromptChange = (event) => {
    // Handle prompt change logic here if needed
  };

  const formatResponse = (response) => {
    const matches = response.match(/Name: (.+)\nQuest Name: (.+)\nRequirements: (.+)\n([\s\S]+)/);
    if (matches) {
      const name = matches[1];
      const questName = matches[2];
      const requirements = matches[3];
      const rewardAndDialogue = matches[4].trim();
  
      const lines = [];
      lines.push('Name: ' + name);
      lines.push('Quest Name: ' + questName);
      lines.push('Requirements: ' + requirements);
      lines.push('Reward: ' + rewardAndDialogue);
  
      setQuestGiven(true);
      return lines.join('\n');
    } else {
      console.log("Couldn't format");
      return response;
    }
  };
  

  
  
  
  

const handleQuestAccept = () => {
  const questNameMessage = chat.find((message) => typeof message === 'string' && message.startsWith('Quest Name: '));
  if (questNameMessage) {
    const questName = questNameMessage.replace('Quest Name: ', '').trim();
    const message = `Quest "${questName}" accepted.`; // Extract the quest name and include it in the message
    addMessageToChat(message); // Add the quest acceptance message to the chat
  }
};



  const fetchResponse = async (prompt) => {
    try {
      addMessageToChat('You: ' + prompt); // Add the player's input to the chat
  
      const apiResponse = await fetch('http://localhost:3001/createchat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ conversations: [{ role: 'user', content: prompt }] }),
      });
      const data = await apiResponse.json();
      console.log(data);
  
      const formattedResponse = formatResponse(data.response); // Format the AI response
  
      // Check if the formatted response contains multiple lines
      const responseLines = formattedResponse.split('\n');
      if (responseLines.length > 1) {
        addMessageToChat(responseLines); // Add the formatted response as an array of lines
      } else {
        // If it's a single line, treat it as a regular message
        addMessageToChat(formattedResponse);
      }
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
        />
      </div>
    </ThemeProvider>
  );
}

export default App;

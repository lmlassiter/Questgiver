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

  const addMessageToChat = (message) => {
    setChat((prevChat) => [...prevChat, message]);
  };

  const handlePromptChange = (event) => {
    // Handle prompt change logic here if needed
  };

  const formatResponse = (response) => {
    const lines = [];
  
    // Extract the name, quest name, requirements, and dialogue from the response
    const matches = response.match(/Name: (.+)\sQuest Name: (.+)\sRequirements: (.+)\s(.+): "(.+)"/);
    if (matches && matches.length === 6) {
      const name = matches[1];
      const questName = matches[2];
      const requirements = matches[3];
      const dialogueName = matches[4];
      const dialogue = matches[5];
  
      // Format the response lines
      lines.push(name);
      lines.push('Quest Name: ' + questName);
      lines.push('Requirements: ' + requirements);
      lines.push(dialogueName + ': "' + dialogue + '"');
    } else {
      // If the response format doesn't match the expected pattern, simply display the response as is
      lines.push(response);
      console.log("Couldn't format");
    }
  
    return lines.join('\n'); // Join the lines with line breaks
  };
  
  
  const fetchResponse = async (prompt) => {
    try {
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
        addMessageToChat('You: ' + prompt);
        addMessageToChat(responseLines); // Add the formatted response as an array of lines
      } else {
        // If it's a single line, treat it as a regular message
        addMessageToChat('You: ' + prompt);
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
        <TextBox onPromptChange={handlePromptChange} fetchResponse={fetchResponse} />
      </div>
    </ThemeProvider>
  );
}

export default App;

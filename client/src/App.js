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
      addMessageToChat('You: '+ prompt);
      addMessageToChat('Smart-AI: '+ data.response);
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

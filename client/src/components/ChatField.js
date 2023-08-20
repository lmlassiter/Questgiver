import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import './chatfield.css';
import CharacterTyping from './CharacterTyping';
import idleGif from "../NPC/idle.gif";
import talkingGif from "../NPC/talking.gif";

function ChatField({ chat, characterName }) {
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);  // Added state to track the current message's role

  useEffect(() => {
    setDisplayedMessages([]);
  }, [chat]);

  const startTypingAnimation = (role) => {
    setIsTyping(true);
    setCurrentRole(role);  // Set the role when typing starts
  };

  const endTypingAnimation = () => {
    setIsTyping(false);
    setCurrentRole(null);  // Clear the role when typing ends
  };

  return (
    <Box
      sx={{
        width: '80%',
        padding: '16px',
        backgroundColor: 'background.paper',
        borderRadius: '8px',
        margin: '0 auto',
        overflowY: 'auto',
        maxHeight: 'calc(100vh - 250px)',
        marginTop: '300px',
      }}
    >
      <Box 
  sx={{ position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', width: '250px',
    height: 'max-content', borderColor: "#A0A0A0", borderStyle: "solid", padding: "20px", borderRadius: "15px" }}
>
  {isTyping && currentRole !== 'user' ? (
    <img src={talkingGif} alt="Talking NPC" style={{ width: '100%', height: 'auto', opacity: "100%" }} />
  ) : (
    <img src={idleGif} alt="Idle NPC" style={{ width: '100%', height: 'auto', opacity: "100%" }} />
  )}
  <Typography 
    align="center" 
    variant="h5" 
    color="text.primary" 
    className={characterName && characterName !== 'Name: Unknown' ? 'shine-effect' : ''}
    sx={{
        fontFamily: "'Cinzel', serif",
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
        letterSpacing: '1px',
        fontWeight: 'bold'
    }}
>
    {characterName || "Name: Unknown"}
</Typography>


</Box>


      {chat.map((message, index) => {
        const role = message.role || 'user';
        const content = Array.isArray(message.content) ? message.content : [message.content];

        return (
          <Box key={index} component="div" marginBottom={2}>
            <Paper elevation={3} sx={{
              padding: '12px',
              marginBottom: '16px',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'text.primary',
            }}>
              {content.map((line, lineIndex) => (
                <Typography key={lineIndex} variant="body1">
                  <CharacterTyping text={line} onAnimationStart={() => startTypingAnimation(role)} onAnimationEnd={endTypingAnimation} />
                </Typography>
              ))}
            </Paper>
          </Box>
        );
      })}
    </Box>
  );
}

export default ChatField;

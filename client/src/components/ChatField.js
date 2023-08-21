import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import './chatfield.css';
import CharacterTyping from './CharacterTyping';
import idleGif from "../NPC/idle.gif";
import talkingGif from "../NPC/talking.gif";

function ChatField({ chat, characterName }) {
  const [isTyping, setIsTyping] = useState(false);
  const [currentRole, setCurrentRole] = useState(null);

  const startTypingAnimation = (role, message) => {
    setIsTyping(true);
    setCurrentRole(role);
  };

  const endTypingAnimation = () => {
    setIsTyping(false);
    setCurrentRole(null);
  };

  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'row',
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: 'max-content',
          borderColor: "#A0A0A0",
          borderStyle: "solid",
          padding: "20px",
          borderRadius: "15px"
        }}
      >
        {/* The GIF */}
        {isTyping && currentRole !== 'user' ? (
          <img src={talkingGif} alt="Talking NPC" style={{marginTop: "30px", width: '200px', height: 'auto', opacity: "100%" }} />
        ) : (
          <img src={idleGif} alt="Idle NPC" style={{marginTop: "30px", width: '200px', height: 'auto', opacity: "100%" }} />
        )}
  
        {/* The Name & Message Content */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginLeft: '20px',
            flexGrow: 1,
          }}
        >
          <Typography
            variant="h5"
            color="text.primary"
            className={characterName && characterName !== 'Name: Unknown' ? 'shine-effect' : ''}
            sx={{
              fontFamily: "'Cinzel', serif",
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              letterSpacing: '1px',
              fontWeight: 'bold',
              marginBottom: '20px'
            }}
          >
            {characterName || "Name: Unknown"}
          </Typography>
  
          {chat.map((message, index) => {
            if (message.role === 'npc') {
              const content = Array.isArray(message.content) ? message.content.join(" ") : message.content;
              return (
                <Typography key={index} variant="body1" color="text.primary">
                  <CharacterTyping text={content} onAnimationStart={() => startTypingAnimation(message.role, content)} onAnimationEnd={endTypingAnimation} />
                </Typography>
              );
            }
            return null;
          })}
        </Box>
      </Box>
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
</Box>

{chat.map((message, index) => {
  const role = message.role || 'user';
  const content = Array.isArray(message.content) ? message.content.join(" ") : message.content;

  if (role === 'user') {
    return (
      <Box key={index} component="div" marginBottom={2}>
        <Paper elevation={3} sx={{
          padding: '12px',
          marginBottom: '16px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: 'text.primary',
        }}>
          <Typography variant="body1">
            <CharacterTyping text={content} onAnimationStart={() => startTypingAnimation(role, content)} onAnimationEnd={endTypingAnimation} />
          </Typography>
        </Paper>
      </Box>
    );
  }
  return null;
})}
</div>
);
}

export default ChatField;

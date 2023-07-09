import React from 'react';
import { Box, Paper, Typography } from '@mui/material';
import './chatfield.css';

function ChatField({ chat }) {
  return (
    <Box
      sx={{
        width: '80%',
        padding: '16px',
        backgroundColor: 'background.paper',
        borderRadius: '8px',
        margin: '0 auto',
        overflowY: 'auto', // Enable vertical scrolling
        maxHeight: 'calc(100vh - 250px)', // Subtract 50px from the maximum height
        marginTop: '100px',
      }}
    >
      {chat.map((message, index) => {
        // Check if the message is an array (formatted response)
        if (Array.isArray(message)) {
          return (
            <Paper
              key={index}
              elevation={3}
              sx={{
                padding: '12px',
                marginBottom: '16px',
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                color: 'text.primary',
                whiteSpace: 'pre-line', // Preserve line breaks
              }}
            >
              {message.map((line, lineIndex) => (
                <Typography key={lineIndex} variant="body1" sx={{ color: 'text.primary' }}>
                  {line}
                </Typography>
              ))}
            </Paper>
          );
        }
        // Otherwise, treat it as a regular message
        return (
          <Paper
            key={index}
            elevation={3}
            sx={{
              padding: '12px',
              marginBottom: '16px',
              backgroundColor: 'rgba(0, 0, 0, 0.8)',
              color: 'text.primary',
            }}
          >
            <Typography variant="body1" sx={{ color: 'text.primary' }}>
              {message}
            </Typography>
          </Paper>
        );
      })}
      {chat.includes("Quest: The Mysterious Mirror accepted.") && (
        <Paper
          elevation={3}
          sx={{
            padding: '12px',
            marginBottom: '16px',
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            color: 'text.primary',
          }}
        >
          <Typography variant="body1" sx={{ color: 'text.primary' }}>
            Quest: The Mysterious Mirror accepted.
          </Typography>
        </Paper>
      )}
    </Box>
  );
}

export default ChatField;

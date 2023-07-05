import React from 'react';
import { Box, Paper, Typography } from '@mui/material';

function ChatField({ chat }) {
  return (
    <Box
      sx={{
        width: '80%',
        height: '400px',
        padding: '16px',
        backgroundColor: 'background.paper',
        borderRadius: '8px',
        margin: '0 auto', 
      }}
    >
      {chat.map((message, index) => (
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
      ))}
    </Box>
  );
}

export default ChatField;
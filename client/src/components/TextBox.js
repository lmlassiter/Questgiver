import React, { useState } from 'react';
import { TextField } from '@mui/material';

function TextBox({ prompt, onPromptChange, fetchResponse }) {
  const [text, setText] = useState('');

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      prompt = text;
      fetchResponse(prompt); // Call the fetchResponse function from props
      console.log(prompt);
      setText('');
      onPromptChange(event); 
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '5%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '80%',
      }}
    >
      <p style={{ color: 'grey' }}>{prompt}</p>
      <TextField
        sx={{
          width: '100%',
          '& .MuiOutlinedInput-root': {
            background: 'black',
            '& fieldset': {
              borderColor: 'grey', // Change the outline color
            },
            '&:hover fieldset': {
              borderColor: 'grey',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'grey',
            },
            '& input': {
              color: 'grey',
            },
          },
          '& .MuiFormLabel-root': {
            color: 'grey',
          },
        }}
        label="Enter Text"
        variant="outlined"
        value={text}
        onChange={handleTextChange}
        onKeyPress={handleKeyPress}
     InputProps={{
          sx: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: 'grey', // Change the outline color
            },
          },
        }}
      />
    </div>
  );
}


export default TextBox;


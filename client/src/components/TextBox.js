import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';

function TextBox({ prompt, onPromptChange, fetchResponse, onQuestAccept, questGiven }) {
  const [text, setText] = useState('');
  const [showAcceptMessage, setShowAcceptMessage] = useState(false);
  const [questDecision, setQuestDecision] = useState(null);
  const [showDecisionMessage, setShowDecisionMessage] = useState(false);

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      prompt = text;
      fetchResponse(prompt);
      setText('');
      onPromptChange(event);
    }
  };

  const handleAcceptQuest = () => {
    onQuestAccept();
    setShowAcceptMessage(true);
    setQuestDecision('accepted');
    setTimeout(() => {
      setShowAcceptMessage(false);
      setShowDecisionMessage(false); // Hide decision message as well
    }, 5000);
  };

  const handleDeclineQuest = () => {
    setQuestDecision('declined');
    setShowDecisionMessage(true);
    setTimeout(() => {
      setShowDecisionMessage(false); // Hide decision message after 5 seconds
    }, 5000);
  };

  useEffect(() => {
    if (!questGiven) {
      setShowAcceptMessage(false);
      setQuestDecision(null);
      setShowDecisionMessage(false); // Hide decision message
    }
  }, [questGiven]);

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
              borderColor: 'grey',
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
              borderColor: 'grey',
            },
          },
        }}
      />
      {questGiven && !showAcceptMessage && questDecision === null && (
        <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" onClick={handleAcceptQuest} color="primary">
            Accept
          </Button>
          <Button variant="contained" onClick={handleDeclineQuest} color="secondary">
            Decline
          </Button>
        </div>
      )}
      {showAcceptMessage && questDecision === 'accepted' && (
        <p style={{ color: 'green', marginTop: '16px' }}>Quest Accepted!</p>
      )}
      {showDecisionMessage && questDecision === 'declined' && (
        <p style={{ color: 'red', marginTop: '16px' }}>Quest Declined.</p>
      )}
    </div>
  );
}

export default TextBox;

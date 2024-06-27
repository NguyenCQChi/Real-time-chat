import React,  { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { MessageType } from '@src/types/message.type';
import { getAuth } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { ChatAppState } from '@src/stores/chat.slice';
import { useTheme } from '@mui/material/styles';

interface Props {
  messageObj?: MessageType;
}

const MessageBox = ({ messageObj } : Props) => {
  const theme = useTheme();
  const currentUser = getAuth().currentUser;
  const chosenUser = useSelector((state: ChatAppState) => state.chosenUser)
  const left = messageObj.personSendId == chosenUser.userId
  return (
    <Box sx={{width: '100%', justifyContent: left ? 'start' : 'end', display: 'flex'}}>
      <Box sx={{display: 'flex', flexDirection: 'column', background: left ? `${theme.palette.primary.light}` : `${theme.palette.secondary.light}`, padding: '15px', borderRadius: '10px', maxWidth: '40%', gap: '5px'}}>
        <div> {messageObj.message} </div>
        <div style={{fontSize: '13px', display: 'flex', justifyContent: 'end'}}>{messageObj.timeStamp.time}</div>
      </Box>
    </Box>
  )
}

export default MessageBox;
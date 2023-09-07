import React,  { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { MessageType } from '@src/types/message.type';
import { getAuth } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { ChatAppState } from '@src/stores/chat.slice';

interface Props {
  messageObj?: MessageType;
}

const MessageBox = ({ messageObj } : Props) => {
  const currentUser = getAuth().currentUser;
  const chosenUser = useSelector((state: ChatAppState) => state.chosenUser)
  // const style = clsx({position: })
  const left = messageObj.personSendId == chosenUser.userId
  return (
    <Box sx={{position: 'absolute', float: left ? 'left' : 'true'}}>
      MessageBox
    </Box>
  )
}

export default MessageBox;
import { useEffect, useState, useContext } from 'react';
import { InputBase, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Send } from '@mui/icons-material';
import { MessageType, RoomType } from '@src/types';
import { MessageBox } from '@src/components'
import { SocketContext } from '@src/contexts/SocketContext';
import { useSelector, useDispatch } from 'react-redux';
import { ChatAppState, addMessage } from '../../../../stores/chat.slice';
import { database } from 'firebaseConfig';
import { collection, getDoc, doc, updateDoc, arrayUnion, getDocs } from "firebase/firestore";
import { getAuth } from 'firebase/auth';

const ChatContainer = ({ room } : { room?: RoomType }) => {
  const theme = useTheme();
  const [ message, setMessage ] = useState('')
  const [ messageList, setMessageList ] = useState<MessageType[]>(room.messages)
  const { socket } = useContext(SocketContext)
  const currentUser = getAuth().currentUser;
  const chosenUser = useSelector((state: ChatAppState) => state.chosenUser)
  const dispatch = useDispatch()

  useEffect(() => {
    setMessageList(room.messages)
  }, [room])

  //Update to Firebase correctly
  const updateMessage = async(msg) => {
    const ref = doc(database, 'users', currentUser.uid)
    const getCurrentFirebaseUser = await getDoc(ref)
    const roomArray = getCurrentFirebaseUser.data().rooms
    roomArray.forEach((room) => {
        if(room.id.includes(currentUser.uid) && room.id.includes(chosenUser.userId)) {
          room.messages = [...room.messages, msg]
        }
    })

    await updateDoc(ref, { rooms: roomArray})
  }

  const handleSend = (e) => {
    if(message.length < 1) {
      return
    }
    e.preventDefault()
    const timestamp = Date.now()
    const format = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(timestamp)
    const date = format.split(', ')

    const messageSend = {
      personSendId: currentUser.uid,
      personReceiveId: chosenUser.userId,
      message: message,
      timeStamp: {
        date: date[0],
        time: date[1]
      }
    }
    setMessage('')

    dispatch(addMessage(messageSend as MessageType))
    updateMessage(messageSend)
    setMessageList([...messageList, messageSend])
    //Send to other through web socket
    socket.emit('message', messageSend)
  }

  useEffect(() => {
    socket.on('new-message', (message) => {
      dispatch(addMessage(message as MessageType))
      updateMessage(message)
      setMessageList([...messageList, message])
    })
  }, [socket])

  return (
    <div style={{width: '100%', height: '100%'}}>
      <div style={{height: '88%', display: 'flex', flexDirection: 'column', overflow: 'auto', gap: '10px', width: 'calc(100% + 10px)', paddingRight: '8px'}}>
        {messageList.map((msg, index) => <MessageBox messageObj={msg} key={index} />)}
      </div>
      <div style={{height: '3%'}} />
      <div 
        style={{
          height: '9%', 
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          alignItems: 'center'
        }}>
        <InputBase 
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          sx={{
            fontSize: '16px',
            border: `0.5px solid ${theme.palette.myBackground.dark}`, 
            background: `${theme.palette.myBackground.dark}`,
            height: '70%', 
            borderRadius: '15px',
            flex: 1,
            px: '15px',
            ':hover': {
              background: `${theme.palette.myBackground.contrastText}`,
              transitionDuration: '0.25s',
              cursor: 'pointer'
            }
          }}
        />
        <Box 
          onClick={e => handleSend(e)}
          sx={{
            background: `${theme.palette.myBackground.light}`, 
            height: '50%', 
            width: 'fit-content', 
            padding: '10px', 
            borderRadius: '50%',
            transform: 'rotate(-25deg)',
            ':hover': {
              background: `${theme.palette.myBackground.dark}`,
              transform: 'rotate(0)',
              transitionDuration: '200ms',
              cursor: 'pointer',
              boxShadow: '0px 0px 0px 1px rgba(224, 218, 195, 0.3)'
            }
          }}
        >
          <Send sx={{height: '100%', width: 'auto', color: `${theme.palette.info.main}`}} />
        </Box>
      </div>
    </div>
  )
}

export default ChatContainer
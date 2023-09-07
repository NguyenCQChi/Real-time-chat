import { useEffect, useState } from 'react';
import { InputBase, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Send } from '@mui/icons-material';
import { RoomType } from '@src/types';

const ChatContainer = ({ room } : { room?: RoomType }) => {
  const theme = useTheme();
  const [ message, setMessage ] = useState('')

  const handleChange = (value: string) => {
    setMessage(value);
  }

  const handleSend = () => {

  }

  useEffect(() => {
    console.log(room.id)
  }, [room])

  return (
    <div style={{width: '100%', height: '100%'}}>
      <div style={{height: '88%', background: 'cyan', position: 'relative', overflow: 'auto'}}>
        Messages
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
          onClick={handleSend}
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
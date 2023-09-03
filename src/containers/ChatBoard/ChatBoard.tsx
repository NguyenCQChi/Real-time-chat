import { useState, useEffect, useContext } from 'react';
import { NavigationBar, ChatContainer } from "./components";
import { Box, List, InputBase, Avatar, Divider, ListItemAvatar, ListItemButton, ListItemText } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Search } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { addUsers, ChatAppState } from '../../stores/chat.slice';
import { database } from 'firebaseConfig';
import { collection, getDocs } from "firebase/firestore";
import { UserType } from '../../types';
import { getAuth } from 'firebase/auth';
import { SocketContext } from '@src/contexts/SocketContext';

const ChatBoard = () => {
  const theme = useTheme(); 
  const [ search, setSearch ] = useState('')
  const [ selectedIndex, setSelectedIndex ] = useState<number>(0)
  const dispatch = useDispatch()
  const users = useSelector((state: ChatAppState) => state.users)
  const currentUser = getAuth().currentUser;
  const { socket } = useContext(SocketContext)

  const handleChange = (value: any) => {
    setSearch(value)
  }

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    setSelectedIndex(index)
  }

  // Check if user has been added and check if that user is added
  const checkUser = (checkedUser: UserType) => {
    const find = users.findIndex(user => user.userId == checkedUser.userId)
    if(checkedUser.userId == currentUser.uid || find >= 0) {
      return false
    }
    return true
  }

  const getUsers = async() => {
    const queryUsers = await getDocs(collection(database, "users"))
    queryUsers.forEach(doc => {
      if(checkUser(doc.data() as UserType)) {
        dispatch(addUsers(doc.data() as UserType))
      }
    })
  }

  const firstLetter = (name: string) => {
    const letter = name.slice(0, 1)
    return letter.toUpperCase()
  }

  useEffect(() => {
    getUsers()
  }, [])

  useEffect(() => {
    socket.on('new-user', (user) => {
      console.log('new user join: ' + user.name)
      dispatch(addUsers(user as UserType))
    })
  }, [socket])

  return (
    <Box sx={{display: 'flex', flexFlow: 'column', height: '100vh', width: '100vw', background: `${theme.palette.myBackground.light}`}}>
      <NavigationBar sx={{height: '8%', background: `${theme.palette.myBackground.main}`, boxShadow: `0px 2px 0px 0px ${theme.palette.myBackground.dark}`, px: '35px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}/>
      <Box sx={{height: '92%', padding: '35px'}}>
        <Box sx={{width: '100%', display: 'flex', flexDirection: 'row', flex: 1, background: 'red'}}>
          <Box sx={{width: '30%', gap: '35px', display: 'flex', flexDirection: 'column'}}>
            <Box sx={{
              border: `0.5px solid ${theme.palette.myBackground.dark}`, 
              height: '7.5%', borderRadius: '15px',
              display: 'flex',
              flexDirection: 'row',
              px: '20px',
              alignItems: 'center',
              gap: '10px',
              ':hover': {
                background: `${theme.palette.myBackground.dark}`,
                transitionDuration: '0.25s',
                cursor: 'pointer'
              },
            }}>
              <Search />
              <InputBase 
                placeholder="Search..."
                onChange={(e) => handleChange(e.target.value)}
                sx={{
                  fontSize: '16px',
                  width: '100%'
                }}
              />
            </Box>
            <Box sx={{overflow: 'auto', background: `${theme.palette.myBackground.dark}`, height: '92.5%'}}>
              <List sx={{
                background: `${theme.palette.myBackground.main}`, 
                borderRadius: '15px',
                '&.MuiList-root.MuiList-padding': {
                  pt: '0px',
                  pb: '0px'
                }
              }}>
                {users.map((user, key) => (
                  <div key={key}>
                    <ListItemButton 
                      selected={selectedIndex === key}
                      onClick={(e) => handleListItemClick(e, key)}
                      sx={{
                        px: '20px',
                        background: `${theme.palette.myBackground.dark}`,
                        ':hover': {
                          background: `${theme.palette.myBackground.main}`,
                          transitionDuration: '0.25s',
                          cursor: 'pointer'
                        }
                    }}>
                      <ListItemAvatar>
                        <Avatar sx={{background: 'purple'}}>{firstLetter(user.name)}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={user.name ? user.name : "Chi"} secondary="Jan 19, 2023" />
                    </ListItemButton>
                    <Divider />
                  </div>
                  ))}
              </List>
            </Box>
          </Box>
          <Box sx={{background: `${theme.palette.myBackground.main}`, width: '70%', borderRadius: '15px', padding: '20px 30px'}}>
            <ChatContainer />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ChatBoard
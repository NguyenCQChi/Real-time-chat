import { useState, useEffect, useContext } from 'react';
import { NavigationBar, ChatContainer } from "./components";
import { Box, List, InputBase, Avatar, Divider, ListItemAvatar, ListItemButton, ListItemText, Skeleton, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Search } from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { addUsers, setChosenUser, addRoom, ChatAppState } from '../../stores/chat.slice';
import { database } from 'firebaseConfig';
import { collection, getDoc, doc, updateDoc, arrayUnion, getDocs } from "firebase/firestore";
import { UserType, RoomType } from '../../types';
import { getAuth } from 'firebase/auth';
import { SocketContext } from '@src/contexts/SocketContext';

//TODO: when the second user joins there is a runtime error which it cannot read properties of undefined userId line 146

const ChatBoard = () => {
  const theme = useTheme(); 
  const users = useSelector((state: ChatAppState) => state.users)
  const [ search, setSearch ] = useState<UserType[]>([])
  const [ selectedIndex, setSelectedIndex ] = useState<number>(0)
  const [ chosenRoom, setChosenRoom ] = useState<RoomType>(null)
  const dispatch = useDispatch()
  const rooms = useSelector((state: ChatAppState) => state.rooms)
  const chosenUser = useSelector((state: ChatAppState) => state.chosenUser)
  const currentUser = getAuth().currentUser;
  const { socket } = useContext(SocketContext)
  // const fromLogin = sessionStorage.getItem('fromLogin')
  const fromLogin = typeof window !== 'undefined' ? sessionStorage.getItem('fromLogin') : null;
  const handleChange = (value: any) => {
    if(value.length === 0 || value === undefined || value === null) {
      setSearch(users)
    } else {
      setSearch(users.filter(user => user.name.toLowerCase().includes(value.toLowerCase())))
    }
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

  // TO-DO: Check condition
  const checkRoom = (room: RoomType) => {
    let existed = false;
    rooms.forEach(eachRoom => {
      const isExist = eachRoom.id.includes(room.id[0]) && eachRoom.id.includes(room.id[1])
      if(isExist) {
        existed = true;
      }
    })
    return existed
  }

  const getUsers = async() => {
    const queryUsers = await getDocs(collection(database, "users"))
    queryUsers.forEach(doc => {
      if(checkUser(doc.data() as UserType)) {
        dispatch(addUsers(doc.data() as UserType))
      }
    })
  }

  const getRooms = async() => {
    const getCurrentFirebaseUser = await getDoc(doc(database, "users", currentUser.uid))
    const roomArray = getCurrentFirebaseUser.data().rooms
    roomArray.forEach(room => {
      dispatch(addRoom(room as RoomType))
    })
  }

  const writeRooms = async() => {
    if(fromLogin == 'false') {
      const ref = doc(database, 'users', currentUser.uid)
      await updateDoc(ref, { rooms : rooms })
    }
  }

  const updateRooms = async(room) => {
    const ref = doc(database, 'users', currentUser.uid)
    await updateDoc(ref, { rooms: arrayUnion(room) })
  }

  const firstLetter = (name: string) => {
    const letter = name.slice(0, 1)
    return letter.toUpperCase()
  }

  useEffect(() => {
    getUsers()
    if(fromLogin == 'true') {
      getRooms()
    }
  }, [])

  useEffect(() => {
    setSearch(users)
  }, [users])

  //Default as the first user when the user just got into the page
  useEffect(() => {
    if(users.length > 0) {
      dispatch(setChosenUser(users[0]))
      if(fromLogin == 'false') {
        users.forEach(user => {
          let room = {
            id: [currentUser.uid, user.userId],
            messages: []
          }

          if(!checkRoom(room)) {
            dispatch(addRoom(room))
          }
        })
      } else {
        // Update new user joining when this user not online
        rooms.forEach(room => {
          users.forEach(user => {
            if(!room.id.includes(user.userId) && !checkRoom(room)) {
              const newRoom = {
                id: [currentUser.uid, user.userId],
                messages: []
              }
              // dispatch(addRoom(newRoom))
              updateRooms(newRoom)
            }
          }) 
        })
      }
    }
  }, [users])

  useEffect(() => {
    writeRooms()
  }, [rooms])

  //Set the clicked user to open the chat room with the user
  useEffect(() => {
    dispatch(setChosenUser(users[selectedIndex]))
  }, [selectedIndex])

  useEffect(() => {
    rooms.forEach(room => {
      if(room.id.includes(chosenUser.userId)) {
        setChosenRoom(room)
      }
    })
  }, [chosenUser, rooms])

  useEffect(() => {
    socket.on('new-user', (user) => {
      dispatch(addUsers(user as UserType))
      let room = {
        id: [currentUser.uid, user.userId],
        messages: []
      }
      if(!checkRoom(room)) {
        dispatch(addRoom(room))
        updateRooms(room)
      }
    })
  }, [socket])

  return (
    <Box sx={{display: 'flex', flexDirection: 'column', height: '100vh', width: '100vw', background: `${theme.palette.myBackground.light}`, gap: '35px'}}>
      <NavigationBar sx={{minHeight: '80px', background: `${theme.palette.myBackground.main}`, boxShadow: `0px 2px 0px 0px ${theme.palette.myBackground.dark}`, px: '35px', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}/>
      <Box sx={{flex: 1, minHeight: '0px', marginBottom: '35px'}}>
        <Box sx={{display: 'flex', flexDirection: 'row', height: '100%', gap: '35px'}}>

          <Box sx={{width: '30%', marginLeft: '35px', display: 'flex', flexDirection: 'column', gap: '35px'}}>
            <Box sx={{
              border: `0.5px solid ${theme.palette.myBackground.dark}`, 
              background: `${theme.palette.myBackground.dark}`,
              height: '7.5%', 
              borderRadius: '15px',
              display: 'flex',
              flexDirection: 'row',
              px: '20px',
              alignItems: 'center',
              gap: '10px',
              ':hover': {
                background: `${theme.palette.myBackground.contrastText}`,
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
            <Box sx={{background: `${theme.palette.myBackground.dark}`, overflow: 'auto', flex: '1', borderRadius: '15px'}}>
              <List sx={{
                background: `${theme.palette.myBackground.main}`,
                '&.MuiList-root.MuiList-padding': {
                  pt: '0px',
                  pb: '0px'
                }
              }}>
                {search.map((user, key) => (
                  <div key={key}>
                    <ListItemButton 
                      selected={selectedIndex === key}
                      onClick={(e) => handleListItemClick(e, key)}
                      sx={{
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

          <Box sx={{display: 'flex', flexDirection: 'column', flex: 'auto', marginRight: '35px', background: `${theme.palette.myBackground.main}`, borderRadius: '15px'}}>
            <Box sx={{display: 'flex', flexDirection: 'row', gap: '10px', height: '7.5%', marginBottom: '10px', background: 'white', borderRadius: '15px 15px 0 0', alignItems: 'center', paddingLeft: '15px', boxShadow: `0 2px 0 0 ${theme.palette.myBackground.dark}`}}>
              {chosenUser != null ? (<Avatar sx={{background: 'purple'}}> {firstLetter(chosenUser.name)} </Avatar>) :  <Skeleton variant='circular' sx={{width: '40px', height: '40px'}} />}
              {chosenUser != null ? (<p style={{fontSize: '18px'}}> {chosenUser.name} </p>) : <Skeleton variant='rectangular' sx={{width: '180px', height: '20px'}} />}
            </Box>
            <Box sx={{flex: 'auto', borderRadius: '0 0 15px 15px', padding: '15px 20px', overflow: 'auto'}}>
              {chosenRoom != null ? <ChatContainer room={chosenRoom}/> : <Skeleton variant='rectangular' sx={{height: '100%'}} />}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default ChatBoard
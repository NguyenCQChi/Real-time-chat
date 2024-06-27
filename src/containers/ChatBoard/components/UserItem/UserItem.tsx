import { ListItemButton, ListItemAvatar, Avatar, ListItemText, Divider } from '@mui/material';
import { useTheme } from '@mui/material/styles';

interface Props {
  avatarSrc?: string,
  name?: string,
  recentMes?: string,
  choosen?: boolean
}

const UserItem = ({ avatarSrc, name, recentMes, choosen = false } : Props) => {
  const theme = useTheme(); 

  return (
    <div style={{background: `${choosen && theme.palette.myBackground.dark}`}}>
      <ListItemButton 
        sx={{
          px: '20px',
          ':hover': {
            background: `${theme.palette.myBackground.dark}`,
            transitionDuration: '0.25s',
            cursor: 'pointer'
          }
      }}>
        <ListItemAvatar>
          {avatarSrc ? (
            <Avatar src={avatarSrc} alt='avatar' />
          ) : (
            <Avatar sx={{background: 'purple'}}>{name}</Avatar>
          )}
        </ListItemAvatar>
        <ListItemText primary={name ? name : "Chi"} secondary={recentMes ? recentMes : "Jan 19, 2023"} />
      </ListItemButton>
      <Divider />
    </div>
  )
}

export default UserItem;
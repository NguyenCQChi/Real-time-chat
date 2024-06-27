import { useState } from 'react';
import { Paper, Divider, List, ListItem } from '@mui/material';
import { Button } from '@mui/base';
import { styled } from '@mui/material/styles';
import CreateAcc from '../CreateAcc';
import LoginPanel from '../LoginPanel';
import { motion } from 'framer-motion';

const Panel = () => {
  const [ loginState, setLoginState ] = useState<boolean>(true);

  const Item = styled(Paper)(({theme}) => ({
    padding: '20px',
    width: '65%'
  }))

  const CustomButton = styled(Button)(({theme}) => ({
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '12px',
    color: theme.palette.info.main,
    margin: '3px',
    cursor: 'pointer',
    ':hover': {
      color: theme.palette.info.dark,
    }
  }))

  const item = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }

  const handleClick = () => {
    setLoginState(!loginState)
  }

  return (
    <Item>
      <List sx={{width: '100%'}}>
        <ListItem sx={{...item, mb: '10px'}}>
          <div style={{fontSize: '22px'}}>Welcome to MyChat!</div>
        </ListItem>
        <Divider/>
        <ListItem sx={{...item, marginY: '10px'}}>
          { loginState ? <LoginPanel /> : <CreateAcc /> }
        </ListItem>
        <Divider />
        <ListItem sx={{...item, mt: '10px'}}>
          <div style={{fontSize: '12px', display: 'flex', flexDirection: 'row', marginBottom: '5px'}}> { loginState ? "Do not have account? " : "Already have an account?" } </div>
          <motion.div
            className="box"
            whileHover={{scale:1.05}}
            transition={{type: "spring", stiffness: 400, damping: 10}}
          >
            <CustomButton onClick={handleClick}> 
            { loginState ? "Create Account" : "Login" } 
            </CustomButton> 
          </motion.div>
        </ListItem>
      </List>
    </Item>
  )
}

export default Panel;
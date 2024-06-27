import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getAuth } from 'firebase/auth';
import { Button } from '@mui/base';
import { styled } from '@mui/material/styles';
import { motion } from 'framer-motion';

const NavigationBar = ({ sx } : { sx: any }) => {
  const theme = useTheme();
  const currentUser = getAuth().currentUser;

  const CustomButton = styled(Button)(({theme}) => ({
    border: 'none',
    backgroundColor: theme.palette.info.main,
    fontSize: '14px',
    color: theme.palette.myBackground.main,
    margin: '3px',
    cursor: 'pointer',
    padding: '14px 15px',
    borderRadius: '4px',
    ':hover': {
      color: theme.palette.myBackground.main,
      backgroundColor: theme.palette.info.dark,
    }
  }))

  const handleSignOut = () => {
    return;
  }

  return (
    <Box sx={sx}>
      <Box> {currentUser.displayName} </Box>
      <motion.div
        className="box"
        whileHover={{scale:1.05}}
        transition={{type: "spring", stiffness: 400, damping: 10}}
        >
          <CustomButton onClick={handleSignOut}> 
            Sign out
          </CustomButton> 
        </motion.div>
    </Box>
  )
}

export default NavigationBar
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { getAuth } from 'firebase/auth';

const NavigationBar = ({ sx } : { sx: any }) => {
  const theme = useTheme();
  const currentUser = getAuth().currentUser;

  return (
    <Box sx={sx}>
      {currentUser.displayName}
    </Box>
  )
}

export default NavigationBar
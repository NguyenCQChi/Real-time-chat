import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles'

const NavigationBar = ({ sx } : { sx: any }) => {
  const theme = useTheme();

  return (
    <Box sx={sx}>
      Nav
    </Box>
  )
}

export default NavigationBar
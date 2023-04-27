import { Panel } from './components';
import { Box, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Player } from '@lottiefiles/react-lottie-player';

const Login = () => {
  const theme = useTheme();

  const boxStyle = {
    // backgroundColor: `linear-gradient(to left, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`
    // backgroundColor: theme.palette.secondary.main
  }

  // background: `linear-gradient(to left, ${theme.palette.info.main}, ${theme.palette.secondary.main} 99%)`

  const gridStyle = {
    height: '100%',
    width: '100%',
    display: 'flex', 
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }

  return (
    <Box sx={{flexGrow: 1, height: '100vh', width: '100vw', background: `linear-gradient(to left, ${theme.palette.info.main}, ${theme.palette.secondary.main} 60%)`}}>
      <Grid container sx={gridStyle}>
        <Grid item xs={7} sx={gridStyle}>
          <Box sx={{...boxStyle, ...gridStyle}}>
            <div style={{
              width: '90%',
              height: '80%', 
              display: 'flex', 
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <Player
                autoplay
                loop
                src="https://assets8.lottiefiles.com/private_files/lf30_gqs2uqht.json"
              />
            </div>
          </Box>
        </Grid>
        <Grid item xs={5} sx={gridStyle}>
          {/* <Box sx={{background: `linear-gradient(to left, ${theme.palette.info.main}, ${theme.palette.secondary.main} 99%)`, ...gridStyle}}> */}
          <Box sx={gridStyle}>
            <Panel />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
};

export default Login;
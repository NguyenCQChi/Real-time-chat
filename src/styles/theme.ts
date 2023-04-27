import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: [
      'san-serif',
    ].join(',')
  },
  palette: {
    primary: {
      main: '#CDB4DB', //background
      light: '#FFC8DD', //my text primary
      dark: '#FFAFCC', //my text secondary
    },
    secondary: {
      main: '#fffcf2', //paper background
      light: '#BDE0FE', //other text primary
      dark: '#A2D2FF' //other text secondary
    },
    info: {
      main: '#8758a1',
      dark: '#3e84c7'
    }
  }
})

export default theme;
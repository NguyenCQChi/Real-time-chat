
import '@styles/style.css';
import { theme } from '@styles/index';
import { ThemeProvider } from '@emotion/react';

function MyApp({ Component, pageProps } : { Component: any, pageProps: any}) {
  return (
    <ThemeProvider theme={theme}>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp

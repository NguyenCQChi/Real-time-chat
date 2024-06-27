
import '@styles/style.css';
import { theme } from '@styles/index';
import { CacheProvider, ThemeProvider } from '@emotion/react';
import { SocketProvider } from '@contexts/SocketContext';
import { wrapper } from '@stores';
import { Provider } from 'react-redux';

function MyApp({ Component, ...rest } : { Component: any}) {
  const { store, props } = wrapper.useWrappedStore(rest);
  const { pageProps } = props;
  
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SocketProvider>
          <Component {...pageProps} />
        </SocketProvider>
      </ThemeProvider>
    </Provider>
  )
}

export default MyApp;

import { createContext, ReactNode, useState } from 'react';

interface Props {
  children: ReactNode
}

interface SocketContextTypes {
  socket: any
  setSocket: (socket: any) => void
}

const SocketContext = createContext<SocketContextTypes>({ 
  socket: null,
  setSocket: (socket: any) => {}
})

const { Provider } = SocketContext

const SocketProvider = (props: Props ) => {
  const { children } = props

  const [socket, changeSocket ] = useState(null);

  const setSocket = (soc: any) => {
    changeSocket(soc)
  }

  return (
    <Provider
      value={{
        socket: socket,
        setSocket: setSocket
      }}
    >
      {children}
    </Provider>
  )
}

export { SocketContext, SocketProvider }
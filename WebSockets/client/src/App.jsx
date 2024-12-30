import React , { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [socket, setSocket] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080')
 
    socket.onopen = () => {
      console.log('Connected to server')
      setSocket(socket)
    }
    socket.onmessage = (message) => {
      console.log('Message from server:', message.data)
      setMessage(message.data)
    }

    return () => {
      socket.close()
    }
  }, []);

  if(!socket) {
    return <div>
      Loading...
    </div>
  }

  return (
    <>
      <button onClick={() => socket.send('Hello from client')}>Send message to server</button>
      <br/><br/>
      {message}
    </>
  )
}
 
export default App

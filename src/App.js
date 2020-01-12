import React, {useState} from 'react';
import logo from './logo.svg';
import openSocket from 'socket.io-client';

import './App.css';

function App() {
  const [newMessage, setMessage] = useState('')

  // these are where all the messages will be.
  // It will first be an empty array but we will
  // fill it up everytime the server sends us something
  const [allMessages, setAllMessages] = useState([])

  // Establish a WS connection with the server
  const socket = openSocket('http://localhost:5000');  // <-- make sure the port is the same

  // this subscribes to the 'chat' channel
  // Whenever there are new messages, we put them in the array hook.
  socket.on('chat', (data) => {
    setAllMessages([...allMessages, data])
  })

  // this function runs onClicking the send button
  const sendMessage = () => {
    console.log('SENT')

    // it emits the new message written by the user to the 'chat' channel
    socket.emit('chat', newMessage);

    // clear the message from the text input after sending
    setMessage('')
  }
  return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div>
            <h2>Chat Messages</h2>
            <div>
              {/* This is where we will be displaying all the messages */}
              {
                allMessages.map(message => {
                  return <div>{message}</div>
                })
              }
            </div>
            <input onChange={(e) => setMessage(e.target.value)} placeholder="type your message .." />
            <button onClick={() => sendMessage()}>↪</button>
          </div>
        </header>
      </div>
  );
}

export default App;

import { useState } from 'react'
import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import { ChatWindow } from './components/chatwindow/Chatwindow'

function App() {

  return (
    <>
      <div className="app">
          
          <Sidebar></Sidebar>
          <ChatWindow></ChatWindow>
      </div>
    </>
  )
}

export default App;

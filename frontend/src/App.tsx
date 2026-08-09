import { useState } from 'react'
import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import { ChatWindow } from './components/chatwindow/Chatwindow'
import MyContext from "./MyContext";
import {v1 as uuidv1} from "uuid";

function App() {

  const [prompt, setPrompt]=useState("");
  const [reply, setReply]=useState(null);
  const [currrentThreadId,setCurrrentThreadId]=useState(uuidv1());

  const providerValues={
       prompt,setPrompt,
       reply,setReply,
       currrentThreadId,setCurrrentThreadId
  }

  return (
    <>
    
      <div className="app">
          <MyContext.Provider value={providerValues}>
                <Sidebar></Sidebar>
                <ChatWindow></ChatWindow>
          </MyContext.Provider>
      </div>
    
    </>
  )
}

export default App;

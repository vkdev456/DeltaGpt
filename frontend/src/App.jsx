import './App.css'
import Sidebar from "./components/Sidebar.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import { Mycontext } from './components/MyContext.jsx';
import {useState} from 'react';
import {v1 as uuidv1} from "uuid";

function App() {
  const [prompt,setPrompt]=useState("");
  const [reply,setReply]=useState(null);
  const [currThreadId,setCurrThreadId]=useState(uuidv1());


  const providerValues={
    prompt, setPrompt, 
    reply, setReply,
    currThreadId,setCurrThreadId,
  };
  
  return (
    <>
    <div className="app">
        <Mycontext.Provider value={providerValues}>
          <Sidebar></Sidebar>
          <ChatWindow></ChatWindow>
        </Mycontext.Provider>
    </div>
    </>
  )
}


export default App
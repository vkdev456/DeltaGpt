import {  useState } from 'react'
import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import { ChatWindow } from './components/chatwindow/Chatwindow'
import MyContext from "./MyContext";
import {v1 as uuidv1} from "uuid";
import type { ChatMessage } from './models/ChatMessage';
import type Thread from './models/Thread';

function App(){

  const [prompt, setPrompt]=useState("");
  const [reply, setReply]=useState(null);
  const [currrentThreadId,setCurrrentThreadId]=useState(uuidv1());
  const [prevChats,setPrevChats]=useState<ChatMessage[]>([]);
  const [newChat,setNewChat]=useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [allThread,setAllThreads]=useState<Thread[]>([]);
  
  
  const providerValues={
       prompt,setPrompt,
       reply,setReply,
       currrentThreadId,setCurrrentThreadId,
       prevChats,setPrevChats,
       newChat,setNewChat,
       isTyping,setIsTyping,
       allThread,setAllThreads
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

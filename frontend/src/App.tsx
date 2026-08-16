import {  useState } from 'react'
import './App.css'
import Sidebar from './components/sidebar/Sidebar'
import { ChatWindow } from './components/chatwindow/Chatwindow'
import MyContext from "./MyContext";
import {v1 as uuidv1} from "uuid";
import type { ChatMessage } from './models/ChatMessage';
import type Thread from './models/Thread';
import Signup from "./components/authentication/Signup";
import Login from './components/authentication/Login';
import Landing from './components/landingpage/Landing';
import {Route,BrowserRouter as Router,Routes} from 'react-router-dom';

function App(){

  const [prompt, setPrompt]=useState("");
  const [reply,setReply]=useState<String|null>(null);
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
              <Router>
                <Routes>
                  <Route path="/" element={<Landing></Landing>}></Route>
                  <Route path="/signup" element={<Signup></Signup>}/> 
                  <Route path="/login" element={<Login></Login>}/>
                  <Route path="/chat" element={<><Sidebar></Sidebar><ChatWindow></ChatWindow></>}/>
                </Routes>
              </Router>
          </MyContext.Provider>
      </div>
    
    </>
  )
}

export default App;

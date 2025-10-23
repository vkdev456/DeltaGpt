import "./ChatWindow.css"
import Chat from './Chat.jsx';
import myContext from "./MyContext.jsx"
import { useContext, useState, useEffect } from "react";
import {ScaleLoader} from 'react-spinners';


function ChatWindow(){

    const {prompt,setPrompt,reply,setReply,currThreadId,prevChats,setPrevChats,setNewChat}=useContext(myContext);
    const [loading,setLoading] = useState(false);
    const [isOpen,setIsOpen]=useState(false);//set default false;

    const getReply=async ()=>{
        setLoading(true);
        setNewChat(false);
        console.log("prompt",prompt,"threadId",currThreadId);
         const Options={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                message:prompt,
                threadId:currThreadId
            })
         };
         try{
             const response= await fetch("https://deltagpt-4is4.onrender.com/api/chat",Options);
             const res=await response.json();
             console.log(res);
             setReply(res.reply);
         }catch(err){
            console.log(err);
         }
         setLoading(false);
    }

   //Append new chat to prevChats
    useEffect(() => {
          if(prompt && reply) {
                setPrevChats(prevChats => (
                    [...prevChats,{ 
                        role: "user", 
                        content: prompt 
                    },{ 
                        role: "assistant", 
                        content: reply 
                    }]
                ))
            }
       setPrompt("");//above will save the chat in previous chat and then set prompt empty

    }, [reply]);

   const handleProfileClick=async()=>{
            setIsOpen(!isOpen);x
   }

    return(
        
        <div className="chatWindow">
            <div className="navBar">
                <span>DeltaGpt <i className="fa-solid fa-angle-down"></i></span>
                <div className="userIconDiv" onClick={handleProfileClick}>
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span> 
                </div>
            </div>
            {
                isOpen &&
                <div className="dropDown">
                    <div className="dropDownItem"><i class="fa-solid fa-gear"></i>Settings</div>
                    <div className="dropDownItem"><i class="fa-solid fa-arrow-right-from-bracket"></i>Logout</div>      
                </div>
            }

            <Chat></Chat>

            <ScaleLoader color="#fff" loading={loading}>
            </ScaleLoader>
            

            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask Anything"
                        value={prompt}
                        onChange  = {(e) => setPrompt(e.target.value)}
                        onKeyDown = {(e) => e.key === 'Enter' ? getReply() : ''}
                    >
                    </input>
                    <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                
                <p className="info">DeltaGpt can make mistakes</p>
            </div>
        </div>
        
    )
}

export default ChatWindow;

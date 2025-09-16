import "./ChatWindow.css"
import Chat from './Chat.jsx';
import myContext from "./MyContext.jsx"
import { useContext, useState, useEffect } from "react";
import {ScaleLoader} from 'react-spinners';


function ChatWindow(){

    const {prompt,setPrompt,reply,setReply,currThreadId,prevChats,setPrevChats}=useContext(myContext);
    const [loading,setLoading] = useState(false);
    

    const getReply=async ()=>{
        setLoading(true);
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
             const response= await fetch("http://localhost:8080/api/chat",Options);
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



    return(
        
        <div className="chatWindow">
            <div className="navBar">
                <span>VksGpt <i className="fa-solid fa-angle-down"></i></span>
                <div className="userIconDiv">
                    <span className="userIcon"><i className="fa-solid fa-user"></i></span> 
                </div>
            </div>
            

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
                
                <p className="info">VksGpt can make mistakes</p>
            </div>
        </div>
        
    )
}

export default ChatWindow;

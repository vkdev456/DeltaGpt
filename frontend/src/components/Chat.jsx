import "./Chat.css";
import  Mycontext from "./MyContext";
import React, {  useContext,useState,useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";


function Chat(){
    const {newChat,prevChats,reply}=useContext(Mycontext);
    const [latestReply,setLastestReply]=useState(null);
    
    useEffect(()=>{

        if(reply==null){
            setLastestReply(null);
            return;//this will stop the effect while opening new chat
        }

        if(!prevChats?.length) return;
        
        const content=reply.split(" ")//individual words

        let idx=0;
        const interval=setInterval(()=>{
             setLastestReply(content.slice(0,idx+1).join(" "));
             idx++;

             if(idx>=content.length)clearInterval(interval);

        },40);
        return ()=>clearInterval(interval);

    },[prevChats,reply])
    return(
        <>
            {newChat && <h1>Start a New Chat!</h1>}
            <div className="chats">
                {
                    prevChats?.slice(0,-1).map((chat, idx) => 
                        <div className={chat.role === "user" ? "userDiv" : "gptDiv"} key={idx}>
                            {   
                                chat.role === "user" ?
                                <p className="userMessage">{chat.content}</p>:
                                <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
                            }
                        </div>
                    )

                }
                {
                    prevChats.length>0 && latestReply!==null &&
                    <div className="gptDiv" key={"typing"}>
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{latestReply}</ReactMarkdown>
                    </div>
                }
                 
                {
                    prevChats.length > 0 && latestReply === null &&
                    <div className="gptDiv" key={"non-typing"}>
                           <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{prevChats[prevChats.length-1].content}</ReactMarkdown>
                    </div>
                } 
                  
            </div>
        </>
    )   
    
}

export default Chat;
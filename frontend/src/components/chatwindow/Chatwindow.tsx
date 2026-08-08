import {useState} from "react";

import "./Chatwindow.css";
import Chat from "../chat/Chat";


export function ChatWindow(){

  const [prompt,setPrompt]=useState("");

  const handlePrompt =async()=>{
      try{
         
      }
  }

  return (
    <>
      <div className="chatwindow" >

        <div className="navBar">
          <span>DeltaGpt<i className="fa-solid fa-angle-down"></i></span>
          <span className="userIcon"><i className="fa-solid fa-user"></i></span>
        </div>

        <Chat></Chat>
  
        <div className="chatMain">
            Answer
            <div className="inputText">
              <input 
               placeholder="enter question" value={prompt}
               onChange={(e)=>setPrompt(e.target.value)}

              />
              <div id="submit" onClick={}><i className="fa-solid fa-paper-plane"></i></div>
            </div>
            <p className="info">DeltaGpt can make mistakes</p>
            
        </div>

      </div>
    </>
  )
}

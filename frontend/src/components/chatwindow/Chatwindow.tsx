import react from "react";
import "./Chatwindow.css";
import Chat from "../chat/Chat";
// import 

export function ChatWindow() {
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
               placeholder="enter question"
              />
              <div id="submit" ><i className="fa-solid fa-paper-plane"></i></div>
            </div>
            <p className="info">DeltaGpt can make mistakes</p>
            
        </div>

      </div>
    </>
  )
}

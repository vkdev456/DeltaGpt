import "./ChatWindow.css"
import Chat from './Chart.jsx';
import {myContext} from "./MyContext.jsx"
import useState from 'react';


function ChatWindow(){

    const [prompt,setPrompt,reply,setReply,currThreadId]=useState(myContext);
    
    const getReply=async ()=>{
         const options={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:{
                message:prompt,
                threadId:currThreadId
            }
         };
         try{
             const response= await fetch("https:/localhost:8080/api/chat");
             console.log(response);

         }catch(err){
            console.log(err);
         }
    }
    return(
        
        <div className="chatWindow">
            <div className="navBar">
                <span>VksGpt <i className="fa-solid fa-angle-down"></i></span>
                <div className="userIconDiv">
                    <span className="userIcon"><i class="fa-solid fa-user"></i></span> 
                </div>
            </div>
            <Chat></Chat>

            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask Anything"
                        value={prompt}
                        onChange={(e)=>setPrompt(e.target.value)}                    
                    >
                    </input>
                    <div id="submit"><i className="fa-solid fa-paper-plane"></i></div>
                </div>
                
                <p className="info">VksGpt can make mistakes</p>
            </div>
        </div>
        
    )
}

export default ChatWindow;

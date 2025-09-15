import "./ChatWindow.css"
import Chat from './Chart.jsx';

function ChatWindow(){
    return(
        
        <div className="chatWindow">
            <div className="navBar">
                <span>VksGpt <i class="fa-solid fa-angle-down"></i></span>
                <div className="userIconDiv">
                    <span className="userIcon"><i class="fa-solid fa-user"></i></span> 
                </div>
            </div>
            <Chat></Chat>

            <div className="chatInput">
                <div className="inputBox">
                    <input placeholder="Ask Anything">
                    </input>
                    <div id="submit"><i class="fa-solid fa-paper-plane"></i></div>
                </div>
                <p>VksGpt can make mistakes</p>
            </div>
        </div>
        
    )
}

export default ChatWindow;

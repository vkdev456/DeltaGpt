import { useContext, useEffect, useState } from "react";

import "./Chatwindow.css";
import Chat from "../chat/Chat";
import sendPrompt from "../../services/ChatService";
import type { PromptRequest } from "../../models/PromptRequest";
import MyContext from "../../MyContext";
import { ScaleLoader } from "react-spinners";
import type { ChatMessage } from "../../models/ChatMessage";


export function ChatWindow() {

  const { prompt, setPrompt, reply, setReply, setIsTyping,prevChats, setPrevChats, currrentThreadId } = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  const getReply = async () => {
    setLoading(true);
    try {

      const request: PromptRequest = {
        threadId: currrentThreadId,
        message: prompt
      }

      const response = await sendPrompt(request);
      console.log(response.reply);

      setReply(response.reply);
      setIsTyping(true);
      
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  }
  useEffect(() => {
    if (reply) {
      setPrevChats((prevChats:ChatMessage[])=> [
        ...prevChats,
        {
          role: "user",
          content: prompt
        },
        {
          role: "assistant",
          content: reply
        }
      ]);
    }

    setPrompt("");
  }, [reply]);


  return (
    <>
      <div className="chatwindow" >

        <div className="navBar">
          <span>DeltaGpt<i className="fa-solid fa-angle-down"></i></span>
          <span className="userIcon"><i className="fa-solid fa-user"></i></span>
        </div>


        <Chat></Chat>
        <ScaleLoader color="#fffff" loading={loading}></ScaleLoader>
        <div className="chatMain">
          <div className="inputText">
            <input placeholder="Ask anything"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key == 'Enter' ? getReply() : ''}
            />
            <div id="submit" onClick={getReply}><i className="fa-solid fa-paper-plane"></i></div>
          </div>
          <p className="info">DeltaGpt can make mistakes</p>

        </div>

      </div>
    </>
  )
}

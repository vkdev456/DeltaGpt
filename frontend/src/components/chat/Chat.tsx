import "./Chat.css"
import MyContext from "../../MyContext"
import { useContext, useEffect, useState } from "react"
import type { ChatMessage } from "../../models/ChatMessage";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";

export default function () {

    const { newChat, prevChats, reply } = useContext(MyContext);
    const [latestReply, setLatestReply] = useState<string | null>(null);
    const { isTyping, setIsTyping } = useContext(MyContext);
    

    useEffect(() => {

        if (reply === null) {
            setLatestReply(null);
            return;
        }

        if (!isTyping) {
            return;
        }

        const content = reply.split(" ");
        let idx = 0;
        const interval = setInterval(() => {

            setLatestReply(
                content.slice(0, idx + 1).join(" ")
            );

            idx++;

            if (idx >= content.length) {
                clearInterval(interval);
                setIsTyping(false);
            }

        }, 40);

        return () => clearInterval(interval);

    }, [reply, isTyping]);


    return (
               <>
            {newChat && (<h1 style={{color:"white"}}>Start a New Chat!</h1>)}

            <div className="chats">
                {
                    prevChats
                        ?.slice(0, -1)
                        .map(
                            (chat: ChatMessage, idx: number)=>(
                                <div className={chat.role === "user"? "userDiv" : "gptDiv"}key={idx}>
                                    {
                                        chat.role === "user"?<p className="userMessage">{chat.content}</p>:
                                            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                                                {chat.content}
                                            </ReactMarkdown>
                                    }
                                </div>
                            )
                        )
                }

                {
                    prevChats.length > 0 &&
                    latestReply !== null &&

                    <div className="gptDiv">
                        <ReactMarkdown
                            rehypePlugins={[rehypeHighlight]}
                        >
                            {latestReply}
                        </ReactMarkdown>
                    </div>
                }

                {
                    prevChats.length > 0 &&
                    latestReply === null &&

                    <div className="gptDiv">
                        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
                            {
                                prevChats[prevChats.length - 1].content
                            }
                        </ReactMarkdown>
                    </div>
                }
            </div>
        </>
    )
}
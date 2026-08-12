import "./Sidebar.css";
import logo from "../../assets/blacklogo.png";
import MyContext from "../../MyContext";
import { useContext, useEffect } from "react";
import threads from "../../services/ThreadService";
import type Thread from "../../models/Thread";
import { v1 as uuidv1 } from "uuid";
import axios from "axios";
import type { ChatMessage } from "../../models/ChatMessage";

function Sidebar() {

    const {
        allThread,
        setAllThreads,
        setNewChat,
        setPrompt,
        setReply,
        currrentThreadId,
        setPrevChats,
        setCurrrentThreadId } = useContext(MyContext);

    // get all threads
    const getAllThreads = async () => {

        try {
            const res = await threads();

            const filteredData = res.map((thread: Thread) => ({
                threadId: thread.threadId,
                title: thread.title
            }));

            console.log("Threads:", filteredData);
            setAllThreads(filteredData);
        } catch (err) {
            console.log("Failed to get threads:", err);
        }
    };

    //init - load all threads
    useEffect(() => {
        getAllThreads();
    }, [currrentThreadId]);


    // new chat
    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrrentThreadId(uuidv1());
        setPrevChats([]);
    };

    // change Thread
    const changeThread = async (newThreadId: string) => {

        console.log("Changing thread:", newThreadId);

        setCurrrentThreadId(newThreadId);

        try {

            const response = await axios.get(
                `http://localhost:8080/thread/${newThreadId}`
            );

            console.log("Selected thread:", response.data);

            //format 
            const messages = response.data.messages || [];

            const formattedMessages: ChatMessage[] =
                messages.map((message: any) => ({
                    role:
                        message.role.toLowerCase() === "user"
                            ? "user"
                            : "assistant",
                    content: message.content
                }));

            setPrevChats(formattedMessages);

            setNewChat(false);
            setReply(null);
        } catch (err) {
            console.log("Failed to load thread:", err);
        }
    };

    // delete thread
    const deleteThread = async (threadId: string) => {

        try {

            const response = await axios.delete(
                `http://localhost:8080/thread/${threadId}`
            );

            console.log(response.data);


            // remove deleted threadfrom UI
            setAllThreads((prev: Thread[]) =>
                prev.filter(
                    (thread: Thread) =>
                        thread.threadId !== threadId
                )
            );

            // If currently selected thread was deleted
            // create a new chat
            if (threadId === currrentThreadId) {
                createNewChat();
            }
        } catch (err) {
            console.log("Failed to delete thread:", err);
        }
    };

    return (

        <div className="sidebar">

            <div className="panel" onClick={createNewChat}>
                <img src={logo} alt="gpt logo" className="logo" />
                <span>
                    <i className="fa-solid fa-pen-to-square"></i>
                </span>
            </div>


            <ul className="history">
                {allThread.map((thread: Thread) => (

                    <li key={thread.threadId}
                        onClick={() =>
                            changeThread(thread.threadId)
                        }
                        className={
                            thread.threadId === currrentThreadId
                                ? "hightlighted"
                                : ""
                        }
                    >
                        {thread.title}
                        <i
                            className="fa-solid fa-trash"
                            onClick={(e) => {
                                e.stopPropagation();
                                deleteThread(thread.threadId);
                            }}
                        />
                    </li>
                ))}
            </ul>

            <div className="sign">
                <p>By Vk✨</p>
            </div>
        </div>
    );
}
export default Sidebar;
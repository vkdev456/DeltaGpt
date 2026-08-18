import "./Sidebar.css";
import logo from "../../assets/blacklogo.png";
import MyContext from "../../MyContext";
import { useContext, useEffect } from "react";
import threads from "../../services/ThreadService";
import type Thread from "../../models/Thread";
import { v1 as uuidv1 } from "uuid";
import axios from "axios";
import type { ChatMessage } from "../../models/ChatMessage";
import api from "../../services/AxiosInstance";

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


    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrrentThreadId(uuidv1());
        setPrevChats([]);
    };

    const changeThread = async (newThreadId: string) => {

        console.log("Changing thread:", newThreadId);
        setCurrrentThreadId(newThreadId);

        try {

            const response = await api.get(
                `/thread/${newThreadId}`
            );
            console.log("Selected thread:", response.data);
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

    const deleteThread = async (threadId: string) => {

        try {

            const response = await api.delete(`/thread/${threadId}`);

            console.log(response.data);

            setAllThreads((prev: Thread[]) =>
                prev.filter(
                    (thread: Thread) =>
                        thread.threadId !== threadId
                )
            );

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
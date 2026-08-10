import "./Sidebar.css";
import logo from "../../assets/blacklogo.png";
import MyContext from "../../MyContext";
import { useContext, useEffect } from "react";
import threads from "../../services/ThreadService";
import type Thread from "../../models/Thread";
import { v1 as uuidv1 } from "uuid";

function Sidebar() {
    const { allThread, setAllThreads, setNewChat, setPrompt, setReply, currrentThreadId, setPrevChats, setCurrrentThreadId } = useContext(MyContext);

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

    useEffect(() => {
        getAllThreads();
    }, []);

    const createNewChat = () => {
        setNewChat(true);
        setPrompt("");
        setReply(null);
        setCurrrentThreadId(uuidv1());
        setPrevChats([]);
    };

    return (
        <div className="sidebar">

            <div className="panel" onClick={createNewChat}>
                <img
                    src={logo}
                    alt="gpt logo"
                    className="logo"
                />

                <span>
                    <i className="fa-solid fa-pen-to-square"></i>
                </span>
            </div>

            <ul className="history">
                {allThread.map((thread: Thread) => (
                    <li
                        key={thread.threadId}
                        className={
                            thread.threadId === currrentThreadId
                                ? "hightlighted"
                                : ""
                        }
                    >
                        {thread.title}

                        <i className="fa-solid fa-trash"></i>
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
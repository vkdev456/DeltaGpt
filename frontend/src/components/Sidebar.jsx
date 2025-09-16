import "./Sidebar.css"
import Mycontext from "./MyContext";
import {useContext,useEffect} from "react";
import {v1 as uuidv1}from "uuid";

function Sidebar(){

    const {allThreads,setAllThreads,setNewChat,currThreadId,setPrompt,setReply,
          setPrevChats,setCurrThreadId}=useContext(Mycontext);
    
    const getAllThreads = async()=>{
          try{
            const response=await fetch("http://localhost:8080/api/thread");
            const res=await response.json();
            const filteredData =res.map(thread=>({threadId: thread.threadId, title: thread.title}));
            setAllThreads(filteredData);
            console.log(filteredData);
          }catch(err){
            console.log(err);
          }
    }

    useEffect(()=>{
        getAllThreads();

    },[currThreadId]);//when ever changes in curr th id then call 
    // this function


    const createNewChat=()=>{
          setNewChat(true);
          setPrompt("");
          setReply(null);
          setCurrThreadId(uuidv1());
          setPrevChats([]);
    }

    return(
        <>
        <section className="sidebar">
            {/* new chat */}
            <button onClick={createNewChat}> 
                <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo"></img>
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>

            {/* history */}
            <ul className="history">
               
                  {allThreads?.map((thread, idx) => (
                    <li key={idx}>{thread.title}</li>
                   ))
                  }
            </ul>
          

            {/* sign */}
            <div className="sign">
               <p> By Vk✨ </p> 
            </div>
        </section>
        </>
    )
}

export default Sidebar;
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
            // console.log(filteredData);
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

    const changeThread= async (newThreadId)=>{
       setCurrThreadId(newThreadId);
       try{
           const response= await fetch(`http://localhost:8080/api/thread/${newThreadId}`);
           const res=await response.json();
           console.log(res.messages);
           setPrevChats(res.messages || []);  
           setNewChat(false);
           setReply(null);
       }catch(err){
          console.log(err);
       }

    }
    
    const deleteThread = async(threadId) => {
        try{
            const response=await fetch(`http://localhost:8080/api/thread/${threadId}`,{method: "DELETE"});
            const res=await response.json();
            console.log(res);

      
            //updated threads re-render
            setAllThreads(prev=>prev.filter(thread=>thread.threadId!== threadId));

            if(threadId === currThreadId){
              createNewChat();
            }

        }catch(err){
            console.log(err);
        }
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
                    <li key={idx} 
                        onClick={(e)=>changeThread(thread.threadId)}
                    >
                      {thread.title}
                      <i className="fa-solid fa-trash"
                         onClick={(e)=>{e.stopPropagation();
                                  deleteThread(thread.threadId)
                         }}>
                                
                      </i>
                    </li>
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
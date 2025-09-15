import "./Sidebar.css"

function Sidebar(){
    return(
        <>
        <section className="sidebar">
            {/* new chat */}
            <button>
                <img src="src/assets/blacklogo.png" alt="gpt logo" className="logo"></img>
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </button>

            {/* history */}
            <div className="history">
                <li>thread1</li>
                <li>thread2</li>
                <li>thread3</li>
                <li>thread4</li>
            </div>

            {/* sign */}
            <div className="sign">
               <p> By Vk✨ </p> 
            </div>
        </section>
        </>
    )
}

export default Sidebar;
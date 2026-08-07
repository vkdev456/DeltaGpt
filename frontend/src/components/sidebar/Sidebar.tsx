import react from "react";

import "./Sidebar.css"
import logo from "../../assets/blacklogo.png";

function Sidebar(){
    return(
        <>
          <div className="sidebar">
           
            <div className="panel">
                <img src={logo} alt="gpt logo" className="logo"></img>
                <span><i className="fa-solid fa-pen-to-square"></i></span>
            </div>

            <ul className="history">
                <li>
                  Hi virat Kohli
                  <i className="fa-solid fa-trash" >

                  </i>
                </li>
            </ul>
            


            
            <div className="sign">
               <p> By Vk✨ </p> 
            </div>
          </div>
         
        </>
    )
}

export default Sidebar;


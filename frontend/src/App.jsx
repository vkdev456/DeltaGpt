import './App.css'
import Sidebar from "./components/Sidebar.jsx";
import ChatWindow from "./components/ChatWindow.jsx";
import { Mycontext } from './components/MyContext.jsx';

function App() {
  const providerValues={};
  
  return (
    <>
    <div className="app">
        <Mycontext.Provider value={providerValues}>
          <Sidebar></Sidebar>
          <ChatWindow></ChatWindow>
        </Mycontext.Provider>
    </div>
    </>
  )
}

export default App

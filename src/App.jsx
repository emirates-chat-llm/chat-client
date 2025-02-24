import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/SideBar';
import Chat from './components/ChatMessage';
import "../public/assets/scss/style.scss";

/**
 * Root component of the application.
 * 
 * This component wraps the entire app structure, including the sidebar, header, and chat components.
 * It also provides the sidebar context to manage the state of the sidebar across components.
 * 
 * @component
 * @returns {JSX.Element} The rendered App component.
 */
function App() {
  // Sidebar toggle
  const [isOpen, setIsOpen] = useState(false);
  const openSidebar = () => {
    setIsOpen((prev) => !prev);
  };
  
  return (
    <>      
        <Sidebar isOpen={isOpen} onButtonClick={openSidebar}/>
        <Header isOpen={isOpen} onButtonClick={openSidebar}/>
        <Chat />       
    </>
  );
}

export default App;

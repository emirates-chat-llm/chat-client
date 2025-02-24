import React from 'react';

/**
 * Header component that displays the top navigation bar.
 * It includes a sidebar toggle button, a welcome message, and a logout button.
 * Also, it renders an overlay that closes the sidebar when clicked.
 *
 * @component
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = ({isOpen, onButtonClick}) => { 
    return (
        <>
            {/* Top header section with toggle button and welcome message */}
            <header className="topHeader d-flex align-items-center justify-content-between">
                <div className="topHeader_left">
                    {/* Button to toggle the sidebar */}
                    <button type="button" className="topHeader_left_toggle" onClick={onButtonClick}>
                        <em className="icon-menu"></em>
                    </button>
                    {/* Welcome message */}
                    <h1>Welcome Rimjhim👋 </h1>
                </div>
                <div className="topHeader_right">
                    {/* Logout button */}
                    <a href="#!" className="btn btn-outline-light">
                        <em className="icon-logout icon"></em>Logout
                    </a> 
                </div>
            </header>

            {/* Overlay to close the sidebar when clicked outside */}
            <div className={`overlay ${isOpen ? "show" : ""}`} onClick={onButtonClick}></div>
        </>
    );
};

export default Header;

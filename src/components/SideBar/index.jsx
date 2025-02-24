import React from 'react';

/**
 * Sidebar component that provides navigation and action buttons.
 * It includes options for selecting routes, clearing message history, and closing the sidebar.
 * The sidebar visibility is controlled via context.
 *
 * @component
 * @returns {JSX.Element} The rendered Sidebar component.
 */
const Sidebar = ({isOpen, onButtonClick}) => {  

    return (
        <>
            {/* Sidebar container, dynamically adding 'show' class when open */}
            <div className={`sidebar ${isOpen ? "show" : ""}`}>
                
                {/* Sidebar header with logo and close button */}
                <div className="d-flex align-items-center justify-content-between">
                    <a href="#!" className="sidebar_logo">
                        <img src="/assets/images/logo.png" alt="logo" />
                    </a>
                    {/* Button to close the sidebar */}
                    <button type="button" className="sidebar_toggle p-0" onClick={onButtonClick}>
                        <em className="icon-cross"></em>
                    </button>
                </div>

                {/* Sidebar content section */}
                <div className="sidebar_routeBox d-flex align-items-center justify-content-between flex-column">
                    
                    {/* Section for selecting manual routes */}
                    <div className="sidebar_routeBox_inner mb-2">
                        <div className="sidebar_routeBox_top">
                            <h2>Select Manual Route</h2>
                            <p className="mb-0">
                                Choose from KB articles or dive into the DB for detailed configuration steps.
                            </p>
                        </div>

                        {/* Navigation links */}
                        <div className="sidebar_routeBox_bottom">
                            <ul className="list-unstyled">
                                <li className="active">
                                    <a href="#">KB Article</a>
                                </li>
                                <li>
                                    <a href="#">DB Article</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Sidebar action buttons section */}
                    <div className="sidebar_action w-100">
                        <div className="sidebar_action_btnRow">
                            {/* Placeholder test buttons */}
                            <button type="button" className="btn btn-primary w-100">Test Button</button>
                            <button type="button" className="btn btn-primary w-100">Test Button</button>
                        </div>

                        {/* Button to clear message history */}
                        <div className="sidebar_action_clear">
                            <button type="button" className="btn btn-outline-light w-100">
                                <em className="icon-delete icon"></em> Clear message history
                            </button>
                        </div>
                    </div>

                </div>
            </div>           
        </>
    );
};

export default Sidebar;

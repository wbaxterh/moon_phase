import React from "react";

function NavigationDrawer({ isOpen, toggleMenu, changeScreen }) {
    return (
      <div className={`drawer ${isOpen ? 'open' : ''}`}>
        <button onClick={toggleMenu}>
            <i className="fa fa-xmark"></i>
        </button>
        <ul>
          <li onClick={() => changeScreen('Moon')}>Moon</li>
          <li onClick={() => changeScreen('Sun')}>Sun</li>
        </ul>
      </div>
    );
  }
export default NavigationDrawer;  
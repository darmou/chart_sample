import React from "react";
import "./MenuButtons.css";

const menuButtons = (props) => {

    const menuButtons = props.menuButtons.map(menuButton =>

       <div key={menuButton.id}  className={(menuButton.isActive) ? "menuButton" : "menuButtonDisabled"}>
           {menuButton.name}

       </div>

    );


    return (
        <div className='MenuButtons'>

            {menuButtons}

        </div>

    );
};

export default menuButtons;
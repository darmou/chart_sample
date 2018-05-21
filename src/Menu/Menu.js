import React from "react";
import { Link } from "react-router-dom";
import "./Menu.css";

const menu = (props) => {

    const menuItems = props.menuItems.map(menuItem =>

            <Link
                key={menuItem.id}
                style={{color: (menuItem.isActive) ? "black": "#b9b7b8"}}
                onClick={props.click.bind(props.that, menuItem.id)}
                to={`/${menuItem.shortName}`}>
                {menuItem.name}
            </Link>

    );


    return (
        <div className='Menu'>

                {menuItems}

        </div>

    );
};

export default menu;

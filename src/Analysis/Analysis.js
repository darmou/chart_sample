import React from "react";
import "./Analysis.css";

const analysis = (props) => {
    const menuItems = props.menuItems.map(menuItem =>
        <option
            key={menuItem.id}
            value={menuItem.value}
            defaultValue={menuItem.selected}
        >
            {menuItem.name}
        </option>

);

    return (
        <div className="Analysis">
            <label>Analysis</label>
            <select onChange={props.analysisChange}>
                {menuItems}
            </select>
        </div>

    );
};

export default analysis;

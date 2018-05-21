import React from "react";
import "./ActiveQAs.css";

const activeQAs = (props) => {

    const qaItems = props.qaItems.map(qaItem =>

        <div key={qaItem.name} className={(qaItem.isActive)? "qaItem" : "qaItemDisabled"  }>
            {qaItem.name}
        </div>
    );

    return (
        <div className="ActiveQAs">
            <label>Active QAs</label>
            <div className="qaItems">
            {qaItems}
            </div>
        </div>

    );
};

export default activeQAs;

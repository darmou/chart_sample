import React from "react";
import "./DashboardContainer.css";


const dashboardContainer = (props) => {


    return (
        <div className="DashboardContainer">
            <label>{props.label} {props.variable}</label>
            {props.children}
        </div>

    );
};

export default dashboardContainer;
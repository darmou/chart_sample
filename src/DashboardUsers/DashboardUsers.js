import React from "react";
import DoughnutChart from "../DoughnutChart/DoughnutChart";

import "./DashboardUsers.css";

const dashboardUsers = (props) => {

    return (
        <div className="DashboardUsers">
            <div className="legend">
                <label className="activeUsers">Active Users <span>{props.activeUsers}</span></label>
                <label className="inactiveUsers">Inactive Users <span>{props.inactiveUsers}</span></label>
            </div>
            <DoughnutChart
                radius={props.radius}
                activeUsers={props.activeUsers}
                inactiveUsers={props.inactiveUsers}
                numNodes={props.numNodes}
            />
        </div>

    );
};

export default dashboardUsers;

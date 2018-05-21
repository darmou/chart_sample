import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import "./DashboardLineChart.css";

const dashboardLineChart = (props) => {

    return (
        <div className="DashboardLineChart">
            <HighchartsReact
                highcharts={Highcharts}
                constructorType="chart"
                options={props.dashboardChartData}
            />
        </div>

    );
};

export default dashboardLineChart;
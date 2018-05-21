import React, {Component} from "react";
import "./QAPage.css";
import moment from "moment";
import Analysis from "../Analysis/Analysis";
import MenuButtons from "../MenuButtons/MenuButtons";
import ActiveQAs from "../ActiveQAs/ActiveQAs";
import DashboardContainer from "../DashboardContainer/DashboardContainer";
import DashboardTable from "../DashboardTable/DashboardTable";
import DashboardLineChart from "../DashboardLineChart/DashboardLineChart";
import DashboardUsers from "../DashboardUsers/DashboardUsers";


const seriesData = [];

class QAPage extends Component {

    //Some sample data for our demo
    state = {
        menuButtons: [
            {id: 1, name: "Now", isActive: true},
            {id: 2, name: "Last 1 hour", isActive: false},
        ],
        activeQAs: {
            qaItems: [],
            activeItems: [0, 1, 2, 7]
        },

        summaryTable: {

            header: [
                ["COMPONENT", "DATA TRANSFER"]
            ],
            lineItems: [
                ["QA-A", "4500 MB"],
                ["QA-C", "7500 MB"],
                ["QA-H", "7500 MB"],
            ]
        },
        dashboardContainerLabels: {
            tableLabel: "SUMMARY",
            lineChartLabel: "DATA TRANSFER (MB)",
            pieChartLabel: "TOTAL USERS "
        },
        pieChartData: {
            totalUsers: 9,
            activeUsers: 3,
            radius: 100,
            numNodes: 100
        },
        analysis: {
          menuItems: [
              {id: 1, value: "complete", name: "Complete", selected: true},
              {id: 2, value: "now", name: "Now", selected: false},
          ]
        },
        dashboardChartData: {
            xAxis: {
                tickInterval: 2,
                labels: {
                    enabled: true,
                    style: {
                        textOverflow: "none"
                    },
                    formatter: function() {
                        return seriesData[this.value][0]; //This is why seriesData is outside the component
                        },
                },
                pointInterval: 10000
            },
            title: {
                text: null
            },
            chart: {
                height: 300,
                type: "line"
            },
            yAxis: {
               title: {
                   enabled: false
               },
                labels: {
                    format: "{value}"
                }
            },
            series: [{
                data: seriesData,
                color: "#bc0c1b",
                name: "QA-A"
            }, {
              data: [2200, 8000, 7500, 8000, 7900, 8100, 7900, 6200, 7000, 6000, 6100, 6300, 6050],
                color: "#fe8437",
                name: "QA-C"
            }, {
                data: [3600, 5000, 3800, 3700, 6050, 3900, 3700, 7300, 4500, 4500, 4300, 3100, 3100],
                color: "#0d5596",
                name: "QA-H"
            }],
            plotOptions: {
                series: {
                    lineWidth: 5
                },
                line: {
                    marker: {
                        enabled: false
                    }
                },

            }
        }

    };

    fillQAs(activeQAs) {
        activeQAs.qaItems.length = 0; //clear array
        for (let i = 0; i < 8; i++) {
            activeQAs.qaItems.push({
                id: (i+1),
                name: (i+10).toString(36).toUpperCase(),
                isActive: activeQAs.activeItems.includes(i)
            })
        }
        return activeQAs;
    }

    addXLabelsSeriesData(start_date, is_down) {
        for (let i= 0; i< seriesData.length; i++) {
            const date = (is_down) ? start_date.subtract("10", "seconds") : start_date.add("10", "seconds");
            seriesData[i].splice(0, 0, date.format("hh:mm:ss"));
        }
    }

    componentWillMount() {
        //Just for demo purposes in a a real app this would be from network request or from redux store
        seriesData.length = 0;
        seriesData.push([1600], [2100], [1900], [2200], [2100], [1900], [4890], [3800], [3900], [3700], [3900], [3100], [3200]);
        const activeQAs = this.fillQAs({...this.state.activeQAs});
        this.setState({activeQAs: activeQAs});
        let date = moment("10:59:50", "hh:mm:ss");
        this.addXLabelsSeriesData(date, false);
    }

    analysisOnChange(event) {
        const menuSelected = event.target.value;
        const activeQAs = {...this.state.activeQAs};

        if (menuSelected === "now" || menuSelected === "complete") {
            activeQAs.activeItems.length = 0;
            activeQAs.activeItems.push(0, 2, 7);
            const summaryTable = {...this.state.summaryTable};
            summaryTable.lineItems.length = 0;
            summaryTable.lineItems.push(["QA-A", "5000 MB"],
                ["QA-C", "6500 MB"],
                ["QA-H", "6500 MB"]);

            seriesData.length = 0;
            seriesData.push([2500], [4000], [6000], [3000], [3500], [4000], [3200], [3800], [3450], [2000], [2500], [3500], [3200]);
            const chartData = {...this.state.dashboardChartData};
            chartData.series[1].data.length = 0;
            chartData.series[1].data.push(3100, 7300, 7500, 7600, 5677, 6400, 8100, 4500, 3000, 4566, 5677, 2355, 6050);
            chartData.series[2].data.length = 0;
            chartData.series[2].data.push(2100, 6450, 4566, 5467, 4700, 8100, 4500, 6100, 4500, 6788, 3500, 2500, 2700);
            this.addXLabelsSeriesData(moment(new Date(), "hh:mm:ss").add("10", "seconds"), true);
            this.setState({ activeQAs: this.fillQAs(activeQAs), summaryTable: summaryTable, dashboardChartData: chartData });
        }
    }
    
    render() {
        return (
            <div className="QAPage">

                <MenuButtons menuButtons={this.state.menuButtons}/>
                <Analysis analysisChange={this.analysisOnChange.bind(this)}
                            menuItems={this.state.analysis.menuItems}
                />
                <ActiveQAs qaItems={this.state.activeQAs.qaItems}/>
                <div className="dashboardContainers">
                    <DashboardContainer label={this.state.dashboardContainerLabels.tableLabel}>
                        <DashboardTable
                            header={this.state.summaryTable.header}
                            lineItems={this.state.summaryTable.lineItems}
                        />
                    </DashboardContainer>
                    <DashboardContainer label={this.state.dashboardContainerLabels.lineChartLabel}>
                        <DashboardLineChart dashboardChartData={this.state.dashboardChartData }/>
                    </DashboardContainer>
                    <DashboardContainer label={this.state.dashboardContainerLabels.pieChartLabel}
                                        variable={this.state.pieChartData.totalUsers}>
                    <DashboardUsers activeUsers={this.state.pieChartData.activeUsers}
                                    inactiveUsers={this.state.pieChartData.totalUsers
                    - this.state.pieChartData.activeUsers}
                                    numNodes={this.state.pieChartData.numNodes}
                                    radius={this.state.pieChartData.radius}
                    />
                    </DashboardContainer>
                </div>
            </div>

        );

    }
};

export default QAPage;
import { Component } from "react";
import ReactFauxDOM from "react-faux-dom";
import * as d3 from "d3";
import "./DoughnutChart.css";


class DoughnutChart extends Component {
    constructor() {
        super();
        this.state = {
            width: 100,
            height: 100
        };
        //best practice to bind functions in the constructor
        this.updateDimensions = this.updateDimensions.bind(this);
    }

    // *magic* we take the div surrounding the svg and set it's with/height to be the with/height of our SVG
    updateDimensions() {
        const el = this.refs.chart;
        this.setState({ width: el.offsetWidth, height: el.offsetHeight });
    }

    //fireing our function and adding the event listener
    componentDidMount(){
        this.updateDimensions();
        window.addEventListener("resize", this.updateDimensions);
    }

    //removing the event listener
    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    createNodes() {
        let nodes = [],
            width = (this.props.radius * 2) + 50,
            //height = (this.props.radius * 2) + 50,
            angle,
            x,
            y,
            i;
        for (i = 0; i < this.props.numNodes; i++) {
            angle = (i / (this.props.numNodes/2)) * Math.PI; // Calculate the angle at which the element will be placed.
            // For a semicircle, we would use (i / numNodes) * Math.PI.

            x = (this.props.radius * Math.cos(angle)) + (width/2) + 30; // Calculate the x position of the element.
            y = (this.props.radius * Math.sin(angle)) + (width/2) + 30; // Calculate the y position of the element.
            nodes.push({"id": i, "x": x, "y": y, "angle": angle});
        }
        return nodes;
    };

    createArc(svg) {
        var pi = Math.PI;
        const total_percent = (this.props.inactiveUsers / (this.props.activeUsers + this.props.inactiveUsers));
        const total_angle = Math.floor(360 * total_percent);
        const arc = d3.arc()
            .innerRadius((parseInt(this.props.radius, 10) - 10))
            .outerRadius(parseInt(this.props.radius, 10) + 8)
            .startAngle(0 * (pi/180)) //converting from degs to radians
            .endAngle(total_angle * (pi/180))

        svg.append("path")
            .attr("d", arc)
            .attr("fill", "#f9d533")
            .attr("transform", "translate(163,157)");

    };

    makeLine(x1, y1, x2, y2, g) {
        g.append("line")
            .attr("x1", x1)
            .attr("y1", y1)
            .attr("x2", x2)
            .attr("y2", y2)
            .attr("stroke-width", 2)
            .attr("stroke", "#9b9a98");
    };

    makeText(x, y, text, g) {
        g.append("text")
            .attr("font-size", 12)
            .attr("x", x)
            .attr("y", y)
            .text(text)

    };

    createRectBox(svg) {
        svg.append("g");
        const g = svg.selectAll("g");
        const width = 110;
        const height = 40;

        g.append("rect")
            .attr("width", width)
            .attr("height", height)
            .attr("x", 0)
            .attr("y", 0)
            .attr("fill", "#e8e7e5")
            .attr("opacity", 0.5);

        this.makeLine(1, 3, 1, height, g);
        this.makeLine(1, height, (width - 2), height, g);
        this.makeText(10, 17, "Inactive Users", g);
        this.makeText(10, 32, "6", g);
        g.attr("transform", "rotate(240, 165, 127)");
    };

    createElements(svg, nodes)  {

        svg.selectAll("circle")
            .data(nodes)
            .enter().append("rect")
            .attr("x", function (d, i) {
                return d.x;
            })
            .attr("y", function (d, i) {
                return d.y;})
            .attr("width", 16)
            .attr("height", 4)
            .attr("fill", "#6ab5db")
            .attr("transform", (d, i) => {
                var centerX = d.x + 8;
                var centerY = d.y + 2;
                return "rotate(" + ((d.angle * 180) / Math.PI)  + "," + centerX + "," + centerY + ")";
            });

        this.createArc(svg);
        this.createRectBox(svg);

    };

    createSvg(el, callback) {
        let svg = d3.select(el).append("svg")
            .attr("width", (this.props.radius * 2) + 140)
            .attr("height", (this.props.radius * 2) +  140)
            .attr("transform", "rotate(120)");

        callback(svg);
    };

    drawChart() {
        // we create the faux element
        let el = new ReactFauxDOM.Element("div");
        el.setAttribute("class", "chart");
        // we set ref on our newly created element
        el.setAttribute("ref", "chart");
        const nodes = this.createNodes();

        this.createSvg(el, svg => {
            this.createElements(svg, nodes);
        });
        return el.toReact();
    }

    render() {
        return (
            this.drawChart()
        )
    }
};

export default DoughnutChart;

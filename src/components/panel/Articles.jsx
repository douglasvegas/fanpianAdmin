import React from 'react';
import ReactDOM from 'react-dom';
import Chart from '../Chart.jsx';

class Articles extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'line',
            data: {
                labels: ["一月", "二月", "三月", "四月", "五月", "六月", "七月"],
                datasets: [
                    {
                        label: "新增文章数",
                        fill: true,
                        lineTension: 0.1,
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderColor: "rgba(75,192,192,1)",
                        borderCapStyle: 'butt',
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: 'miter',
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBackgroundColor: "#fff",
                        pointBorderWidth: 1,
                        pointHoverRadius: 5,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointRadius: 1,
                        pointHitRadius: 10,
                        data: [65, 59, 80, 81, 56, 55, 40],
                        spanGaps: false,
                    }
                ]
            },
        };
    }

    render () {
        return (
            <div>
                <Chart 
                    type = {this.state.type}
                    data = {this.state.data}
                    options = {this.state.options}
                    id = 'articleChart'
                />
            </div>
        )
    }
}

export default Articles;
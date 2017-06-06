import React from 'react';
import ReactDOM from 'react-dom';
import Chart from '../Chart.jsx';

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'doughnut',
            data: {
                labels: [
                    "男",
                    "女",
                    "未知"
                ],
                datasets: [
                    {
                        data: [300, 50, 100],
                        backgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ],
                        hoverBackgroundColor: [
                            "#FF6384",
                            "#36A2EB",
                            "#FFCE56"
                        ]
                    }]
            },
            options: {
                animation:{
                    animateScale:true
                }
            }
        
        };
    }

    render () {
        return (
            <div>
                <Chart 
                    type = {this.state.type}
                    data = {this.state.data}
                    options = {this.state.options}
                    id = 'userCharrt'
                />
            </div>
        )
    }
}

export default Users;
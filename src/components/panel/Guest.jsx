import React from 'react';
import ReactDOM from 'react-dom';
import Chart from '../Chart.jsx'



class Guest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 'bar',
            data: {
                labels: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"],
                datasets: [{
                    label: '访问量',
                    data: [126, 19, 3, 5, 0, 3, 9],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                        'rgba(255, 120, 200, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255,99,132,1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                        'rgba(255, 120, 200, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
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
                    id = 'guestChart'
                />
            </div>
        )
    }
}

export default Guest;
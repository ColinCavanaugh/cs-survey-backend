import React, { Component } from 'react';
import '../../App.css';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

class ViewResult extends Component {
    constructor(props) {
        super(props);
        this.state = {
            res1: 0,
            res2: 0,
            res3: 0,
            res4: 0,
            res5: 0,
            question: '',
            charOptions: {},
            chartData: {},
            charOptions: {}
        };
    }

    componentDidMount() {
        var surveyID;
        switch (this.props.survType) {
            case "IAB":
                surveyID = '3';
                break;
            case "alumni":
                surveyID = '2';
                break;
            case "senior":
                surveyID = '1';
        }
        var qNum = this.props.num;
        var question;
        axios.get(`http://173.244.1.41:3000/express_backend/survey${surveyID}/q${qNum}`).then((response) => {
            this.setState({
                question: response.data.express                
            });
        }).catch(function (error) { console.log(error) });
        this.setState({
            charOptions: {
                responsive: true,
                maintainAspectRatio: false,
                legend: {
                    display: false
                },
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        },
                        scaleLabel: {
                            display: true,
                            labelString: '# of Responses'
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Rating'
                        }
                    }]
                }
            },
            chartData: {
                labels: ['5', '4', '3', '2', '1'],
                datasets: [
                    {
                        label: '# of Responses',
                        backgroundColor: 'rgba(255, 119, 51, 1)',
                        borderColor: 'rgba(0,0,0,1)',
                        data: [0, 0, 0, 0, 0]
                    }
                ]
            }
        });
        let body = {
            survey: this.props.survType,
            qNum: this.props.num,
        }
        axios.post('http://173.244.1.41:3000/express_backend/getGraphData/', body).then((response) => {
            var res5 = response.data.res5;
            var res4 = response.data.res4;
            var res3 = response.data.res3;
            var res2 = response.data.res2;
            var res1 = response.data.res1;
            let myChart = this.reference.chartInstance;
            myChart.config.data.datasets[0].data[0] = res5;
            myChart.config.data.datasets[0].data[1] = res4;
            myChart.config.data.datasets[0].data[2] = res3;
            myChart.config.data.datasets[0].data[3] = res2;
            myChart.config.data.datasets[0].data[4] = res1;
            myChart.update();
        }).catch(function (error) { console.log(error) });
    }

    updateGraph(start, end) {
        let body = {
            survey: this.props.survType,
            qNum: this.props.num,
            start: start,
            end: end
        }
        axios.post('http://173.244.1.41:3000/express_backend/getModGraphData/', body).then((response) => {
            var res5 = response.data.res5;
            var res4 = response.data.res4;
            var res3 = response.data.res3;
            var res2 = response.data.res2;
            var res1 = response.data.res1;
            let myChart = this.reference.chartInstance;
            myChart.config.data.datasets[0].data[0] = res5;
            myChart.config.data.datasets[0].data[1] = res4;
            myChart.config.data.datasets[0].data[2] = res3;
            myChart.config.data.datasets[0].data[3] = res2;
            myChart.config.data.datasets[0].data[4] = res1;
            myChart.update();
        }).catch(function (error) { console.log(error) });
    }

    render() {
        return (
            <div>
                <p>{this.props.num}.) {this.state.question}</p>
                <Bar
                    ref={(reference) => this.reference = reference}
                    data={this.state.chartData}
                    options={ this.state.charOptions }
                />
            </div>
        );
    }
}
export default ViewResult;
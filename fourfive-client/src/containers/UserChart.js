import React, { Component } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { Line } from 'react-chartjs-2';
import { fetchWeights } from '../store/actions/weight';

class UserChart extends Component {
    componentDidMount() {
        const { name } = this.props.match.params;
        this.props.fetchWeights(name);
        
    }

    renderWeight () {
        console.log(this.props.weight)
        const { weighDays } = this.props.weight;
        if (!weighDays) return <div>Loading....</div>
        const options = {
            maintainAspectRatio: false,
            legend: {
                display: false
            }
        }
        const data = {
            labels: weighDays.map((weigh) => {
                return moment(weigh.date).format("DD/MM/YYYY");
            }),
            datasets: [
                {
                    label: "Weight",
                    fill: false,
                    lineTension: 0.1,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: weighDays.map((weigh) => {
                        return weigh.avg / 1000;
                    })
                }
            ]
        }

        return <Line data={data} height={400} options={options}/>;
    }

    render() {
        return (
            <div className="chart-container">
                {this.renderWeight()}
            </div>
        )
    }
}

function mapStateToProps({ weight }) {
    return {weight};
}

export default connect(mapStateToProps, { fetchWeights })(UserChart);
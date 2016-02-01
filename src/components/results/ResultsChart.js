import React, { Component, PropTypes } from 'react';
import capitalize from 'lodash/string/capitalize';
const BarChart = require('react-chartjs').Bar;

class ResultsChart extends Component {
  static propTypes = {
    housePoints: PropTypes.object.isRequired
  };

  render() {
    const housePoints = this.props.housePoints;

    let data = {
      labels: Object.keys(housePoints).map(x => capitalize(x)),
      datasets: [{
        label: 'My Second dataset',
        fillColor: 'rgba(151,187,205,0.5)',
        strokeColor: 'rgba(151,187,205,0.8)',
        highlightFill: 'rgba(151,187,205,0.75)',
        highlightStroke: 'rgba(151,187,205,1)',
        data: Object.keys(housePoints).map(x => housePoints[x])
      }]
    };

    return <BarChart style={{width: '700px', height: '500px'}} data={data} />;
  }
}

export default ResultsChart;

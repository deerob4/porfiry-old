import React, { Component, PropTypes } from 'react';
import { Select, Option, Placeholder } from 'belle';

class HouseSelector extends Component {
  static propTypes = {
    years: PropTypes.array.isRequired
  }

  render() {
    return (
      <Select>
        <Placeholder>I'm in year...</Placeholder>
        {this.props.years.map(year =>
          <Option key={year} value={year}>{year}</Option>
        )}
      </Select>
    );
  }
}

export default HouseSelector;


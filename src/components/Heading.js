import React, { Component, PropTypes } from 'react';

class Heading extends Component {
  static propTypes = {
    house: PropTypes.string.isRequired,
    level: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }

  render() {
    let heading;

    switch (this.props.level) {
      case 'h1':
        heading = (
          <h1 className={`h1-${this.props.house}`}>
            {this.props.text}
          </h1>
        );

      case 'h2':
        heading = (
          <h2 className={`h2-${this.props.house}`}>
            {this.props.text}
          </h2>
        );

      default:
        heading = (
          <h2 className={`h2-${this.props.house}`}>
            {this.props.text}
          </h2>
        );
    }

    return heading;
  }
}

export default Heading;

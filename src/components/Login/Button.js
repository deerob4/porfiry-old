import React, { Component, PropTypes } from 'react';

class Button extends Component {
  static propTypes = {
    function: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
  }

  render() {
    return (
      <button className="button"
              onClick={this.props.function}
              style={this.props.colours}>
              {this.props.text}
      </button>
    );
  }
}

export default Button;

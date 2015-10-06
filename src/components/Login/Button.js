import React, { Component, PropTypes } from 'react';

class Button extends Component {
  static propTypes = {
    buttonFunction: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className="button"
           onClick={this.props.buttonFunction}
           style={this.props.colours}>
           {this.props.text}
      </div>
    );
  }
}

export default Button;

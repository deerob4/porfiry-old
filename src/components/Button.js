import React, { Component, PropTypes } from 'react';

class Button extends Component {
  static propTypes = {
    clickEvent: PropTypes.func.isRequired,
    customClass: PropTypes.string,
    text: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className={`button ${this.props.house}-button ${this.props.customClass}`}
           onClick={this.props.clickEvent}>
           {this.props.text}
      </div>
    );
  }
}

export default Button;

import React, { Component, PropTypes } from 'react';

class Button extends Component {
  static propTypes = {
    clickEvent: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className={`button ${this.props.house}-button`}
           onClick={this.props.clickEvent}>
           {this.props.text}
      </div>
    );
  }
}

export default Button;

import React, { Component, PropTypes } from 'react';

class Button extends Component {
  static propTypes = {
    clickEvent: PropTypes.func.isRequired,
    customClass: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className={`button ${this.props.house}-button ${this.props.customClass}`}
           onClick={this.props.clickEvent}>
           {this.props.text}
           {this.props.icon ? <i className={`fa fa-${this.props.icon} button-icon`}></i> : null}
      </div>
    );
  }
}

export default Button;

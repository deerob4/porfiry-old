import React, { Component, PropTypes } from 'react';

class Button extends Component {
  static propTypes = {
    clickEvent: PropTypes.func.isRequired,
    colours: PropTypes.object.isRequired,
    customClass: PropTypes.string,
    icon: PropTypes.string,
    text: PropTypes.string.isRequired
  }

  render() {
    return (
      <li style={this.props.colours} className={`button ${this.props.house}-button ${this.props.customClass}`}
           onClick={this.props.clickEvent}>
           {this.props.text}
           {this.props.icon ? <i className={`fa fa-${this.props.icon} button-icon`}></i> : null}
      </li>
    );
  }
}

export default Button;

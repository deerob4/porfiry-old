import React, { Component, PropTypes } from 'react';
import CSSModules from 'react-css-modules';
// import 'styles/button.css';

// @CSSModules(styles)
class Button extends Component {
  static propTypes = {
    clickEvent: PropTypes.func.isRequired,
    text: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className="button"
           onClick={this.props.clickEvent}
           style={this.props.colours}>
           {this.props.text}
      </div>
    );
  }
}

export default Button;

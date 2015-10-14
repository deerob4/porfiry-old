import React, { Component, PropTypes } from 'react';
import capitalise from 'lodash/string/capitalize';
import trim from 'lodash/string/trim';

class Select extends Component {
  static propTypes = {
    changeEvent: PropTypes.func.isRequired,
    customClass: PropTypes.string.isRequired,
    house: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
    prefix: PropTypes.string
  }

  constructor(props) {
    super(props);
  }

  render() {
    const className = `${this.props.house}-select ${this.props.customClass}`;

    return (
      <select className={trim(className)}
              onChange={this.props.changeEvent}>

        <option value="" disabled selected>
          {this.props.placeholder}
        </option>

        {this.props.options.map(option =>
          <option key={option} value={option}>
            {this.props.prefix} {capitalise(option)}
          </option>
        )}
      </select>
    );
  }
}

export default Select;

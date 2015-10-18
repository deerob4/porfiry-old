import React, { Component, PropTypes } from 'react';
import capitalise from 'lodash/string/capitalize';
import trim from 'lodash/string/trim';

class Select extends Component {
  static propTypes = {
    changeEvent: PropTypes.func.isRequired,
    complex: PropTypes.bool,
    customClass: PropTypes.string,
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
      <div>
        <select className={trim(className)}
                onChange={this.props.changeEvent}>

          <option value="" selected={true} disabled={true}>
            {this.props.placeholder}
          </option>

          {this.props.options.map(option =>
            this.props.complex ?
              // Used if a complex array containing objects
              // is passed through.
              <option key={option.id + 1} value={option.id}>
                {`${option.id + 1}. ${option.body}`}
              </option> :
              // Used if a simple 1D array is passed.
              <option key={option} value={option}>
                {this.props.prefix} {capitalise(option)}
              </option>
          )}
        </select>
        <div className={`select-arrow ${this.props.house}-select-arrow`}><i></i></div>
      </div>
    );
  }
}

export default Select;

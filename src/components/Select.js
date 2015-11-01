import React, { Component, PropTypes } from 'react';
import capitalise from 'lodash/string/capitalize';
import trim from 'lodash/string/trim';

class Select extends Component {
  static propTypes = {
    arrowClass: PropTypes.string,
    changeEvent: PropTypes.func.isRequired,
    complex: PropTypes.bool,
    customClass: PropTypes.string,
    house: PropTypes.string.isRequired,
    indexes: PropTypes.bool,
    innerClass: PropTypes.string,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
    prefix: PropTypes.string,
    suffix: PropTypes.string
  }

  static defaultProps = {
    indexes: true
  }

  render() {
    const className = `${this.props.house}-select ${this.props.customClass}`;

    return (
      <div className={this.props.innerClass}>
        <select className={trim(className)}
                onChange={this.props.changeEvent}>



          {this.props.options.map((option, index) =>
            this.props.complex ?
              // Used if a complex array containing objects
              // is passed through.
              <option key={option.id + 1} value={option.id}>
                {`${this.props.indexes ? (index + 1) + '.' : ''}
                  ${option.body}
                  ${this.props.suffix ? this.props.suffix : ''}`
                }
              </option> :
              // Used if a simple 1D array is passed.
              <option key={option} value={option}>
                {this.props.prefix} {capitalise(option)}
              </option>
          )}
        </select>
        <div className={`select-arrow ${this.props.house}-select-arrow`}>
          <i className={this.props.arrowClass}></i>
        </div>
      </div>
    );
  }
}

export default Select;

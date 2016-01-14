import React, { Component, PropTypes } from 'react';
import capitalise from 'lodash/string/capitalize';
import trim from 'lodash/string/trim';

class Select extends Component {
  static propTypes = {
    changeEvent: PropTypes.func.isRequired,
    colours: PropTypes.object.isRequired,
    currentlySelected: PropTypes.number,
    direction: PropTypes.oneOf(['left', 'right']),
    indexes: PropTypes.bool,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string.isRequired,
    prefix: PropTypes.string,
    size: PropTypes.oneOf(['full', 'half']),
    suffix: PropTypes.string
  };

  render() {
    let innerClass;
    let outerClass;

    if (this.props.size === 'half') {
      outerClass = 'select-half-parent';
      innerClass = 'select-half';
    }

    return (
      <div className={`select-${this.props.direction} ${outerClass}`}>
        <select className={`select-${this.props.direction} ${innerClass}`}
                onChange={this.props.changeEvent}
                value={this.props.currentlySelected}
                style={this.props.colours}>

          {this.props.options.map((option, index) =>
            typeof this.props.options[0] !== 'object' ?
              // Used if a simple 1D array is passed.
              <option key={option} value={option}>
                {this.props.prefix} {capitalise(option)}
              </option> :
              // Used if a complex array containing objects
              // is passed through.
              <option key={option.id + 1} value={option.id}>
                {`${this.props.indexes ? (index + 1) + '.' : ''}
                  ${option.body}
                  ${this.props.suffix ? this.props.suffix : ''}`
                }
              </option>
          )}
        </select>

        <div className="select-arrow">
          <i className={`${this.props.direction}-arrow`}></i>
        </div>
      </div>
    );
  }
}

export default Select;

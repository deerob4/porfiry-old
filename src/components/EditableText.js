import React, { Component, PropTypes } from 'react';
import trim from 'lodash/string/trim';

class EditableText extends Component {
  static propTypes = {
    finishFunction: PropTypes.func.isRequired,
    house: PropTypes.string.isRequired,
    icon: PropTypes.string,
    iconClass: PropTypes.string,
    inputClass: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    textType: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);

    this.beginEditing = this.beginEditing.bind(this);
    this.finishEditing = this.finishEditing.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      isEditing: false,
      text: this.props.text
    };
  }

  beginEditing() {
    this.setState({ isEditing: true });
  }

  finishEditing() {
    this.setState({ isEditing: false });
    // Only update the question if the user
    // has made changes and length > 0.
    if (this.state.text.length && this.state.text !== this.props.text) {
      this.props.finishFunction(trim(this.state.text));
    }
  }

  handleChange(e) {
    this.setState({ text: e.target.value });
  }

  render() {
    let headingView;

    // Rendered if the user is trying to edit the
    // element. A nice input box linked to the above
    // functions.
    const editView = (
      <input autoFocus={true}
             className={
              `input-${this.props.house}
              ${this.props.inputClass}`
             }
             onBlur={this.finishEditing}
             onChange={this.handleChange}
             placeholder={this.props.text} />
    );

    // Used if the user is just viewing the text.
    // Changes text type depending on properties
    // passed through.
    switch (this.props.textType) {
      case 'p':
        headingView = (
           <p className={`p-${this.props.house}`}
              onClick={this.beginEditing}>
              {this.props.text}
              {this.props.icon ?
                <i className={`fa fa-${this.props.icon} ${this.props.iconClass}`}></i> :
                null
              }
          </p>
        );
        break;

      case 'span':
        headingView = (
          <span onClick={this.beginEditing}>
            {this.props.text}
            {this.props.icon ?
                <i className={`fa fa-${this.props.icon} ${this.props.iconClass}`}></i> :
                null
              }
          </span>
        );
        break;

      case 'h2':
        headingView = (
          <h2 className={`h2-${this.props.house}`}
              onClick={this.beginEditing}>
              {this.props.text}
              {this.props.icon ?
                <i className={`fa fa-${this.props.icon} ${this.props.iconClass}`}></i> :
                null
              }
          </h2>
        );
        break;

      default:
        headingView = <p>Something has gone wrong!</p>;
    }

    return this.state.isEditing ? editView : headingView;
  }
}

export default EditableText;

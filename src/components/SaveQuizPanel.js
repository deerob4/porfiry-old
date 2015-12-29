import React, { Component, PropTypes } from 'react';
import settingsStyle from 'utils/settingsStyle';
import Modal from 'react-modal';
import Button from 'components/Button';

class QuizSettingsPanel extends Component {
  static propTypes = {
    closePanel: PropTypes.func.isRequired,
    colours: PropTypes.object.isRequired,
    panelIsOpen: PropTypes.bool.isRequired
  };

  saveSettings = () => {
    this.props.saveSettings({
      title: this.refs.title.value,
      startDate: this.refs.startDate.value,
      startTime: this.refs.startTime.value,
      questionLength: this.refs.questionLength.value,
      breakLength: this.refs.breakLength.value
    });

    this.props.closePanel();
  }

  render() {
    return (
      <Modal isOpen={this.props.panelIsOpen}
             closeTimeoutMS={150}
             onRequestClose={this.props.closePanel}
             style={settingsStyle(this.props.colours.settings.borderColour)}>

      <h2 className="centre" style={this.props.colours.text.primary}>Save Your Quiz</h2>
      <Button text="yay" />
      </Modal>
    );
  }
}

export default QuizSettingsPanel;

import React, { Component, PropTypes } from 'react';
import settingsStyle from 'utils/settingsStyle';
import Modal from 'react-modal';
import Button from 'components/Button';

class QuizSettingsPanel extends Component {
  static propTypes = {
    closeSettings: PropTypes.func.isRequired,
    currentSettings: PropTypes.object.isRequired,
    house: PropTypes.string.isRequired,
    settingsAreOpen: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);

    this.saveSettings = this.saveSettings.bind(this);
  }

  saveSettings() {
    this.props.saveSettings({
      title: this.refs.title.value,
      startDate: this.refs.startDate.value,
      startTime: this.refs.startTime.value,
      questionLength: this.refs.questionLength.value,
      breakLength: this.refs.breakLength.value
    });

    this.props.closeSettings();
  }

  render() {
    return (
      <Modal isOpen={this.props.settingsAreOpen}
             closeTimeoutMS={150}
             onRequestClose={this.props.closeSettings}
             style={settingsStyle(this.props.house)}>

             <h2 className={`h2-${this.props.house} centre`}>Quiz Settings</h2>
             <p className={`p-${this.props.house} centre`}>Modify the quiz settings in this panel.</p>

             <form>
               <div className="row">
                 <div className="field col-md-12">
                   <label className={`label-${this.props.house}`}>
                      Quiz name:
                   </label>

                   <input className={`${this.props.house}-input input-settings`}
                          placeholder={this.props.currentSettings.title}
                          ref="title"
                          type="text" />
                 </div>
               </div>

               <div className="row">
                 <div className="field col-md-6">
                   <label className={`label-${this.props.house}`}>
                      Start day (the day it will be held):
                   </label>

                   <input className={`${this.props.house}-input input-settings`}
                          ref="startDate"
                          type="date" />
                 </div>

                 <div className="field col-md-6">
                   <label className={`label-${this.props.house}`}>
                          Start time (the time on that day):
                   </label>

                   <input className={`${this.props.house}-input input-settings`}
                          ref="startTime"
                          type="time" />
                 </div>
               </div>

               <div className="row">
                 <div className="field col-md-6">
                   <label className={`label-${this.props.house}`}>
                          Question length (seconds):
                   </label>

                   <input className={`${this.props.house}-input input-settings`}
                          ref="questionLength"
                          placeholder={this.props.currentSettings.questionLength}
                          type="number"
                          min="5" />
                 </div>

                 <div className="field col-md-6">
                   <label className={`label-${this.props.house}`}
                          htmlFor="quizBreak">
                          Break length (minutes):
                   </label>

                   <input className={`${this.props.house}-input input-settings`}
                          ref="breakLength"
                          placeholder={this.props.currentSettings.breakLength}
                          type="number"
                          min="1" />
                 </div>
               </div>

               <div className="row">
                <div className="field col-md-6 setting-buttons">
                  <Button clickEvent={this.saveSettings}
                          customClass="create-quiz-button settings-save"
                          text="Save settings"
                          icon="save"
                          house={this.props.house} />
                </div>
                <div className="field col-md-6 setting-buttons">
                  <Button clickEvent={this.props.closeSettings}
                          customClass="create-quiz-button settings-cancel"
                          text="Cancel changes"
                          icon="ban"
                          house={this.props.house} />
                </div>
               </div>
             </form>
      </Modal>
    );
  }
}

export default QuizSettingsPanel;

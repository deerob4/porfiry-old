import React, { Component, PropTypes } from 'react';
import settingsStyle from 'utils/settingsStyle';
import Modal from 'react-modal';

class QuizSettingsPanel extends Component {
  static propTypes = {
    closeSettings: PropTypes.func.isRequired,
    currentSettings: PropTypes.object.isRequired,
    house: PropTypes.string.isRequired,
    settingsAreOpen: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);

    this.editSetting = this.editSetting.bind(this);
  }

  editSetting(setting) {
    this.props.saveSettings(
      setting,
      this.refs[setting].value
    );
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

                   <input onChange={this.editSetting.bind(this, 'title')}
                          className={`${this.props.house}-input input-settings`}
                          value={this.props.currentSettings.title}
                          ref="title"
                          type="text" />
                 </div>
               </div>

               <div className="row">
                 <div className="field col-md-6">
                   <label className={`label-${this.props.house}`}>
                      Start day (the day it will be held):
                   </label>

                   <input onChange={this.editSetting.bind(this, 'startDate')}
                          className={`${this.props.house}-input input-settings`}
                          ref="startDate"
                          type="date" />
                 </div>

                 <div className="field col-md-6">
                   <label className={`label-${this.props.house}`}>
                          Start time (the time on that day):
                   </label>

                   <input onChange={this.editSetting.bind(this, 'startTime')}
                          className={`${this.props.house}-input input-settings`}
                          ref="startTime"
                          type="time" />
                 </div>
               </div>

               <div className="row">
                 <div className="field col-md-6">
                   <label className={`label-${this.props.house}`}>
                          Question length (seconds):
                   </label>

                   <input onChange={this.editSetting.bind(this, 'questionLength')}
                          className={`${this.props.house}-input input-settings`}
                          ref="questionLength"
                          value={this.props.currentSettings.questionLength}
                          type="number"
                          min="5" />
                 </div>

                 <div className="field col-md-6">
                   <label className={`label-${this.props.house}`}
                          htmlFor="quizBreak">
                          Break length (minutes):
                   </label>

                   <input onChange={this.editSetting.bind(this, 'breakLength')}
                          className={`${this.props.house}-input input-settings`}
                          ref="breakLength"
                          value={this.props.currentSettings.breakLength}
                          type="number"
                          min="1" />
                 </div>
               </div>
             </form>
      </Modal>
    );
  }
}

export default QuizSettingsPanel;

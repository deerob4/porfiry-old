import React, { Component, PropTypes } from 'react';
import settingsStyle from 'utils/settingsStyle';
import Button from 'components/Button';
import Modal from 'react-modal';

class QuizSettingsPanel extends Component {
  static propTypes = {
    closeSettings: PropTypes.func.isRequired,
    currentSettings: PropTypes.object.isRequired,
    house: PropTypes.string.isRequired,
    onRequestClose: PropTypes.func.isRequired,
    settingsAreOpen: PropTypes.bool.isRequired
  }

  render() {
    return (
      <Modal isOpen={this.props.settingsAreOpen}
             onRequestClose={this.props.closeSettings}
             style={settingsStyle(this.props.house)}>

             <h2 className={`h2-${this.props.house} centre`}>Quiz Settings</h2>
             <p className={`p-${this.props.house} centre`}>Modify the quiz settings in this panel.</p>

             <form>
               <div className="row">
                 <div className="field col-md-12">
                   <label className={`label-${this.props.house}`}
                          htmlFor="quizTitle">
                          Quiz name:
                   </label>

                   <input className={`${this.props.house}-input input-settings`}
                          placeholder={this.props.currentSettings.title}
                          htmlName="quizTitle"
                          type="text" />
                 </div>
               </div>

               <div className="row">
                 <div className="field col-md-6">
                   <label className={`label-${this.props.house}`}
                          htmlFor="quizDay">
                          Start day (the day it will be held):
                   </label>

                   <input className={`${this.props.house}-input input-settings`}
                          placeholder="Summer Term Quiz"
                          htmlName="quizDay"
                          type="text" />
                 </div>

                 <div className="field col-md-6">
                   <label className={`label-${this.props.house}`}
                          htmlFor="quizTime">
                          Start time (the time on that day):
                   </label>

                   <input className={`${this.props.house}-input input-settings`}
                          placeholder="Summer Term Quiz"
                          htmlName="quizTime"
                          type="text" />
                 </div>
               </div>

               <div className="row">
                 <div className="field col-md-6">
                   <label className={`label-${this.props.house}`}
                          htmlFor="questionLength">
                          Question length (seconds):
                   </label>

                   <input className={`${this.props.house}-input input-settings`}
                          placeholder="10 seconds"
                          htmlName="questionLength"
                          type="text" />
                 </div>

                 <div className="field col-md-6">
                   <label className={`label-${this.props.house}`}
                          htmlFor="quizBreak">
                          Break length (minutes):
                   </label>

                   <input className={`${this.props.house}-input input-settings`}
                          placeholder="5 minutes"
                          htmlName="quizBreak"
                          type="text" />
                 </div>
               </div>

               <Button clickEvent={this.props.finishQuiz}
                       customClass="settings-button"
                       text="Save changes"
                       house={this.props.house} />
             </form>
      </Modal>
    );
  }
}

export default QuizSettingsPanel;

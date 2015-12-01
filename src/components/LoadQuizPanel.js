import React, { Component, PropTypes } from 'react';
import settingsStyle from 'utils/settingsStyle';
import Modal from 'react-modal';
import Button from 'components/Button';
import moment from 'moment';
import { Notifs, actions as notifActions } from 're-notif';
import 're-notif/lib/re-notif.css';

class QuizSelectPanel extends Component {
  static propTypes = {
    closePanel: PropTypes.func.isRequired,
    colours: PropTypes.object.isRequired,
    deleteQuiz: PropTypes.func.isRequired,
    house: PropTypes.string.isRequired,
    loadQuiz: PropTypes.func.isRequired,
    panelIsOpen: PropTypes.bool.isRequired,
    quizzes: PropTypes.array.isRequired,
    requestingQuizzes: PropTypes.bool.isRequired,
    requestingQuizzesFailed: PropTypes.bool.isRequired
  }

  render() {
    let textColour = this.props.colours.text.primary;

    const notificationThemes = {
      defaultClasses: 'notification',
      successClasses: 'notification-success',
      dangerClasses: 'notification-danger'
    };

    return (
      <div>
        <Modal isOpen={this.props.panelIsOpen}
               closeTimeoutMS={150}
               onRequestClose={this.props.closePanel}
               style={settingsStyle(this.props.house)}>

               <h2 style={textColour} className="centre">Load a Quiz</h2>

               {this.props.requestingQuizzes ? <h3 style={textColour}>Loading quizzes... <i className="fa fa-circle-o-notch fa-spin"></i></h3> :
                this.props.requestingQuizzesFailed ? <h3 style={textColour}>Quizzes couldn't be loaded.</h3> :

                 <div className="quiz-titles">
                   {this.props.quizzes.length ? this.props.quizzes.map(quiz =>
                      <div key={quiz._id}>
                           <h3 style={textColour} className={`p-${this.props.house}`}>{quiz.title}</h3>
                           <p style={textColour} className={`h3-${this.props.house}`}>
                             Scheduled for {moment(quiz.startDate).format('Do MMM YYYY, HH:mm')}
                           </p>
                           <Button colours={this.props.colours.button}
                                   customClass="quiz-title-button"
                                   clickEvent={this.props.loadQuiz.bind(this, quiz._id)}
                                   house={this.props.house}
                                   text="Edit quiz"
                                   icon="pencil" />
                           <Button colours={this.props.colours.button}
                                   customClass="quiz-title-button"
                                   clickEvent={this.props.deleteQuiz.bind(this, quiz._id)}
                                   house={this.props.house}
                                   text="Delete quiz"
                                   icon="trash" />
                      </div>
                   ) : <h3 style={textColour}>No quizzes available!</h3>}
                 </div>
             }
        </Modal>
        <Notifs theme={notificationThemes} />
      </div>
    );
  }
}

export default QuizSelectPanel;

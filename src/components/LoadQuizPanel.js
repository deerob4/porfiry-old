import React, { Component, PropTypes } from 'react';
import settingsStyle from 'utils/settingsStyle';
import Modal from 'react-modal';
import Button from 'components/Button';
import moment from 'moment';

class QuizSelectPanel extends Component {
  static propTypes = {
    closePanel: PropTypes.func.isRequired,
    colours: PropTypes.object.isRequired,
    deleteQuiz: PropTypes.func.isRequired,
    house: PropTypes.string.isRequired,
    loadQuiz: PropTypes.func.isRequired,
    panelIsOpen: PropTypes.bool.isRequired,
    quizzes: PropTypes.array.isRequired
  }

  render() {
    return (
      <Modal isOpen={this.props.panelIsOpen}
             closeTimeoutMS={150}
             onRequestClose={this.props.closePanel}
             style={settingsStyle(this.props.house)}>

             <h2 style={this.props.colours.text.primary} className="centre">Load a Quiz</h2>

             <div className="quiz-titles">
               {this.props.quizzes.length ? this.props.quizzes.map(quiz =>
                  <div key={quiz._id}>
                       <h3 style={this.props.colours.text.primary} className={`p-${this.props.house}`}>{quiz.title}</h3>
                       <p style={this.props.colours.text.primary} className={`h3-${this.props.house}`}>
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
               ) : <h3>No quizzes available!</h3>}
             </div>
      </Modal>
    );
  }
}

export default QuizSelectPanel;

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import QuestionList from 'components/CreateQuiz/QuestionList';
import { Link } from 'react-router';
import * as actions from 'actions/maker';
import Button from 'components/Button';

class CreateQuizContainer extends Component {
  constructor(props) {
    super(props);

    this.addCategory = this.addCategory.bind(this);

    this.state = {};
  }

  addCategory(e) {
    const name = e.target.value;
    this.props.dispatch(actions.addCategory(name));
  }

  editCategory(e) {
    const id = e.target.value.id;
    const name = e.target.value.name;
    this.props.dispatch(actions.editCategory(id, name));
  }

  render() {
    const questions = [
      { id: 1, body: 'Who killed JFK?' },
      { id: 2, body: 'What year did World War 1 end?' },
      { id: 3, body: 'Who played the Eighth Doctor?' },
      { id: 4, body: 'Who wrote War and Peace?' },
      { id: 5, body: 'Who was the English monarch in 1274?' }
    ];

    const style = {
      height: window.innerHeight + 'px',
      width: '100%',
      backgroundColor: this.props.colours.button.backgroundColor
    };

    return (
      <div style={style}>
        <QuestionList colours={this.props.colours.select} questions={questions} />
        <h1>Who killed JFK?</h1>
        <Button text="Add a category" colours={this.props.colours.button} />
        <Button text="Delete a category" colours={this.props.colours.button} />
        <Button text="Add a question" colours={this.props.colours.button} />
        <Button text="Delete a question" colours={this.props.colours.button} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    colours: state.colours,
    user: state.user
  };
}

export default connect(
  mapStateToProps
)(CreateQuizContainer);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import QuestionList from 'components/CreateQuiz/QuestionList';
import { Link } from 'react-router';
import * as actions from 'actions/maker';

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
    return (
      <div>
        <p>Your are in {this.props.user.house} and Year {this.props.user.year}</p>
        <QuestionList colours={this.props.colours.select} questions={[10, 20]} />
        <Link to="/create">Create quiz!</Link>
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

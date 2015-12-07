import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as types from 'constants/actions';
import * as actions from 'actions/PlayQuizActions';

const socket = require('socket.io-client')('http://localhost:5000');

class PlayQuiz extends Component {
  componentDidMount() {
    const dispatch = this.props.dispatch;

    socket.on(types.ADD_PLAYER, (players) =>
      dispatch(actions.addPlayer(players))
    );

    socket.on(types.REMOVE_PLAYER, (socketId) =>
      dispatch(actions.removePlayer(socketId))
    );
  }

  render() {
    const houses = ['acton', 'baxter', 'clive', 'darwin', 'houseman', 'webb'];
    const years = [7, 8, 9, 10, 11];

    return (
      <div>
        <h1>Play Quiz</h1>
        <p>{this.props.currentQuiz.players.length} players are online!</p>
        {houses.map(house =>
          years.map(year =>
            <li>{year} {house}
                {this.props.currentQuiz.players.filter(x =>
                  x.house === house && x.year === year).length}
            </li>
          )
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    quiz: state.quiz,
    colours: state.colours,
    currentQuiz: state.currentQuiz
  };
}

export default connect(
  mapStateToProps
)(PlayQuiz);

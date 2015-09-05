import React, { Component, PropTypes } from 'react';
import { NICE, SUPER_NICE } from './colors';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = { counter: 0 };
    this.resetCounter = this.resetCounter.bind(this);
    this.interval = setInterval(() => this.tick(), 1000);
  }

  tick() {
    this.setState({
      counter: this.state.counter + this.props.increment
    });
  }

  resetCounter() {
    this.setState({
      counter: 0
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
        <h1 style={{ color: this.props.color, fontFamily: 'sans-serif' }}>
          Counter ({this.props.increment}): {this.state.counter}
        </h1>
        <button onClick={this.resetCounter}>Reset</button>
      </div>
    );
  }
}

class Button extends Component {
  constructor(props) {
    super(props);

    this.state = { pressed: false };

    this.showMessage = this.showMessage.bind(this);
  }

  static defaultProps = {
    text: 'Hello world!',
    message: 'Isn\'t it a lovely world?'
  }

  static propTypes = {
    text: PropTypes.string,
    message: PropTypes.string
  }

  showMessage() {
    console.log(this);
    if (!this.state.pressed) {
      alert(this.props.message);
      this.setState({ pressed: true });
    } else {
      alert('Isn\'t it awfully nice to have a dong?');
    }
  }

  render() {
    return <button onClick={this.showMessage}>{this.props.text}</button>;
  }
}

export class App extends Component {
  printMessage(message) {
    console.log(message.target.value);
  }

  render() {
    let buttons = ['Keir', 'Jay', 'Hugo', 'Joe', 'Mike'].map(friend =>
      <Button key={friend} text={friend} />
    );
    return (
      <div>
        <Counter increment={1} color={NICE} />
        <Counter increment={100} color={SUPER_NICE} />
        <Counter increment={500} color={SUPER_NICE} />
        <input onChange={this.printMessage} />
        <br />
        {buttons}
      </div>
    );
  }
}

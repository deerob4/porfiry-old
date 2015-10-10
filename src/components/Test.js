import React, { Component } from 'react';
import { Link } from 'react-router';

class Test extends Component {
  render() {
    return (
      <div>
        <h1>Test!</h1>
        <Link to="/create">create</Link>
      </div>
    );
  }
}

export default Test;

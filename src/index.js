import React from 'react';
import configureStore from 'store/configureStore';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router';
import App from 'containers/App';

const store = configureStore();

React.render(
  <Provider store={store}>
    {() =>
      <Router>
        <Route path="/" component={App}>
          <Route path="/create" component={App} />
          <Route path="/play" component={App} />
        </Route>
      </Router>
    }
  </Provider>,
  document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import configureStore from 'store/configureStore';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import DevTools from 'containers/DevTools';

import LoginContainer from 'containers/LoginContainer';
import PlayQuizContainer from 'containers/PlayQuizContainer';
import CreateQuizContainer from 'containers/CreateQuizContainer';
import ResultsContainer from 'containers/ResultsContainer';

import '../node_modules/animate.css/animate.min.css';
import '!style!css!sass!styles/porfiry.scss';

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Router history={history}>
        <Route path="/" component={LoginContainer} />
        <Route path="create" component={CreateQuizContainer} />
        <Route path="play" component={PlayQuizContainer} />
        <Route path="results" component={ResultsContainer} />
      </Router>
    </div>
  </Provider>,
  document.getElementById('root')
);
      // <DevTools />

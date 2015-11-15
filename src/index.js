import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import configureStore from 'store/configureStore';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';

import LoginContainer from 'containers/LoginContainer';
import PlayQuizContainer from 'containers/PlayQuizContainer';
import CreateQuizContainer from 'containers/CreateQuizContainer';

import '../node_modules/animate.css/animate.min.css';
import '!style!css!sass!styles/porfiry.scss';

const store = configureStore();
const history = createBrowserHistory();

ReactDOM.render(
  <div>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={LoginContainer} />
        <Route path="create" component={CreateQuizContainer} />
        <Route path="play" component={PlayQuizContainer} />
      </Router>
    </Provider>
  </div>,
  document.getElementById('root')
);
  // <DebugPanel top={true} right={true} bottom={true}>
  //       <DevTools store={store} monitor={LogMonitor} />
  //     </DebugPanel>

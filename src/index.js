import React from 'react';
import configureStore from 'store/configureStore';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import Login from 'containers/Login';
import PlayQuiz from 'containers/PlayQuiz';

const store = configureStore();
const history = createBrowserHistory();

React.render(
  <div>
    <Provider store={store}>
      {() =>
        <Router history={history}>
          <Route path="/" component={Login}>
            <Route path="create" component={Login} />
            <Route path="play" component={PlayQuiz} />
          </Route>
        </Router>
      }
    </Provider>
    <DebugPanel top right bottom>
      <DevTools store={store} monitor={LogMonitor} />
    </DebugPanel>
  </div>,
  document.getElementById('root')
);

import React from 'react';
import configureStore from 'store/configureStore';
import createBrowserHistory from 'history/lib/createBrowserHistory';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router';
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react';
import LoginContainer from 'containers/LoginContainer';
import PlayQuiz from 'containers/PlayQuiz';

import '../node_modules/animate.css/animate.min.css';

const store = configureStore();
const history = createBrowserHistory();

React.render(
  <div>
    <Provider store={store}>
      {() =>
        <Router history={history}>
          <Route path="/" component={LoginContainer}>
            <Route path="create" component={LoginContainer} />
            <Route path="play" component={PlayQuiz} />
          </Route>
        </Router>
      }
    </Provider>
  </div>,
  document.getElementById('root')
);

// <DebugPanel top right bottom>
//       <DevTools store={store} monitor={LogMonitor} />
//     </DebugPanel>

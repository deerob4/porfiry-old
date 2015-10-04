import { createStore, compose } from 'redux';
import { devTools } from 'redux-devtools';
import rootReducer from '../reducers';

function configureStore() {
  const store = compose(
    // To apply middleware later on, do:
    // applyMiddleware(m1, m2, m3)
    // reduxReactRouter({ createHistory }),
    devTools()
  )(createStore)(rootReducer);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default configureStore;

import { applyMiddleware, createStore, compose } from 'redux';
import DevTools from 'containers/DevTools';
import rootReducer from '../reducers';
import thunk from 'redux-thunk';

function configureStore() {
  const store = compose(
    applyMiddleware(thunk),
    DevTools.instrument()
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

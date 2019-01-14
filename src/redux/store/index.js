import { applyMiddleware, compose, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistCombineReducers, persistStore } from 'redux-persist';
import reduxThunk from 'redux-thunk';

import { IN_DEV_MODE } from 'src/constants';
import { auth, meta, serviceApi, shared } from 'src/redux/reducers';

// Locals
import buildAxiosMiddleware from './buildAxiosMiddleware';
import buildPersistorConfigs from './buildPersistorConfigs';

const composeEnhancer = IN_DEV_MODE ? composeWithDevTools({}) : compose;

export default function makeStore(/* initialState, options */) {
  const configs = buildPersistorConfigs();

  const store = createStore(
    persistCombineReducers(configs, { auth, meta, serviceApi, shared }),
    composeEnhancer(applyMiddleware(buildAxiosMiddleware(), reduxThunk)),
  );

  persistStore(store);
  return store;
}

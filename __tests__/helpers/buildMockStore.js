import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

import buildAxiosMiddleware from 'src/redux/store/buildAxiosMiddleware';

// Locals
import buildMockState from './buildMockState';

export default function buildMockStore(configs) {
  const mockState = buildMockState(configs);
  const createMockStore = configureMockStore([thunkMiddleware, buildAxiosMiddleware()]);
  return createMockStore(mockState);
}

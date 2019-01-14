import _ from 'lodash';

// Helpers
import { buildErrorAction, buildSuccessAction, mockAxios } from '__tests__/helpers/mockApiRequests';
import buildMockStore from '__tests__/helpers/buildMockStore';

// Models
import User from 'src/models/User';

// Redux
import { serviceApi } from 'src/redux/actions';

describe('redux/actions/serviceApi/authWithEmail', () => {
  const store = buildMockStore({ authorized: true });

  const email = 'salesman@onaclover.com';
  const password = '12345678';
  const url = '/users/login';
  const mockResponse = require('__tests__/fixtures/api/users_login.json');
  const mockUser = User.build(require('src/data/fixtures/user.json'));

  const requestAction = {
    type: 'serviceApi/AUTH_WITH_EMAIL',
    payload: {
      dataKey: 'emailAuth',
      manifest: { klass: 'User' },
      request: {
        url,
        data: { email, password },
        method: 'post',
      },
    },
  };
  const successAction = buildSuccessAction(requestAction, mockUser);
  const { errorAction, mockErrorResponse } = buildErrorAction(requestAction);

  /* eslint-disable newline-per-chained-call */
  mockAxios
    .onPost(url).replyOnce(200, mockResponse)
    .onPost(url).replyOnce(...mockErrorResponse);
  /* eslint-enable newline-per-chained-call */

  beforeEach(() => store.clearActions());

  test('success', async () => {
    await store.dispatch(serviceApi.authWithEmail({ email, password }));
    const actions = store.getActions();
    expect(actions.length).toEqual(2);
    expect(actions).toEqual([requestAction, successAction]);
    expect(actions).toMatchSnapshot();

    const { payload: { data } } = _.last(actions);
    expect(data).toBeInstanceOf(User);
  });
  
  test('error', async () => {
    await store.dispatch(serviceApi.authWithEmail({ email, password }));
    const actions = store.getActions();
    expect(actions.length).toEqual(2);
    expect(actions).toEqual([requestAction, errorAction]);
    expect(actions).toMatchSnapshot();
  });
});

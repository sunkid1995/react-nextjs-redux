import _ from 'lodash';

// Helpers
import { buildErrorAction, buildSuccessAction, mockAxios } from '__tests__/helpers/mockApiRequests';
import buildMockStore from '__tests__/helpers/buildMockStore';

// Redux
import { serviceApi } from 'src/redux/actions';

describe('redux/actions/serviceApi/forgotPassword', () => {
  const store = buildMockStore({ authorized: true });

  const email = 'salesman@onaclover.com';
  const url = '/users/password';

  const requestAction = {
    type: 'serviceApi/FORGOT_PASSWORD',
    payload: {
      dataKey: 'passwordForgotten',
      manifest: { reserved: true },
      request: {
        url,
        data: { email },
        method: 'post',
      },
    },
  };
  const successAction = buildSuccessAction(requestAction, {});
  const { errorAction, mockErrorResponse } = buildErrorAction(requestAction);

  /* eslint-disable newline-per-chained-call */
  mockAxios
    .onPost(url).replyOnce(200, {})
    .onPost(url).replyOnce(...mockErrorResponse);
  /* eslint-enable newline-per-chained-call */

  beforeEach(() => store.clearActions());

  test('success', async () => {
    await store.dispatch(serviceApi.forgotPassword(email));
    const actions = store.getActions();
    expect(actions.length).toEqual(2);
    expect(actions).toEqual([requestAction, successAction]);
    expect(actions).toMatchSnapshot();

    const { payload: { data } } = _.last(actions);
    expect(data).toEqual({});
  });

  test('error', async () => {
    await store.dispatch(serviceApi.forgotPassword(email));
    const actions = store.getActions();
    expect(actions.length).toEqual(2);
    expect(actions).toEqual([requestAction, errorAction]);
    expect(actions).toMatchSnapshot();
  });
});

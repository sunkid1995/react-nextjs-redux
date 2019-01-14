import _ from 'lodash';

// Helpers
import { buildErrorAction, buildSuccessAction, mockAxios } from '__tests__/helpers/mockApiRequests';
import buildMockStore from '__tests__/helpers/buildMockStore';

// Redux
import { serviceApi } from 'src/redux/actions';

describe('redux/actions/serviceApi/resetPassword', () => {
  const store = buildMockStore({ authorized: true });

  const token = 'reset_password_token_xxx';
  const password = '12345678';
  const passwordConfirm = password;
  const url = '/users/password';

  const requestAction = {
    type: 'serviceApi/RESET_PASSWORD',
    payload: {
      dataKey: 'passwordReset',
      manifest: { reserved: true },
      request: {
        url,
        data: {
          password,
          reset_password_token: token,
          password_confirmation: passwordConfirm,
        },
        method: 'patch',
      },
    },
  };
  const successAction = buildSuccessAction(requestAction, {});
  const { errorAction, mockErrorResponse } = buildErrorAction(requestAction);

  /* eslint-disable newline-per-chained-call */
  mockAxios
    .onPatch(url).replyOnce(200, {})
    .onPatch(url).replyOnce(...mockErrorResponse);
  /* eslint-enable newline-per-chained-call */

  beforeEach(() => store.clearActions());

  test('success', async () => {
    await store.dispatch(serviceApi.resetPassword({ password, passwordConfirm, token }));
    const actions = store.getActions();
    expect(actions.length).toEqual(2);
    expect(actions).toEqual([requestAction, successAction]);
    expect(actions).toMatchSnapshot();

    const { payload: { data } } = _.last(actions);
    expect(data).toEqual({});
  });

  test('error', async () => {
    await store.dispatch(serviceApi.resetPassword({ password, passwordConfirm, token }));
    const actions = store.getActions();
    expect(actions.length).toEqual(2);
    expect(actions).toEqual([requestAction, errorAction]);
    expect(actions).toMatchSnapshot();
  });
});

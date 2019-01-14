import { serviceApi } from 'src/redux/reducers';
import { SERVICE_API } from 'src/redux/types';

// Helpers
import buildMockState from '__tests__/helpers/buildMockState';
import { plainDataRequest } from '__tests__/helpers/buildMockState/serviceApi';
import { buildErrorAction, buildSuccessAction } from '__tests__/helpers/mockApiRequests';

// Models
import User from 'src/models/User';

describe('redux/reducers/serviceApi/emailAuth', () => {
  const { serviceApi: mockState } = buildMockState();
  const mockData = User.build(require('src/data/fixtures/user.json'));

  const requestAction = { type: SERVICE_API.AUTH_WITH_EMAIL, payload: { dataKey: 'emailAuth' } };
  const successAction = buildSuccessAction(requestAction, mockData);
  const { errorAction } = buildErrorAction(requestAction, { noResponse: true });

  test('start', () => {
    const expectedState = {
      ...mockState,
      emailAuth: { ...plainDataRequest, loading: true },
    };

    const reduced = serviceApi(mockState, requestAction);
    expect(reduced).toEqual(expectedState);
    expect(reduced).toMatchSnapshot();
  });

  test('success', () => {
    const expectedState = {
      ...mockState,
      emailAuth: { ...plainDataRequest, data: mockData },
    };

    const reduced = serviceApi(mockState, successAction);
    expect(reduced).toEqual(expectedState);
    expect(reduced).toMatchSnapshot();
  });

  test('error', () => {
    const expectedState = {
      ...mockState,
      emailAuth: {
        ...plainDataRequest,
        error: { message: `${SERVICE_API.AUTH_WITH_EMAIL} request failed` },
      },
    };

    const reduced = serviceApi(mockState, errorAction);
    expect(reduced).toEqual(expectedState);
    expect(reduced).toMatchSnapshot();
  });

  test('refresh', () => {
    const currentState = {
      ...mockState,
      emailAuth: { ...plainDataRequest, data: mockData },
    };

    const expectedState = {
      ...mockState,
      emailAuth: { ...plainDataRequest, data: mockData, loading: true },
    };

    const reduced = serviceApi(currentState, requestAction);
    expect(reduced).toEqual(expectedState);
    expect(reduced).toMatchSnapshot();
  });
});

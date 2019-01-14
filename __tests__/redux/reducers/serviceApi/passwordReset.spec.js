import { serviceApi } from 'src/redux/reducers';
import { SERVICE_API } from 'src/redux/types';

// Helpers
import buildMockState from '__tests__/helpers/buildMockState';
import { plainDataRequest } from '__tests__/helpers/buildMockState/serviceApi';
import { buildErrorAction, buildSuccessAction } from '__tests__/helpers/mockApiRequests';

describe('redux/reducers/serviceApi/passwordReset', () => {
  const { serviceApi: mockState } = buildMockState();
  const mockData = {};

  const requestAction = { type: SERVICE_API.RESET_PASSWORD, payload: { dataKey: 'passwordReset' } };
  const successAction = buildSuccessAction(requestAction, mockData);
  const { errorAction } = buildErrorAction(requestAction, { noResponse: true });

  test('start', () => {
    const expectedState = {
      ...mockState,
      passwordReset: { ...plainDataRequest, loading: true },
    };

    const reduced = serviceApi(mockState, requestAction);
    expect(reduced).toEqual(expectedState);
    expect(reduced).toMatchSnapshot();
  });

  test('success', () => {
    const expectedState = {
      ...mockState,
      passwordReset: { ...plainDataRequest, data: mockData },
    };

    const reduced = serviceApi(mockState, successAction);
    expect(reduced).toEqual(expectedState);
    expect(reduced).toMatchSnapshot();
  });

  test('error', () => {
    const expectedState = {
      ...mockState,
      passwordReset: {
        ...plainDataRequest,
        error: { message: `${SERVICE_API.RESET_PASSWORD} request failed` },
      },
    };

    const reduced = serviceApi(mockState, errorAction);
    expect(reduced).toEqual(expectedState);
    expect(reduced).toMatchSnapshot();
  });

  test('refresh', () => {
    const currentState = {
      ...mockState,
      passwordReset: { ...plainDataRequest, data: mockData },
    };

    const expectedState = {
      ...mockState,
      passwordReset: { ...plainDataRequest, data: mockData, loading: true },
    };

    const reduced = serviceApi(currentState, requestAction);
    expect(reduced).toEqual(expectedState);
    expect(reduced).toMatchSnapshot();
  });
});

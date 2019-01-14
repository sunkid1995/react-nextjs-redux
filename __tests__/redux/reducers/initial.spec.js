import { auth, meta, serviceApi } from 'src/redux/reducers';

// Helpers
import buildMockState from '__tests__/helpers/buildMockState';

describe('redux/reducers/initial', () => {
  const mockState = buildMockState();

  test('auth', () => {
    const { auth: expectedState } = mockState;

    expect(auth(undefined, { type: 'DUMMY_TYPE' })).toEqual(expectedState);
    expect(auth(undefined, { type: 'DUMMY_TYPE' })).toMatchSnapshot();
  });

  test('meta', () => {
    const { meta: expectedState } = mockState;

    expect(meta(undefined, { type: 'DUMMY_TYPE' })).toEqual(expectedState);
    expect(meta(undefined, { type: 'DUMMY_TYPE' })).toMatchSnapshot();
  });

  test('serviceApi', () => {
    const { serviceApi: expectedState } = mockState;

    expect(serviceApi(undefined, { type: 'DUMMY_TYPE' })).toEqual(expectedState);
    expect(serviceApi(undefined, { type: 'DUMMY_TYPE' })).toMatchSnapshot();
  });
});

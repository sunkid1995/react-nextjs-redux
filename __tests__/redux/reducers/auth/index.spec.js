import { auth as authActions } from 'src/redux/actions';
import { auth as authReducer } from 'src/redux/reducers';

// Helpers
import buildMockState from '__tests__/helpers/buildMockState';

// Models
import User from 'src/models/User';

describe('redux/reducers/auth', () => {
  const { auth: mockState } = buildMockState();
  const user = User.build(require('src/data/fixtures/user.json'));

  test('authorize', () => {
    const expectedState = { ...mockState, user };
    const state = authReducer(mockState, authActions.authorize(user));
    expect(state).toEqual(expectedState);
    expect(state).toMatchSnapshot();
  });

  test('deauthorize', () => {
    const currentState = { ...mockState, user };
    const state = authReducer(currentState, authActions.deauthorize());
    expect(state).toEqual(mockState);
    expect(state).toMatchSnapshot();
  });
});

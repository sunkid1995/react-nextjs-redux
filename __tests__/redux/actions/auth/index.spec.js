import { auth } from 'src/redux/actions';

// Models
import User from 'src/models/User';

describe('redux/actions/auth', () => {
  const user = User.build(require('src/data/fixtures/user.json'));

  test('authorize', () => {
    expect(auth.authorize(user)).toEqual({ type: 'auth/AUTHORIZE', payload: user });
    expect(auth.authorize(user)).toMatchSnapshot();
  });

  test('deauthorize', () => {
    expect(auth.deauthorize()).toEqual({ type: 'auth/DEAUTHORIZE' });
    expect(auth.deauthorize()).toMatchSnapshot();
  });
});

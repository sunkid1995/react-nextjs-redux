// Redux
import { AUTH } from 'src/redux/types';

const INITIAL_STATE = {
  user: undefined,
};

export default function authReducer(state = INITIAL_STATE, action) {
  const { type } = action;

  if (type === AUTH.AUTHORIZE) {
    const { payload: user } = action;
    return { ...state, user };
  }

  if (type === AUTH.DEAUTHORIZE) {
    return INITIAL_STATE;
  }

  return state;
}

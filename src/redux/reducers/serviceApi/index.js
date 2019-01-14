import _ from 'lodash';

// Constants
import { AUTH, SERVICE_API } from 'src/redux/types';

// Locals
// import blankRequestReducer from './blankRequestReducer';
// import paginatedRequestReducer from './paginatedRequestReducer';
import plainRequestReducer from './plainRequestReducer';

const INITIAL_BLANK_REQUEST = { error: undefined, loading: false };
// const INITIAL_PAGINATED_DATA_REQUEST = { dataPages: {}, totalPages: 1, ...INITIAL_BLANK_REQUEST };
const INITIAL_PLAIN_DATA_REQUEST = { data: {}, ...INITIAL_BLANK_REQUEST };

const INITIAL_STATE = {
  emailAuth: INITIAL_PLAIN_DATA_REQUEST,
  passwordForgotten: INITIAL_PLAIN_DATA_REQUEST,
  passwordReset: INITIAL_PLAIN_DATA_REQUEST,
};

export default function serviceApiReducer(state = INITIAL_STATE, action) {
  const { type } = action;

  if (type === AUTH.DEAUTHORIZE) return INITIAL_STATE;

  if (
    _.startsWith(type, SERVICE_API.AUTH_WITH_EMAIL) ||
    _.startsWith(type, SERVICE_API.FORGOT_PASSWORD) ||
    _.startsWith(type, SERVICE_API.RESET_PASSWORD)
  ) return plainRequestReducer(state, action);

  return state;
}

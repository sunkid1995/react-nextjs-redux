import { createAction } from 'redux-actions';

// Redux
import { AUTH } from 'src/redux/types';

export const authorize = createAction(AUTH.AUTHORIZE);
export const deauthorize = createAction(AUTH.DEAUTHORIZE);

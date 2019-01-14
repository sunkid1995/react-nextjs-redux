import _ from 'lodash';

// Constants
import { AXIOS_REQUEST_SUFFIXES } from 'src/constants';

const { ERROR, SUCCESS } = AXIOS_REQUEST_SUFFIXES;

export default function blankRequestReducer(state, action) {
  const { type } = action;

  if (_.endsWith(type, ERROR)) {
    const { error, meta: { previousAction } } = action;
    const { payload: { dataKey } } = previousAction;
    return { ...state, [dataKey]: { error, loading: false } };
  }

  if (_.endsWith(type, SUCCESS)) {
    const { meta: { previousAction } } = action;
    const { payload: { dataKey } } = previousAction;
    return { ...state, [dataKey]: { error: undefined, loading: false } };
  }

  const { payload: { dataKey } } = action;
  if (dataKey == null) return state;
  return { ...state, [dataKey]: { error: undefined, loading: true } };
}

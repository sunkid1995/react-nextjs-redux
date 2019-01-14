import _ from 'lodash';

// Constants
import { AXIOS_REQUEST_SUFFIXES } from 'src/constants';

const { ERROR, SUCCESS } = AXIOS_REQUEST_SUFFIXES;

export default function plainRequestReducer(state, action) {
  const { type } = action;

  if (_.endsWith(type, ERROR)) {
    const { error, meta: { previousAction } } = action;
    const { payload: { dataKey } } = previousAction;
    const { [dataKey]: bundle } = state;
    return { ...state, [dataKey]: { ...bundle, error, loading: false } };
  }

  if (_.endsWith(type, SUCCESS)) {
    const { meta: { previousAction }, payload: { data } } = action;
    const { payload: { dataKey } } = previousAction;
    const { [dataKey]: bundle } = state;
    return { ...state, [dataKey]: { ...bundle, data, loading: false } };
  }

  const { payload: { dataKey } } = action;
  if (dataKey == null) return state;
  const { [dataKey]: bundle } = state;
  return { ...state, [dataKey]: { ...bundle, error: undefined, loading: true } };
}

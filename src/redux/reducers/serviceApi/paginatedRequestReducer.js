import _ from 'lodash';

// Constants
import { AXIOS_REQUEST_SUFFIXES } from 'src/constants';

const { ERROR, SUCCESS } = AXIOS_REQUEST_SUFFIXES;

export default function paginatedRequestReducer(state, action) {
  const { type } = action;

  if (_.endsWith(type, ERROR)) {
    const { meta: { previousAction }, error } = action;
    const { payload: { dataKey } } = previousAction;
    const { [dataKey]: bundle } = state;
    return { ...state, [dataKey]: { ...bundle, error, loading: false } };
  }

  if (_.endsWith(type, SUCCESS)) {
    // Extract data from action & previous action's meta
    const { meta: { previousAction }, payload: { data, totalPages } } = action;
    const { payload: { dataKey, page = 0 } } = previousAction;

    // Current data
    const { [dataKey]: bundle } = state;
    const { dataPages } = bundle;

    return {
      ...state,
      [dataKey]: {
        ...bundle,
        totalPages,
        dataPages: { ...dataPages, [page]: data },
        loading: false,
      },
    };
  }

  // Reset dataKey's error & loading state on request start
  const { payload: { dataKey = null } = {} } = action;
  if (dataKey == null) return state;

  const { [dataKey]: bundle } = state;
  return { ...state, [dataKey]: { ...bundle, error: undefined, loading: true } };
}

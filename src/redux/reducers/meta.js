import { REHYDRATE } from 'redux-persist/lib/constants';

const INITIAL_STATE = {
  rehydrated: false,
};

export default function metaReducer(state = INITIAL_STATE, action) {
  const { type } = action;

  if (type === REHYDRATE) {
    const { err } = action;

    /**
     * On server-side, REHYDRATE action will throw an err:
     * Error: No available storage method found
     * Otherwise on client-side, REHYDRATE will be dispatched without error
     * So we check if err is nullable then it's actually rehydrated in client
     */
    if (err == null) return { ...state, rehydrated: true };
  }

  return state;
}

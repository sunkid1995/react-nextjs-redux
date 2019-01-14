import localForage from 'localforage';
import { createTransform } from 'redux-persist';

// Constants
import { DEBUGS, IN_DEV_MODE } from 'src/constants';

// Models
import User from 'src/models/User';

const {
  reduxPersistVersion,
} = require('src/data/configs.json');

function buildUser(rawUser) {
  if (DEBUGS.UNAUTHORIZED) return undefined;

  if (DEBUGS.FAKE_AUTH) {
    const fixtureUser = require('src/data/fixtures/user.json');
    return User.build(fixtureUser);
  }

  return User.build(rawUser) || undefined;
}

// Persist to local storage
function inboundTransform(partialState/* , key */) {
  return partialState;
}

// Rehydrate from local storage
function outboundTransform(partialState, key) {
  if (partialState == null) return undefined;

  if (key === 'auth') {
    const { user: rawUser } = partialState;
    const user = buildUser(rawUser);
    return { ...partialState, user };
  }

  return partialState;
}

export default function buildPersistorConfigs() {
  return {
    debug: IN_DEV_MODE,
    key: 'wefit_crm_v2',
    storage: localForage,
    transforms: [createTransform(inboundTransform, outboundTransform)],
    version: reduxPersistVersion,
    whitelist: ['auth', 'meta'],
  };
}

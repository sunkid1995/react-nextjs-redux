import User from 'src/models/User';

// Locals
import serviceApi from './serviceApi';

export default function buildMockState({ authorized = false } = {}) {
  const auth = {
    user: authorized
      ? User.build(require('src/data/fixtures/user.json'))
      : undefined,
  };

  const meta = { rehydrated: false };

  const _persist = {
    rehydrated: true,
    version: 1,
  };

  return { auth, meta, serviceApi, _persist };
}

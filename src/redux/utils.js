import _ from 'lodash';

import { IN_DEV_MODE } from 'src/constants';

export function buildErrorMessage(errors) {
  if (_.isEmpty(errors)) return null;

  const transformer = ({ code, message }) => (
    IN_DEV_MODE && code != null ? `${code} - ${message}` : message
  );
  return _.compact(_.map(errors, transformer)).join(', ');
}

export function buildHeaders(state) {
  const { auth: { user: { auth_token: token } = {} } } = state;
  const bearerToken = token != null ? `Bearer ${token}` : undefined;

  return {
    Accept: 'application/json',
    Authorization: bearerToken,
  };
}

export function responseInterceptor(response, callback) {
  if (response == null) return;
  return callback(response);
}

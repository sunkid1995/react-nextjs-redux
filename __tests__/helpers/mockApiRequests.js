import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

// Constants
import { AXIOS_REQUEST_SUFFIXES } from 'src/constants';

const { ERROR, SUCCESS } = AXIOS_REQUEST_SUFFIXES;

export const mockAxios = new MockAdapter(axios);

export function buildMockHeaders() {
  const { auth_token: token } = require('src/data/fixtures/user.json');

  return {
    Accept: 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

export function buildErrorAction(previousAction, opts) {
  const { noResponse = false } = opts || {};

  const { type } = previousAction;
  const message = `${type} request failed`;
  const status = 500;

  const mockResponse = { errors: [{ message }] };
  const mockErrorResponse = [status, mockResponse];

  const response = noResponse ? undefined : { status, data: mockResponse };

  const errorAction = {
    error: { message, response },
    meta: { previousAction },
    type: type + ERROR,
  };

  return { errorAction, mockErrorResponse };
}

export function buildSuccessAction(previousAction, data, extra = {}) {
  const { type } = previousAction;

  return {
    meta: { previousAction },
    payload: { data, ...extra },
    type: type + SUCCESS,
  };
}

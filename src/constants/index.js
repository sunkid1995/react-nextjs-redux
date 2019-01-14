const { env } = require('src/data/configs.json');

export const IN_DEV_MODE = process.env.NODE_ENV !== 'production' && env !== 'staging';

export const API_CONFIGS = {
  PAGINATION: 10,
  REQUEST_METHODS: {
    DELETE: 'del',
    GET: 'get',
    PATCH: 'patch',
    POST: 'post',
    PUT: 'put',
  },
  RESPONSE_STATUSES: {
    BAD_GATEWAY: 502,
    BAD_REQUEST: 400,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
    NOT_FOUND: 404,
    SERVICE_UNAVAILABLE: 503,
    SUCCESS: 200,
    UNAUTHORIZED: 401,
    UNPROCESSABLE_ENTITY: 422,
  },
};

export const AXIOS_REQUEST_SUFFIXES = { ERROR: ':ERROR', SUCCESS: ':SUCCESS' };

export const DEBUGS = !IN_DEV_MODE ? {} : {
  UNAUTHORIZED: false,
};

export const FORMATSDATE = {
  DATE: 'DD/MM/YYYY',
  DATE_TIME: 'DD/MM/YYYY HH:mm',
  ISO_8601: 'YYYY-MM-DDTHH:mm:ss.SSSZ',
  TIME: 'HH:mm',
};

export const FORMAT = {
  EMAIL: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/g,
  PHONE: /^0(1\d{9}|9\d{8})$/,
};

export const FORMAT_NUMBER = {
  CURRENCY_FULL: '0,0 $',
  CURRENCY_NUMBER: '0,0',
  NUMBER: '0',
};

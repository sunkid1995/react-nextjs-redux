import axios from 'axios';
import _ from 'lodash';
import axiosMiddleware from 'redux-axios-middleware';

// Actions
import { auth } from 'src/redux/actions';

// Constants
import { API_CONFIGS, AXIOS_REQUEST_SUFFIXES } from 'src/constants';

// Models
import ModelFactory from 'src/models/ModelFactory';

// Utils
import { buildErrorMessage } from 'src/redux/utils';

const { baseUri } = require('src/data/configs.json');
const { RESPONSE_STATUSES } = API_CONFIGS;
const { ERROR, SUCCESS } = AXIOS_REQUEST_SUFFIXES;

export default function buildAxiosMiddleware() {
  const axiosClient = axios.create({
    baseURL: baseUri,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    responseType: 'json',
  });

  return axiosMiddleware(axiosClient, {
    errorSuffix: ERROR,
    interceptors: {
      response: [{
        error: (config, request) => {
          const { dispatch } = config;
          const { response: { data, status = 500 } = {} } = request;

          // 401 - unauthorized
          if (status === RESPONSE_STATUSES.UNAUTHORIZED)
            dispatch(auth.deauthorize());

          const message = buildErrorMessage((data || {}).errors) || request.message;
          return Promise.reject({ message, response: { data, status } });
        },
        success: (__, { config, data: response }) => {
          const { reduxSourceAction: { payload: { manifest } } } = config;
          if (_.isEmpty(response)) return { data: {} };

          const { data: nestedData, info } = response;
          const rawData = info == null ? response : nestedData;

          const data = ModelFactory.create(rawData, manifest);
          if (manifest == null || !manifest.paginated) return { data };

          const { total_pages: totalPages = 0 } = info || {};
          return { data, totalPages };
        },
      }],
    },
    successSuffix: SUCCESS,
  });
}

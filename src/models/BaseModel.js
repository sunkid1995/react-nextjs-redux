import Joi from 'joi-browser';
import _ from 'lodash';

function normalizedData(validatorList, data) {
  if (_.isEmpty(data)) {
    return {
      error: Error('Model constructed with empty data'),
      normalized: {},
    };
  }

  const attributes = Object.keys(validatorList);
  const validator = Joi.object().keys(validatorList);

  const filteredData = _.pick(data, attributes);
  const { error, value } = Joi.validate(filteredData, validator);

  const normalized = error != null ? filteredData : value;
  return { error, normalized };
}

/* eslint-disable dot-notation, newline-per-chained-call */
const BOOLEAN = Joi.boolean().empty(['', null]).default(false);
const DATE = Joi.date().empty(['', null]);
const FLOAT = Joi.number().empty(['', null]).default(0);
const INTEGER = Joi.number().integer().default(0);
const OBJECT = Joi.object().empty([{}, null]);
const STRING = Joi.string().empty(['', null]);

export const COMMON_SCHEMAS = {
  BOOLEAN, DATE, FLOAT, INTEGER, OBJECT, STRING,
  ID: INTEGER.min(0).required(),
  INTEGERS_ARRAY: Joi.array().items(INTEGER).empty([null]).default([]),
  OBJECTS_ARRAY: Joi.array().items(OBJECT).empty([null]).default([]),
  STRINGS_ARRAY: Joi.array().items(STRING).empty([null]).default([]),
  STRING_ID: STRING.required(),
};
/* eslint-enable dot-notation, newline-per-chained-call */

export default class BaseModel {
  static dataValidator() {
    // Raise error if this method is absent from descendant class
    throw new Error('[BaseModel]: dataValidator() function must be provided');
  }

  static build(data) {
    const { error, normalized } = normalizedData(this.dataValidator(), data);

    if (_.isEmpty(normalized)) {
      /* console.warn(error.message); */
      return null;
    }

    if (error != null) {
      console.warn('Validation failed for model with error & value:', error, data);
      return null;
    }

    return new this(normalized);
  }

  static buildArray(dataArr) {
    if (_.isEmpty(dataArr)) return [];

    const models = _.map(dataArr, data => this.build(data));
    return _.compact(models);
  }

  constructor(data) {
    Object.assign(this, data);
  }
}

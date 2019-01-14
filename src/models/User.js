import Joi from 'joi-browser';
import _ from 'lodash';

// Models
import BaseModel, { COMMON_SCHEMAS } from './BaseModel';

const { ID, STRING, STRINGS_ARRAY } = COMMON_SCHEMAS;

const ROLES = {
  MANAGER: 'sales_manager',
  STAFF: 'sales_man',
  USER: 'User',
};

const { MANAGER, STAFF } = ROLES;

export default class User extends BaseModel {
  static get klass() { return 'User'; }
  
  static dataValidator(): Joi.SchemaMap {
    return {
      auth_token: STRING.required(),
      display_name: STRING.required(),
      email: STRING.required(),
      id: ID,
      nickname: STRING.required(),
      picture: STRING,
      roles: STRINGS_ARRAY,
    };
  }

  get isManager() { return _.includes(this.roles, MANAGER); }
  get isStaff() { return _.includes(this.roles, STAFF) && !_.includes(this.roles, MANAGER); }
}

import BaseModel, { COMMON_SCHEMAS } from './BaseModel';

const { ID, STRING } = COMMON_SCHEMAS;

export default class ListStaff extends BaseModel {
  static dataValidator() {
    return {
      id: ID,
      display_name: STRING,
      email: STRING,
      nickname: STRING,
    };
  }
}

import BaseModel, { COMMON_SCHEMAS } from './BaseModel';

const { ID, STRING, INTEGER } = COMMON_SCHEMAS;

export default class MemberShip extends BaseModel {
  static dataValidator() {
    return {
      id: ID,
      name: STRING,
      price: INTEGER,
    };
  }
}

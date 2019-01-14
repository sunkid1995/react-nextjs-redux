import BaseModel, { COMMON_SCHEMAS } from './BaseModel';

const { ID, STRING, OBJECT } = COMMON_SCHEMAS;

export default class ReportLeads extends BaseModel {
  static dataValidator() {
    return {
      id: ID,
      nickname: STRING,
      reports: OBJECT,
    };
  }
}


import BaseModel, { COMMON_SCHEMAS } from './BaseModel';

const { ID, STRING, DATE, OBJECT } = COMMON_SCHEMAS;

export default class ListContacts extends BaseModel {
  static dataValidator() {
    return {
      id: ID,
      full_name: STRING,
      phone: STRING,
      email: STRING,
      current_level_date: DATE,
      current_level: STRING,
      channel: STRING,
      contact_type: STRING,
      city: OBJECT,
      draft: STRING,
      latest_support_date: DATE,
      current_priority: STRING,
      utm_source: STRING,
      district: OBJECT,
      current_deadline: DATE,
    };
  }
}

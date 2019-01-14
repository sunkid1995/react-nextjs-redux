import _ from 'lodash';
import { FORMAT } from 'src/constants';

export function validateInputs(dataValidate) {
  const { fullName, email, phone } = dataValidate;

  if (_.isEmpty(fullName) || fullName == null) return 'Tên không được để trống!';

  if (_.isEmpty(phone) && phone === '') return 'Số điện thoại không được để trống!';
  if (FORMAT.PHONE.test(phone) === false) return 'Số điện thoại không hợp lệ!';
  if (email != null) {
    if (FORMAT.EMAIL.test(email) === false) return 'Email không hợp lệ!';
  } else return '';
}

export function validatePicker(dataValidatePicker) {
  const { currentLevel, deadline, note } = dataValidatePicker;
  if (_.isEmpty(currentLevel) || currentLevel == null) return 'Bạn chưa chọn level cuộc gọi!';
  if (_.isEmpty(deadline) || deadline === null) return 'Bạn chưa chọn thời gian gọi lại!';
  if (_.isEmpty(note) || note == null) return 'Hãy nhập ghi chú!';
  else return '';
}


import React from 'react';
import propTypes from 'prop-types';

// datepicker
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// css
import css from 'styled-jsx/css';

// format
import { FORMATSDATE } from 'src/constants/index';

// Components
import SvgIcon from 'src/components/Commons/SvgIcon';


export default class DatePickers extends React.Component {
  static propTypes = {
    disabled: propTypes.bool.isRequired,
    onSelect: propTypes.func.isRequired,
    placeholder: propTypes.string.isRequired,
    selectTime: propTypes.bool.isRequired,
    selectedDate: propTypes.any.isRequired,
  };
  static defaultProps = {
    disabled: false,
    selectTime: false,
  }
  renderCustomInput = () => {
    const { selectTime, selectedDate, placeholder } = this.props;
    const dateFormat = selectTime ? FORMATSDATE.DATE_TIME : FORMATSDATE.DATE;
    return (
      <button
        style={{
          alignItems: 'center',
          display: 'inline-flex',
          fontSize: 16,
          fontWeight: 300,
          justifyContent: 'space-between',
          maxWidth: 200,
          paddingRight: 10,
          height: 37,
          borderRadius: 5,
          borderColor: '#e82e83',
          cursor: 'pointer',
        }}
      >
        {selectedDate == null ? placeholder : selectedDate.format(dateFormat)}
        <span style={{ float: 'right', marginLeft: 20, marginTop: 5 }}>
          <SvgIcon name="calendar" size={20} />
        </span>
      </button>
    );
  }

  render() {
    const { selectTime, selectedDate, onSelect, disabled } = this.props;
    return (
      <div>
        <DatePicker
          customInput={this.renderCustomInput()}
          disabled={disabled}
          locale="vi-vn"
          onChange={onSelect}
          placeholderText="Chọn ngày"
          selected={selectedDate}
          showTimeSelect={selectTime}
          timeFormat="HH:mm"
          timeIntervals={10}
          todayButton="Hôm nay"
        />
        <style jsx>{styles}</style>
      </div>
    );
  }
}
const styles = css`
  :global(.react-datepicker__time-list) {
    padding: 0;
  }
`;


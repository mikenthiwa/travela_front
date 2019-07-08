import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import calendarIcon from '../../../../../images/icons/calendar_icon.svg';

class DateInput extends Component {
  state = {
    selectedDate: null
  };

  componentDidMount = () => {
    this.updateDate(this.props);
  }


  componentWillReceiveProps(nextProps, nextState) {
    this.updateDate(nextProps);
  }

  updateDate = ({value, showTimeSelect}) => {
    const selectedDate = value ?
      moment(
        value, `MM-DD-YYYY${ showTimeSelect ? 'THH:mm' : ''}`
      )
      : null;
    return  selectedDate && selectedDate._isValid && this.setState({ selectedDate });
  }

  handleChange = (date, event, raw = false) => {
    const { onChange , onChangeRaw} = this.props;
    this.setState({ selectedDate: date });
    onChange(date, event);
    raw && onChangeRaw(date, event);
  };

  render() {
    const {
      error, className, name, onBlur, minimumDate, maximumDate, openToDate,
      showYearDropdown, showTimeSelect, dateFormat, minTime, maxTime, timeFormat, disabled,
    } = this.props;
    const { selectedDate } = this.state;
    const timeClasses =  `${showTimeSelect ? 'time-wrapper': ''}  ${/HH:mm/.test(timeFormat) ? 'twenty_four_h': ''}`;

    const onChangeRaw = (date, event) => this.handleChange(moment(date), event, true);
    return (
      <div className={`date-wrapper ${className} ${timeClasses}`} id={`${name}_date`}>
        <DatePicker
          disabled={disabled}
          className={`${error ? 'error' : ''}`}
          calendarClassName="calendar-body"
          dayClassName={() => 'calendar-day'}
          fixedHeight
          placeholderText={`MM/DD/YYYY${showTimeSelect ? ' HH:mm': ''}`}
          selected={selectedDate}
          onChange={(date, event) => this.handleChange(date, event)}
          onChangeRaw={showTimeSelect ? onChangeRaw : () => {}}
          onBlur={onBlur} name={name}
          minDate={minimumDate} maxDate={maximumDate}
          minTime={minTime} maxTime={maxTime}
          timeFormat={timeFormat}
          dateFormat={dateFormat}
          showTimeSelect={showTimeSelect} autoComplete="off"
          openToDate={minimumDate || openToDate} showYearDropdown={showYearDropdown}
        />
        <img className="calendar-icon" src={calendarIcon} alt="cal" />
      </div>
    );
  }
}

DateInput.propTypes = {
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  className: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  minimumDate: PropTypes.object,
  maximumDate: PropTypes.object,
  minTime: PropTypes.object,
  maxTime: PropTypes.object,
  openToDate: PropTypes.object,
  showYearDropdown: PropTypes.bool,
  showTimeSelect: PropTypes.bool,
  dateFormat: PropTypes.string,
  timeFormat: PropTypes.string,
  onChangeRaw: PropTypes.func,
  disabled: PropTypes.bool,
};

DateInput.defaultProps = {
  className: '',
  error: '',
  name: '',
  minimumDate: undefined,
  maximumDate: undefined,
  maxTime: undefined,
  minTime: undefined,
  showTimeSelect: false,
  timeFormat: undefined,
  openToDate: moment(),
  dateFormat: undefined,
  showYearDropdown: false,
  onChangeRaw: () => {},
  disabled: false,
};

export default DateInput;

import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { PropTypes } from 'prop-types';
import 'react-datepicker/dist/react-datepicker.css';
import calendarIcon from '../../../images/icons/calendar_icon.svg';

class DateInput extends Component {
  state = {
    selectedDate: null,
    value: '',
  };

  dateWrapper = React.createRef();

  componentDidMount = () => {
    this.updateDate(this.props, true);
  }


  componentWillReceiveProps(nextProps, nextState) {
    this.updateDate(nextProps);
  }

  updateDate = ({value, showTimeSelect, dateFormat}, initial = false) => {
    const selectedDate = value ? moment(value) : null;
    return  selectedDate && selectedDate._isValid && this.setState({ selectedDate }, () => {
      initial && this.setState({ value: dateFormat ? moment(selectedDate).format(dateFormat) : selectedDate });
    });
  }

  handleChange = (date, event, raw = false) => {
    const { onChange , onChangeRaw, dateFormat } = this.props;
    let selectedDate = this.validateInput(date);

    this.setState({ selectedDate }, () => {
      !raw && this.setState({
        value: dateFormat ? moment(selectedDate).format(dateFormat) : selectedDate,
      });
    });

    const { current: target } = this.dateWrapper;
    const generatedEvent =  {...event, target };

    onChange(selectedDate, generatedEvent);
    raw && onChangeRaw(selectedDate, generatedEvent);
  }

  validateInput = (date) => {
    const { minimumDate, maximumDate } = this.props;
    let selectedDate = date;
    if ((minimumDate && (date < minimumDate)) || !date.isValid()) {
      selectedDate = minimumDate;
    }
    if(maximumDate && (date > maximumDate)) {
      selectedDate = maximumDate;
    }
    return selectedDate;
  }

  onChangeRaw = event => {
    const { showTimeSelect, dateFormat } = this.props;
    this.setState({ value: event.target.value });
    this.handleChange(
      moment(event.target.value, dateFormat),
      undefined,
      showTimeSelect
    );
  }

  handleBlur = e => {
    const { selectedDate } = this.state;
    const { onBlur, dateFormat, minimumDate } = this.props;

    const date = selectedDate || minimumDate;
    const value = dateFormat ? moment(date).format(dateFormat) : date.toString();
    this.setState({ value });
  
    onBlur(e);
  } 

  render() {
    const {
      error, className, name, minimumDate, maximumDate, openToDate,
      showYearDropdown, showTimeSelect, dateFormat, minTime, maxTime, timeFormat, disabled,
    } = this.props;
    const { selectedDate, value } = this.state;
    const timeClasses =  `${showTimeSelect ? 'time-wrapper': ''}  ${/HH:mm/.test(timeFormat) ? 'twenty_four_h': ''}`;
    return (
      <div className={`date-wrapper ${className} ${timeClasses}`} id={`${name}_date`} ref={this.dateWrapper}>
        <DatePicker
          disabled={disabled}
          className={`${error ? 'error' : ''}`}
          calendarClassName="calendar-body"
          dayClassName={() => 'calendar-day'}
          fixedHeight
          placeholderText={`MM/DD/YYYY${showTimeSelect ? ' HH:mm': ''}`}
          selected={selectedDate || minimumDate}
          onChange={(date, event) => this.handleChange(date, event)}
          onChangeRaw={this.onChangeRaw}
          onBlur={this.handleBlur} name={name}
          minDate={minimumDate} maxDate={maximumDate}
          minTime={minTime} maxTime={maxTime}
          timeFormat={timeFormat}
          dateFormat={dateFormat}
          showTimeSelect={showTimeSelect} autoComplete="off"
          openToDate={minimumDate || openToDate} showYearDropdown={showYearDropdown}
          value={value}
          disabledKeyboardNavigation
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

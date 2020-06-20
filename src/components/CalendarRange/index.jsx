import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRangePicker } from 'react-date-range';
import { format, addDays } from 'date-fns';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CalendarRange extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateRangePicker: {
        selection: {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection',
        }
      },
    };
    this.handleRangeChange = this.handleRangeChange.bind(this, 'dateRangePicker');
  }

  handleRangeChange(which, payload) {
    const {handleChange} = this.props;
    const {startDate, endDate} = payload.selection;

    this.setState((prevState) => ({
      [which]: {
        ...prevState[which],
        ...payload,
      },
    }));

    const range = {
      start: format(startDate, 'YYYY-MM-DD'),
      end: format(endDate, 'YYYY-MM-DD')
    };
    handleChange(range);
  }

  render() {
    const { dateRangePicker: { selection, selection: { startDate }} } = this.state;
    return (
      <DateRangePicker
        onChange={this.handleRangeChange}
        className="PreviewArea"
        months={2}
        shownDate={startDate}
        minDate={addDays(new Date(), -300)}
        maxDate={addDays(new Date(), 900)}
        direction="horizontal"
        scroll={{ enabled: false }}
        ranges={[selection]}
      />
    );
  }
}

CalendarRange.propTypes = {
  handleChange: PropTypes.func.isRequired
};

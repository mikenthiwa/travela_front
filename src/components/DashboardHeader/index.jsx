import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { format, startOfISOWeek, endOfISOWeek } from 'date-fns';
import moment from 'moment';
import activeLocation from '../../images/icons/location_active.svg';
import activeCalendar from '../../images/icons/calendar_active.svg';
import download from '../../images/icons/download.svg';
import CalendarRange from '../CalendarRange';
import './_header.scss';
import './index.scss';

export default class DashboardHeader extends PureComponent {
  state = {
    isDropdownOpen: false,
    range: {
      start: moment().startOf('month').format('YYYY-MM-DD'),
      end: moment().endOf('month').format('YYYY-MM-DD')
    }
  }

  showCalendar  = () => {
    const {isDropdownOpen} = this.state;
    this.setState({
      isDropdownOpen: !isDropdownOpen
    });
  };

  hideCalendar = () => {
    this.setState({
      isDropdownOpen: false
    });
  };

  handleChange = (ranges) => {
    const {context} = this.props;
    context.handleFilter(ranges);
    const range = {
      start: format(ranges.start, 'DD MMM, YY'),
      end: format(ranges.end,  'DD MMM, YY')
    };
    this.setState((prevState) => ({...prevState, range}));
    if(range.start !== range.end) {
      this.hideCalendar();
    }
  }

  renderButton = (icon, text, method) => {
    const { downloadCsv, context } = this.props;
    return (
      <button
        type="button" className="action-btn" id={!text ? 'download' : ''} onClick={
          !text ? (() => downloadCsv(`?location=${context.state.center}&type=file`)) : method}>
        {text}
        <img src={icon} alt={text} />
      </button>
    );
  };

  render() {
    const {context} = this.props;
    const {isDropdownOpen, range} = this.state;
    return (
      <div className="DashboardHeader">
        <div className="dashboard-mobile">
          <h2 className="title">Dashboard</h2>
          {this.renderButton(activeLocation, context.state.center)}
        </div>
        <div className="actions">
          {this.renderButton(activeLocation, context.state.center)}
          {this.renderButton(activeCalendar, `${range.start} - ${range.end}`, this.showCalendar)}
          {this.renderButton(download)}
        </div>

        <div className={`calender-range ${isDropdownOpen ? 'open' : ''}`}>
          <CalendarRange context={context} handleChange={this.handleChange} />
        </div>
      </div>
    );
  }
}

DashboardHeader.propTypes = {
  downloadCsv: PropTypes.func.isRequired,
  context: PropTypes.shape({}).isRequired
};

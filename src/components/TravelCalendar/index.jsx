import React, { Fragment, PureComponent } from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import moment from 'moment';
import './TravelCalendar.scss';
import Utils from '../../helper/Utils';
import TravelCalendarDetails from '../TravelCalendarDetails';
import activeCalendar from '../../images/icons/calendar_active.svg';
import download from '../../images/icons/download.svg';
import CalendarRange from '../CalendarRange';
import TravelCalendarPlaceholder from '../Placeholders/TravelCalendarPlaceholder';
import AnalyticsPagination from '../Pagination/AnalyticsPagination';

class TravelCalendar extends PureComponent {
  state = {
    isCalendarOpen: false,
    page: 1,
    filter: {
      start: moment().startOf('month').format('YYYY-MM-DD'),
      end: moment().endOf('month').format('YYYY-MM-DD')
    }
  }

  componentDidMount(){
    const {fetchCalendarAnalytics, history} = this.props;
    const {filter, page} = this.state;
    if(filter) {
      const query = Utils.manageRangeFilter(filter);
      fetchCalendarAnalytics({type: 'json', filter: query, page, history});
    }
  }

  handleChange = (range) => {
    const {fetchCalendarAnalytics, history} = this.props;
    const {filter} = this.state;
    const query = Utils.manageRangeFilter(range);
    if(query !== filter){
      this.setState(prevState => ({
        ...prevState,
        filter: range,
        page: 1
      }));
      fetchCalendarAnalytics({type:'json', filter:query, page: 1, history});
    }
    (range.start !== range.end) && this.handleCalendar();
  }

  handleCalendar = () => {
    this.setState(prevState => {
      const {isCalendarOpen} = prevState;
      return {...prevState, isCalendarOpen: !isCalendarOpen};
    });
  }

  handlePagination = (direction) => {
    const { travelCalendar:{ travelCalendarData }, fetchCalendarAnalytics, history } = this.props;
    const { filter } = this.state;
    const query = Utils.manageRangeFilter(filter);
    if(travelCalendarData) {
      const { pagination: { prevPage, nextPage, currentPage, pageCount } } = travelCalendarData;

      const fetchPage = {
        Next: (currentPage + 1) <= pageCount ? nextPage : null,
        Previous: prevPage > 0 ? prevPage : null
      };

      if( /(Next)|(Previous)/.test(direction) && fetchPage[direction]){
        this.setState(prevState => ({ ...prevState, page: fetchPage[direction]}));
        fetchCalendarAnalytics({type: 'json', filter: query, page: fetchPage[direction], history});
      }
    }
  }

  getTravelCalendarCSV = () => {
    const {downloadCalendarAnalytics, history} = this.props;
    const {filter: activeFilter, page } = this.state;
    const filter = Utils.manageRangeFilter(activeFilter);
    downloadCalendarAnalytics({type: 'file', filter, page, history});
  }

  renderButton (icon, text, onclickFunction, status) {
    const {isCalendarOpen, filter} = this.state;
    const {travelCalendar:{ travelCalendarData }} = this.props;
    const showDown = travelCalendarData.data.length;
    const range = {
      start: format(filter.start, 'DD MMM, YY'),
      end: format(filter.end, 'DD MMM, YY'),
    };
    return (
      <Fragment>
        <button
          type="button"
          className={text==='Pick a date'?'action-btn--calender':'actions__btn'}
          onClick={onclickFunction}
          disabled={status}
        >
          <Fragment>
            {text==='Pick a date' && <div>{`${range.start} - ${range.end}`}</div>}
            <img className="actions__btn--icon" src={icon} alt={text} />
          </Fragment>
        </button>
        {text === 'Pick a date' && (
          <div className={`
            calendar ${isCalendarOpen ? 'open': ''} ${showDown >= 2 ? 'calendar--down': '' }`}>
            <CalendarRange handleChange={this.handleChange} />
          </div>
        )}
      </Fragment>
    );
  }

  renderCalendar (calender, index) {
    const {user} = this.props;
    return (
      <Fragment key={`calendar-${index}`}>
        <TravelCalendarDetails id="calendar" calendar={calender} user={user} />
      </Fragment>
    );
  }

  renderTravelCalendarDetails () {
    const {travelCalendar:{travelCalendarData, travelCalendarError}} = this.props;
    let calendarData;
    if(travelCalendarData.data.length) {
      const data = travelCalendarData.data;
      calendarData = data.map((calender, index) => this.renderCalendar(calender, index));
    } else if(travelCalendarError){
      const notFoundError = travelCalendarError === 'No records found';
      return (
        <div className="demo-card-wide mdl-card mdl-shadow--2dp error-msg">
          <p className={`${!notFoundError && 'dashboard-component__error-text--style'}`}>
            {notFoundError
              ? 'No data to display'
              : 'Oops! An error occurred in retrieving this data'
            }
          </p>
        </div>
      );
    }
    return (
      <Fragment>
        {calendarData}
        <AnalyticsPagination
          pagination={travelCalendarData.pagination}
          handlePagination={this.handlePagination}
        />
      </Fragment>
    );
  }

  renderCalendarHeader () {
    const {
      travelCalendar: { travelCalendarError }
    } = this.props;
    const status = !travelCalendarError ? false : true;
    return (
      <div className="calendar-header">
        <p className="title">Travel Calendar</p>
        <div className="actions">
          {this.renderButton(activeCalendar, 'Pick a date', this.handleCalendar, false)}
          {this.renderButton(download, 'Export', this.getTravelCalendarCSV, status)}
        </div>
      </div>
    );
  }

  renderLoader () {
    return(
      <div className="demo-card-wide mdl-card mdl-shadow--2dp calender-placeholder">
        <TravelCalendarPlaceholder />
      </div>
    );
  }

  render(){
    const {travelCalendar:{isLoading}} = this.props;
    return (
      <Fragment>
        {this.renderCalendarHeader()}
        {isLoading ? (
          <div className="container">
            {this.renderLoader()}
            {this.renderLoader()}
            {this.renderLoader()}
          </div>
        ) : (
          <div className="container">
            {this.renderTravelCalendarDetails()}
          </div>
        )}
      </Fragment>
    );
  }
}

TravelCalendar.propTypes = {
  fetchCalendarAnalytics: PropTypes.func.isRequired,
  downloadCalendarAnalytics: PropTypes.func.isRequired,
  travelCalendar: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

export default TravelCalendar;

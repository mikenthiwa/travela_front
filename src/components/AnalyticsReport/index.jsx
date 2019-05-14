import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import './index.scss';
import download from '../../images/icons/save_alt_24px.svg';
import TravelReadiness from '../TravelReadiness';
import TripsPerMonthPlaceholder from '../Placeholders/TripsPerMonthPlaceholder';

export default class AnalyticsReport extends Component {
  componentDidMount() {
    const {
      fetchDepartmentTrips,
      fetchReadiness,
      context: {
        state: { range, center }
      }
    } = this.props;
    const { start, end } = range;

    fetchReadiness({
      page: '1',
      limit: '9',
      type: 'json',
      travelFlow: 'inflow',
      range,
      center
    });
    fetchDepartmentTrips({
      filterBy: 'month',
      type: 'json',
      firstDate: start,
      lastDate: end,
      center
    });
  }

  componentWillReceiveProps(nextProps) {
    const { context, fetchDepartmentTrips } = this.props;
    const { range, center } = nextProps.context.state;
    if (
      range.start !== context.state.range.start ||
      range.end !== context.state.range.end
    ) {
      const { start, end } = range;
      fetchDepartmentTrips({
        filterBy: 'month',
        type: 'json',
        firstDate: start,
        lastDate: end,
        center,
      });
    }
  }

  getDepartmentTripsCSV = () => {
    const { fetchDepartmentTrips, context } = this.props;
    const { start, end } = context.state.range;
    const { center } = context.state;
    ['file', 'json'].forEach( type =>
      fetchDepartmentTrips({
        filterBy: 'month',
        type,
        firstDate: start,
        lastDate: end,
        center
      }));
  };

  renderButton = (name, icon, text, onclickFunction) => (
    <button
      name={name}
      id={name}
      type="button"
      className="analyticsReport__export-button"
      onClick={onclickFunction}
    >
      <Fragment>
        {text}
        <img src={icon} alt={text} />
      </Fragment>
    </button>
  );

  renderTripsDetails = item => {
    return (
      <div
        className="analyticsReport__row analyticsReport__report-details"
        key={item.label}
      >
        <div>
          <p>{item.value}</p>
        </div>
        <div>
          <p>{item.label}</p>
        </div>
      </div>
    );
  };

  renderNotFound = () => {
    return (
      <div id="no-records" className="analyticsReport__report-details">
        <br />
        <p className="analyticsReport__text-center">No data to display</p>
      </div>
    );
  };

  renderTripDetailsHeader = () => {
    return (
      <Fragment>
        <div className="analyticsReport__row analyticsReport__header">
          <p>Number of Trips per Department</p>
          {this.renderButton(
            'btnExportTripsPerMonth',
            download,
            'Export',
            this.getDepartmentTripsCSV
          )}
        </div>
        <div className="analyticsReport__row analyticsReport__report-header">
          <div>
            <p>Numbers</p>
          </div>
          <div>
            <p>Departments</p>
          </div>
        </div>
      </Fragment>
    );
  };

  render() {
    const {
      departmentTrips,
      readiness,
      fetchReadiness,
      exportReadiness,
      context: {
        state: { range, center }
      }
    } = this.props;
    const { report, loading, error } = departmentTrips;
    return (
      <div className="analyticsReport">
        <TravelReadiness
          readiness={readiness}
          renderNotFound={this.renderNotFound}
          renderButton={this.renderButton}
          fetchReadiness={fetchReadiness}
          exportReadiness={exportReadiness}
          range={range}
          center={center}
        />
        <div className="analyticsReport__card">
          {loading ? (
            <TripsPerMonthPlaceholder />
          ) : (
            <Fragment>
              {this.renderTripDetailsHeader()}
              {report &&
                report.length > 0 &&
                !loading &&
                report.map(item => this.renderTripsDetails(item))}
              {error ? (
                <p className="dashboard-component__error-text--style">
                  Oops! An error occurred in retrieving this data
                </p>
              ) : (
                report && !report.length && this.renderNotFound()
              )}
            </Fragment>
          )}
        </div>
      </div>
    );
  }
}

AnalyticsReport.propTypes = {
  departmentTrips: PropTypes.object.isRequired,
  readiness: PropTypes.object.isRequired,
  fetchDepartmentTrips: PropTypes.func.isRequired,
  fetchReadiness: PropTypes.func.isRequired,
  exportReadiness: PropTypes.func.isRequired,
  context: PropTypes.shape({
    state: PropTypes.shape({
      start: PropTypes.string,
      end: PropTypes.string
    }),
    handleFilter: PropTypes.func
  })
};

AnalyticsReport.defaultProps = {
  context: {
    state: {
      start: '',
      end: ''
    },
    handleFilter: () => {}
  }
};

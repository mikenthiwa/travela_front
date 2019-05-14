import React, { PureComponent, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import generateDynamicDate from '../../helper/generateDynamicDate';
import download from '../../images/icons/save_alt_24px.svg';
import Button from '../buttons/Buttons';
import TravelReadinessPlaceholder from '../Placeholders/TravelReadinessPlaceholder';
import './TravelReadiness.scss';
import AnalyticsPagination from '../Pagination/AnalyticsPagination';

const limit = 9;

class TravelReadiness extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { travelFlow: 'inflow' };
  }

  componentWillReceiveProps(nextProps) {
    const {range: prevRange, fetchReadiness, center} = this.props;
    const {range: newRange } = nextProps;
    const { travelFlow } = this.state;
    if(JSON.stringify(prevRange) !== JSON.stringify(newRange)) {
      fetchReadiness({page: '1', limit: '9', type:'json', travelFlow, range:newRange, center });
    }
  }
  renderReadinessDetails = (item, index) => {
    const { departureDate } = item;
    return (
      <div className="analyticsReport__row analyticsReport__report-details" key={`item${index}`}>
        <div>
          <p>{item.request.name}</p>
        </div>
        <div>
          <p>{item.travelReadiness}</p>
        </div>
        <div>
          <p>{generateDynamicDate({}, departureDate)}</p>
        </div>
      </div>
    );
  };

  renderPagination = (readiness) => {
    const {pagination} = readiness;
    if(pagination && pagination.dataCount > 0){
      return (
        <AnalyticsPagination
          pagination={pagination}
          handlePagination={this.handlePagination}
        />
      );
    }

  };
  getReadinessCSV = () => {
    const { exportReadiness, range } = this.props;
    const { travelFlow } = this.state;
    exportReadiness({ type: 'file', travelFlow: travelFlow, range });
  };

  getTravelFlow = travelArgument => {
    const { fetchReadiness, range , center } = this.props;
    this.setState({
      travelFlow: travelArgument
    });
    fetchReadiness({page: '1', limit, type:'json', travelFlow: travelArgument, range, center});
  };

  travelFlowButton = () => {
    const { travelFlow } = this.state;
    return (
      <Fragment>
        <button
          className="travel-readiness-toggle-button-0" type="button"
          id={travelFlow !== 'outflow' ? 'active-travel-flow-button' : null}
          onClick={() => this.getTravelFlow('inflow')}>
        Inflow
        </button>
        <button
          className="travel-readiness-toggle-button-1" type="button"
          id={travelFlow === 'outflow' ? 'active-travel-flow-button' : null}
          onClick={() => this.getTravelFlow('outflow')}>
        Outflow
        </button>
      </Fragment>
    );
  };

  findPages = readiness => {
    if (readiness.pagination) {
      const {currentPage, pageCount} = readiness.pagination;
      return { currentPage, pageCount};
    }
    return {};
  };
  handlePagination = direction => {
    const { readiness, fetchReadiness, range, center } = this.props;
    const { travelFlow } = this.state;
    if(readiness){
      const { currentPage, pageCount, limit, prevPage, nextPage, dataCount } = readiness.pagination;
      const fetchPage = {
        Next: currentPage <= pageCount ? nextPage : null,
        Previous: prevPage > 0 ? prevPage : null
      };

      if( /(Next)|(Previous)/.test(direction) && dataCount > limit && fetchPage[direction]){
        fetchReadiness({page: fetchPage[direction], limit, type:'json', travelFlow, range, center});
      }
    }
  };

  renderReadinessTitles = () => {
    const { travelFlow } = this.state;
    return (
      <div className="analyticsReport__row analyticsReport__report-header">
        <div>
          <p>Name</p>
        </div>
        <div>
          <p>% Complete</p>
        </div>
        <div>
          {travelFlow && travelFlow === 'outflow' ? 
            <p>Expected Departure Date</p> : <p>Expected Arrival Date</p>}
        </div>
      </div>
    );
  };

  renderServerError = () => {
    return (
      <p className="dashboard-component__error-text--style">
        Oops! An error occurred in retrieving this data
      </p>
    );
  };
  render() {
    const { readiness, renderNotFound } = this.props;
    const { isLoading, error } = readiness;
    const { travelFlow } = this.state;
    const pages = this.findPages(readiness);
    const readinessArray = readiness.readiness;
    return (
      <div className="analyticsReport__card" id="travel-readiness" style={{marginRight: '30px'}}>
        { isLoading ?
          <TravelReadinessPlaceholder /> : (
            <Fragment>
              <p>Travel Readiness</p>
              <div className="analyticsReport__row analyticsReport__header">
                {this.travelFlowButton()}
                <Button
                  buttonClass="analyticsReport__export-button"
                  reverseText buttonId="btnExportReadinessCSV"
                  text="Export" imageSrc={download}
                  onClick={travelFlow === 'outflow' ? 
                    () => this.getReadinessCSV('outflow') : () => this.getReadinessCSV('inflow')} />
              </div>
              {this.renderReadinessTitles()}
              {error && this.renderServerError()}
              { (!error
                && readiness.readiness.length > 0
                && readiness.readiness.map((item, index) => this.renderReadinessDetails(item, index))
              )
              }
              {!error && (!readiness.readiness.length && renderNotFound())}
            </Fragment>
          )}
        {!error && this.renderPagination(readiness, pages.currentPage, pages.pageCount)}
      </div>
    );
  }
}
TravelReadiness.propTypes = {
  fetchReadiness: PropTypes.func.isRequired,
  readiness: PropTypes.object.isRequired,
  exportReadiness:PropTypes.func.isRequired,
  renderNotFound: PropTypes.func.isRequired,
  range: PropTypes.shape().isRequired,
  center: PropTypes.string.isRequired
};

export default TravelReadiness;

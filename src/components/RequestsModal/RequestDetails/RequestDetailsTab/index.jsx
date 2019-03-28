import React, { Component } from 'react';
import _ from 'lodash';
import { PropTypes } from 'prop-types';
import '../../../RequestTab/RequestTabHead.scss';
import './RequestDetailsTab.scss';
import mark from '../../../../images/icons/new-request-icons/mark.svg';

class RequestTabHead extends Component {
  constructor(props){
    super(props);
  }

  renderTab(obj, currentTab, Icon){
    const { id, name, status, statusDate } = obj;
    const range = _.range(1,currentTab);
    const current = id === currentTab ? 'current': '';
    const completed = range.indexOf(id) !== -1? 'complete' : 'incomplete';
    const iconColor = range.indexOf(id) !== -1? '#10A36D' : '#3359DB';
    return(
      <div key={id} className={`request__tab-card ${current} ${!current && completed}`}>
        <div className="mark">
          <img src={mark} alt="" />
        </div>
        <div className="tab-logo">
          <Icon color={iconColor} />
        </div>
        <div className="tab-title">
          {name}
        </div>
        <div className="foot-text">
          {status}
        </div>
        <div className="foot-text">
          {statusDate}
        </div>
      </div>
    );
  }

  render(){
    const {steps, currentTab } = this.props;
    return (
      <div className="request-details__tab">
        <div className="request__tab">
          {steps && steps.map(step => this.renderTab(step, currentTab, step.icon))}
        </div>
      </div>
    );
  }

}

RequestTabHead.propTypes = {
  currentTab: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
};


export default RequestTabHead;

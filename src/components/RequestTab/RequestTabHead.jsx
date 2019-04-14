import React, { Component } from 'react';
import _ from 'lodash';
import { PropTypes } from 'prop-types';
import './RequestTabHead.scss';
import { Link } from 'react-router-dom';
import mark from '../../images/icons/new-request-icons/mark.svg';
import backButton from '../../images/back-icon.svg';


class RequestTabHead extends Component {
  constructor(props){
    super(props);
  }

  renderTab(obj, currentTab, Icon){
    const { id, name, status } = obj;
    const range = _.range(1,currentTab);
    const current = id === currentTab ? 'current_request': '';
    const completed = range.indexOf(id) !== -1? 'complete' : 'incomplete'; 
    const iconColor = range.indexOf(id) !== -1? '#10A36D' : '#3359DB'; 
    return(
      <div key={id} className={`request__tab-card mdl-cell mdl-cell--3-col mdl-cell--4-col-tablet mdl-cell--12-col-phone ${current} ${completed}`}>
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
      </div>
    );
  }

  renderTitle(){
    const { editing } = this.props;
    return (
      <div className="new-request_title">
        {
          editing ? 
            (
              <div>
                <h1 className="page-header__edit-request">
               
                  <Link to="/requests"><img src={backButton} className="header__link" alt="back icon" /></Link>
                
                  <span className="edit__request-title-text">
                    {'EDIT A TRAVEL REQUEST'}
                  </span>
                </h1>
              </div>
            ):
            (
              <div>
                <span className="new__request-title-text">
                  {'CREATE A NEW TRAVEL REQUEST'}
                </span>
    
              </div>
            )
        }
      </div>
    );
  }

  render(){
    const {steps, currentTab } = this.props;
    return (
      <div>
        {this.renderTitle()}
        <div className="request__tab mdl-grid">
          {steps && steps.map(step => this.renderTab(step, currentTab, step.icon))}
        </div>
      </div>
    );  
  }

}
RequestTabHead.defaultProps = {
  editing: false,
};

RequestTabHead.propTypes = {
  currentTab: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
  editing: PropTypes.bool,
};


export default RequestTabHead;

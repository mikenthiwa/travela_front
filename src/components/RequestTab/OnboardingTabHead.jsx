import React, { Component } from 'react';
import _ from 'lodash';
import { PropTypes } from 'prop-types';
import './UserOnboardingHeadTab.scss';

class OnBoardingTabHead extends Component {
  constructor(props){
    super(props);
  }
  renderTab(obj, currentTab){
    const { id, name, position } = obj;
    const range = _.range(1, currentTab);
    const current = id === currentTab ? 'current_request-tab': 'inactive_request-tab';
    const completed = range.indexOf(id) !== -1? 'completecolor' : 'incompletecolor'; 
    return(
      <div key={id} className={`request__tab-card-onboarding ${current} ${completed}`}>
        <div className="tab-logo-onboarding"> 
          {position}
        </div>
        <div className="distance-line">
          <hr />
        </div>
        <div className="tab-title">
          {name}
        </div>
      </div>
    );
  }


  render(){
    const { steps, currentTab } = this.props;
    return (
      <div>
        <div className="request__tab-onboarding">
          {steps && steps.map(step => this.renderTab(step, currentTab))}
        </div>
      </div>
    );  
  }

}

OnBoardingTabHead.propTypes = {
  currentTab: PropTypes.number.isRequired,
  steps: PropTypes.array.isRequired,
};


export default OnBoardingTabHead;

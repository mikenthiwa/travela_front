import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TravelCosts from '../TravelCosts/TravelCosts';
import BackButton from '../../BackButton';

function renderTravelCosts (props, _this) {
  const { state, nextStep, backStep } = _this;
  const { trips } = state;
  const { travelCosts: { stipends, flightCosts, hotelEstimates, isLoading }, userData: { fullName } } = props;
  return (
    <Fragment>
      <div className="personal-rectangle mdl-grid">
        <div name="travelcosts" className="travel-costs-container">
          <div>
            <p className="travel-costs-title">
              {'Your Travel Cost Breakdown'}
            </p>
            <p className="travel-costs-description">
              {`Hi ${fullName.split(' ')[0]}, here is a breakdown of your cost estimate.`}
            </p>
          </div>
          <div className="travel-cost-body">
            {
              <TravelCosts
                isLoading={isLoading}
                trips={trips}
                stipends={stipends}
                flightCosts={flightCosts}
                hotelEstimates={hotelEstimates}
              />
            }
          </div>
        </div>
      </div>
      {(
        <div className="request-submit-area submit-area">
          <button
            onClick={e => nextStep(e, '')}
            type="button"
            className="bg-btn bg-btn--active" id="stipend-next">
            Next
          </button>
        </div>
      )
      }
      <div className="back-btn-stipend">
        <BackButton
          backStep={backStep}
        />
      </div>
    </Fragment>
  );
}

function _renderTravelCosts () {
  return renderTravelCosts(this.props, this);
}

renderTravelCosts.propTypes = {
  userData: PropTypes.object,
  travelCosts: PropTypes.object,
};

renderTravelCosts.defaultProps = {
  userData: {},
  travelCosts: {
    isLoading: false,
    stipends: [],
    flightCosts: [],
    hotelEstimates: []
  },
};

export default _renderTravelCosts;

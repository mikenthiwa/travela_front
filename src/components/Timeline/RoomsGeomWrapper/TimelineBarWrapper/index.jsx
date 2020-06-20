import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

class TimelineBarWrapper extends PureComponent {
  render() {
    const {setBookingDetailsAbsolutePos, toggleBookingDetails, tripStats, children} = this.props;
    return (
      <div
        className="timeline-trip-geometry"
        tabIndex="-1"
        role="presentation"
        onKeyUp={()=>{}}
        onClick={setBookingDetailsAbsolutePos}
        onFocus={() => toggleBookingDetails('open')}
        onBlur={() => toggleBookingDetails('close')}
        style={{
          left: `${tripStats.tripTimelineOffsetLeft}px`
        }}
      >
        { children }
      </div>
    );
  }
}

TimelineBarWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object, PropTypes.array ]).isRequired,
  toggleBookingDetails: PropTypes.func.isRequired,
  setBookingDetailsAbsolutePos: PropTypes.func.isRequired,
  tripStats: PropTypes.object.isRequired,
};


export default TimelineBarWrapper;

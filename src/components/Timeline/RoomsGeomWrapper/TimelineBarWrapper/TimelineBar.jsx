import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';

class TimelineBar extends PureComponent {
  render() {
    const {children, tripDayWidth, tripStats, customStyle} = this.props;
    return (
      <div
        className="geom-trip geom-trip--outer"
        style={{
          minHeight: '20px',
          width: `${tripDayWidth * tripStats.length}px`,
          ...customStyle
        }}
      >
        {children}
      </div>
    );
  }

}

TimelineBar.propTypes = {
  children: PropTypes.object.isRequired,
  tripDayWidth: PropTypes.number.isRequired,
  customStyle: PropTypes.object.isRequired,
  tripStats: PropTypes.object.isRequired,
};

export default TimelineBar;

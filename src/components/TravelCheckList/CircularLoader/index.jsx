import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './circularloader.scss';

class CircularProgressBar extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const { sqSize, strokeWidth, percentage } = this.props;
    const radius = (sqSize - strokeWidth) / 2;
    const viewBox = `0 0 ${sqSize} ${sqSize}`;
    const dashArray = radius * Math.PI * 2;
    const dashOffset = dashArray - dashArray * percentage / 100;
    const color = percentage === 100 ? '#10A36D': '#3359DB' ; 
    return (  
      <svg
        width={sqSize} height={sqSize} viewBox={viewBox}>
        <circle
          className="circle-background" cx={sqSize / 2}
          cy={sqSize / 2} r={radius} strokeWidth={`${strokeWidth}px`} 
        />
        <circle
          className="circle-progress" stroke={color}
          cx={sqSize / 2} cy={sqSize / 2}
          r={radius} strokeWidth={`${strokeWidth}px`}
          // Start progress marker at 12 O'Clock
          transform={`rotate(-90 ${sqSize / 2} ${sqSize / 2})`}
          style={{
            strokeDasharray: dashArray, strokeDashoffset: dashOffset
          }} />
        <text
          className="circle-text"
          x="50%" y="50%"
          dy=".3em" textAnchor="middle">
          {`${percentage}%`}
        </text>
      </svg>
    );
  }
}


  

CircularProgressBar.defaultProps = {
  sqSize: 200,
  percentage: 25,
  strokeWidth: 10
};

CircularProgressBar.propTypes ={
  sqSize: PropTypes.number,
  percentage: PropTypes.number,
  strokeWidth: PropTypes.number
};

export default CircularProgressBar;


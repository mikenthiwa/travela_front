import React from 'react';
import ContentLoader from 'react-content-loader';

const TravelCalendarPlaceholder = props => (
  <ContentLoader
    height={205}
    width={1080}
    speed={1.5}
    primaryColor="#dfdfdf"
    secondaryColor="#ffffff"
    {...props}
  >
    <circle cx="29.93" cy="44.04" r="25.93" />
    <rect x="70.02" y="35.61" rx="0" ry="0" width="98.02" height="10" />
    <rect x="70.02" y="60.71" rx="0" ry="0" width="236.4" height="7.91" />
    <rect x="970.02" y="44.61" rx="0" ry="0" width="98.02" height="10" />
    <rect x="7.63" y="96.61" rx="0" ry="0" width="1058.5" height="85" />
  </ContentLoader>
);

export default TravelCalendarPlaceholder;

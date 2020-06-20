import React from 'react';
import ContentLoader from 'react-content-loader';

const TripsPerMonthPlaceholder = props => (
  <ContentLoader
    height={250}
    width={500}
    speed={1.5}
    primaryColor="#dfdfdf"
    secondaryColor="#ffffff"
    {...props}
  >
    <rect x="7.33" y="3.61" rx="0" ry="0" width="172.54" height="11.52" />
    <rect x="394.63" y="1.61" rx="0" ry="0" width="132.99" height="28.12" />
    <rect x="7.67" y="75.61" rx="0" ry="0" width="525.5" height="0.85" />
    <rect x="7.63" y="51.61" rx="0" ry="0" width="71.1" height="10.66" />
    <rect x="228.63" y="50.74" rx="0" ry="0" width="112.91" height="9.79" />
    <rect x="3.63" y="89.61" rx="0" ry="0" width="530" height="171" />

  </ContentLoader>
);

export default TripsPerMonthPlaceholder;

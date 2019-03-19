import React from 'react';
import ContentLoader from 'react-content-loader';

const TravelingMembersPlaceholder = props => (
  <ContentLoader
    height={160}
    width={804}
    speed={1.5}
    primaryColor="#dfdfdf"
    secondaryColor="#ffffff"
    {...props}
  >
    <circle cx="89" cy="118" r="42" />
    <circle cx="200" cy="118" r="42" />
    <circle cx="311" cy="118" r="42" />
    <circle cx="533" cy="118" r="42" />
    <circle cx="422" cy="118" r="42" />
    <circle cx="644" cy="118" r="42" />
    <rect x="42.21" y="16.92" rx="0" ry="0" width="0" height="0" />
    <rect x="52.36" y="22.92" rx="0" ry="0" width="200" height="11.18" />
    <rect x="89.76" y="24.92" rx="0" ry="0" width="0" height="0" />
    <rect x="89.76" y="24.92" rx="0" ry="0" width="0" height="0" />
  </ContentLoader>

);

export default TravelingMembersPlaceholder;


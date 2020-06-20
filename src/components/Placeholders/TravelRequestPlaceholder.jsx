import ContentLoader from 'react-content-loader';
import React from 'react';

const TravelRequestPlaceholder = props => (
  <ContentLoader
    height={296}
    width={1000}
    speed={1.5}
    primaryColor="#dfdfdf"
    secondaryColor="#ffffff"
    {...props}
  >
    <rect x="27.59" y="150" rx="0" ry="0" width="165" height="19" />
    <rect x="27.59" y="200" rx="0" ry="0" width="165" height="19" />
    <rect x="27.59" y="80" rx="0" ry="0" width="165" height="19" />
    <rect x="250" y="250" rx="0" ry="0" width="165" height="19" />
    <rect x="250" y="200" rx="0" ry="0" width="165" height="19" />
    <rect x="250" y="150" rx="0" ry="0" width="165" height="19" />
    <rect x="473" y="200" rx="0" ry="0" width="165" height="19" />
    <rect x="473" y="250" rx="0" ry="0" width="165" height="19" />
    <rect x="473" y="150" rx="0" ry="0" width="165" height="19" />
    <rect x="705" y="200" rx="0" ry="0" width="165" height="19" />
    <rect x="705" y="250" rx="0" ry="0" width="165" height="19" />
    <rect x="705" y="150" rx="0" ry="0" width="165" height="19" />
    <rect x="27.59" y="250" rx="0" ry="0" width="165" height="19" />
    <rect x="705" y="80" rx="0" ry="0" width="165" height="19" />
  </ContentLoader>
);

export default TravelRequestPlaceholder;

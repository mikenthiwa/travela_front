import ContentLoader from 'react-content-loader';
import React from 'react';

const HomePagePlaceholder = props => (
  <ContentLoader
    height={200}
    width={1000}
    speed={1.5}
    primaryColor="#dfdfdf"
    secondaryColor="#ffffff"
    {...props}
  >
    <rect x="0" y="0" rx="0" ry="0" width="460" height="290.08" />
    <rect x="500" y="50" rx="0" ry="0" width="194" height="15" />
    <rect x="500" y="80" rx="0" ry="0" width="340" height="10" />
    <rect x="500" y="100" rx="0" ry="0" width="130" height="10" />
  </ContentLoader>
);

export default HomePagePlaceholder;

import React from 'react';
import ContentLoader from 'react-content-loader';

const ReminderPlaceHolder = props => (
  <div style={{marginTop: -55 + 'px', paddingTop: -55 + 'px'}}>
    <ContentLoader
      height={550}
      width={1080}
      speed={1.5}
      primaryColor="#dfdfdf"
      secondaryColor="#ffffff"
      {...props}
    >
      <rect x="2.63" y="68.61" rx="0" ry="0" width="103.5" height="34.61" />
      <rect x="117" y="68.61" rx="0" ry="0" width="97.5" height="34.94" />
      <rect x="939.01" y="68.61" rx="0" ry="0" width="103.67" height="34.61" />
      <rect x="2.63" y="156.61" rx="0" ry="0" width="1036.17" height="45.99" />
      <rect x="2.63" y="210.61" rx="0" ry="0" width="1036.17" height="45.99" />
      <rect x="2.63" y="263.61" rx="0" ry="0" width="1036.17" height="45.99" />
      <rect x="2.63" y="317.61" rx="0" ry="0" width="1036.17" height="45.99" />
      <rect x="2.63" y="371.61" rx="0" ry="0" width="1036.17" height="45.99" />
      <rect x="2.63" y="426.61" rx="0" ry="0" width="1036.17" height="45.99" />
      <rect x="3.63" y="481.61" rx="0" ry="0" width="1036.17" height="45.99" />
      <rect x="2.63" y="130.61" rx="0" ry="0" width="97.55" height="15.71" />
      <rect x="530.63" y="130.61" rx="0" ry="0" width="97.14" height="15.71" />
      <rect x="680.63" y="130.61" rx="0" ry="0" width="80.14" height="15.71" />
      <rect x="820.63" y="130.61" rx="0" ry="0" width="80.14" height="15.71" />
    </ContentLoader>
  </div>
);

export default ReminderPlaceHolder;

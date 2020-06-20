import React from 'react';
import ContentLoader from 'react-content-loader';

const ReminderTemplatePlaceholder = props => (
  <div style={{marginTop: -68 + 'px', paddingTop: -55 + 'px'}}>
    <ContentLoader
      height={550}
      width={1080}
      speed={1.5}
      primaryColor="#dfdfdf"
      secondaryColor="#ffffff"
      {...props}
    >
      <rect x="11.63" y="74.61" rx="0" ry="0" width="0" height="0" />
      <rect x="2.63" y="90.61" rx="0" ry="0" width="97.14" height="15.71" />
      <rect x="2.63" y="136.61" rx="0" ry="0" width="1036.17" height="45.99" />
      <rect x="874.63" y="6.61" rx="0" ry="0" width="164.67" height="36.61" />
      <rect x="2.63" y="190.61" rx="0" ry="0" width="1036.17" height="45.99" />
      <rect x="2.63" y="243.61" rx="0" ry="0" width="1036.17" height="45.99" />
      <rect x="2.63" y="297.61" rx="0" ry="0" width="1036.17" height="45.99" />
      <rect x="2.63" y="351.61" rx="0" ry="0" width="1036.17" height="45.99" />
      <rect x="2.63" y="404.61" rx="0" ry="0" width="1036.17" height="45.99" />
      <rect x="2.63" y="459.61" rx="0" ry="0" width="1036.17" height="45.99" />
      <rect x="850.63" y="87.61" rx="0" ry="0" width="97.14" height="15.71" />
      <rect x="600.63" y="87.61" rx="0" ry="0" width="97.14" height="15.71" />
    </ContentLoader>
  </div>
);

export default ReminderTemplatePlaceholder;

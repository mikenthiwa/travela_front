import React from 'react';
import ContentLoader from 'react-content-loader';

class ResidencePlaceholder extends React.Component {
  render() {
    let placeholders = [];

    for(let i = 0; i < 6; i++) {
      placeholders.push(
        <div key={i} className="mdl-cell mdl-cell--4 mdl-card centre-card">
          <ContentLoader
            height={440}
            width={430}
            speed={1.5}
            primaryColor="#dfdfdf"
            secondaryColor="#ffffff"
            {...this.props}
          >
            <rect x="11.63" y="74.61" rx="0" ry="0" width="0" height="0" />
            <rect x="-9.38" y="-9.39" rx="0" ry="0" width="476.06" height="273.26" />
            <rect x="383.72" y="227.61" rx="0" ry="0" width="0" height="0" />
            <rect x="-1.04" y="148.27" rx="0" ry="0" width="2.84" height="285.4" />
            <rect x="428.36" y="198.87" rx="0" ry="0" width="2.33" height="235.39" />
            <rect x="0.66" y="433.58" rx="0" ry="0" width="433.81" height="1.44" />
            <rect x="2.6" y="356.37" rx="0" ry="0" width="429.26" height="1.18" />
            <circle cx="41.2" cy="308.18" r="25.07" />
            <rect x="81.63" y="290.61" rx="0" ry="0" width="132" height="14" />
            <rect x="82.63" y="315.61" rx="0" ry="0" width="176" height="13" />
            <rect x="180.63" y="243.61" rx="0" ry="0" width="0" height="0" />
            <circle cx="30.18" cy="400.16" r="10.55" />
            <circle cx="63.18" cy="401.16" r="10.55" />
            <circle cx="98.18" cy="401.16" r="10.55" />
            <circle cx="289.18" cy="400.16" r="10.55" />
            <rect x="313.63" y="394.61" rx="0" ry="0" width="105" height="13" />
          </ContentLoader>
        </div>
      );
    }
    return (
      <div className="mdl-grid accommodation-grid">{ placeholders }</div>
    );
  }
}

export default ResidencePlaceholder;

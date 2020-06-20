import React from 'react';
import maintenaceImage from '../../../images/maintenance.png';
import travela from '../../../images/travela.svg';
import mobileTravel from '../../../images/travela-mobile.svg';
import '../NotFound/NotFound.scss';
import './PageBody.scss';

const PageBody = () => (
  <div className="maintenance-page">
    <header className="mdl-layout__maintenance-header">
      <span className="navbar__logo-icons">
        <img 
          src={travela} 
          alt="Andela Logo" 
          className="mdl-cell--hide-phone" />
        <img 
          src={mobileTravel} 
          alt="Travela Logo" 
          className="mdl-cell--hide-desktop mdl-cell--hide-tablet navbar__travela-logo" 
        />
      </span>
    </header>
    <div className="pageOverlay">
      <div className="maintenance__title-text">
        <p>
          SORRY, TRAVELA WILL BE BACK SOON
        </p>
      </div>
      <div className="maintenanceBody">
        <div className="logo-maintenance">
          <img src={maintenaceImage} alt="site under maintenance" /> 
        </div>
        <p className="maintenance__body-text">
          Thank you for your patience as our engineers work quickly to resolve this issue. In the meantime, please reach out to your  local travel team for help related to your travel process.
        </p>
      </div>
    </div>
  </div>
);

export default PageBody;


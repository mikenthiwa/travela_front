import React from 'react';
import { Link } from 'react-router-dom';

import home from '../../images/home.png';

export default function GetStarted() {
  return (
    <div className="started">
      <div className="card-layout card-layout--start">
        <img src={home} alt="" className="photo" />
        <div className="details">
          <p className="ready">Get Travel Ready</p>
          <p className="confirm">
          Upload details of your travel documents today and avoid last minute hassle.
          </p>
          <Link to="/travel_readiness">Get Started</Link>
        </div>
      </div>
    </div>
  );
}

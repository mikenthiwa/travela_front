import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './NotFound.scss';
import notFoundImage from '../../../images/travela-404.png';


class NotFound extends Component {
  render() {
    const { redirectLink, errorMessage } = this.props;
    return (
      <div className="pageOverlay">
        <div className="notFoundBody">
          <div className="bg_404">
            <img src={notFoundImage} alt="page not found" /> 
          </div>
          <p>
            {errorMessage}
          </p>
          <center>
            <Link to={redirectLink} className="button" href={redirectLink}>
                Click here to go back
            </Link>
          </center>
        </div>
      </div>
    );
  }
}

NotFound.propTypes = {
  redirectLink: PropTypes.string,
  errorMessage: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array
  ])
};

NotFound.defaultProps = {
  errorMessage: `${'The page you are looking for might have been removed, '}${`
   had its name changed or is temporarily unavailable.`}`,
  redirectLink: '/requests'
};

export default NotFound;

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ImageLink from '../../image-link/ImageLink';

class UserInfo extends PureComponent {
  render() {
    const { requestData } = this.props;
    return (
      <div className="modal__user-info">
        <ImageLink
          imageSrc={requestData.picture}
          altText="avatar"
          imageClass="modal__oval"
        />
        <div>
          <div>{requestData && requestData.name}</div>
          <div className="user-role">
            {requestData &&
              `${requestData.role || 'N/A'} , 
               ${requestData.department || 'N/A'}`}
          </div>
        </div>
      </div>
    );
  }
}

UserInfo.propTypes = {
  requestData: PropTypes.object
};

UserInfo.defaultProps = {
  requestData: {}
};

export default UserInfo;

import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './_header.scss';
import headerIcon from '../../images/back-icon.svg';

class PageHeader extends PureComponent {
  renderActionButton = (actionBtnClickHandler, openModal, actionBtn) => {
    return (
      <div>
        <button
          onClick={() => {
            actionBtn === 'New Request' || actionBtnClickHandler ?
              actionBtnClickHandler() :
              openModal(true, 'new model');
          }
          }
          type="button"
          className="action-btn btn-new-request"
          id="actionButton"
        >
          {actionBtn}
        </button>
      </div>
    );
  };

  render() {
    const {
      title, actionBtn, actionBtnClickHandler, openModal, titleClassName, location,
      icon, iconLink, addLink, children, isLoading
    } = this.props;
    return (
      <div className="PageHeader">
        <div>
          {addLink && (
            <Link to={iconLink}>
              <img src={icon} className="header__link" alt="icon" />
            </Link>
          )}
          <span className={titleClassName}>
            {title}
          </span>
          {location && (
            <span className="location">
              {location}
            </span>
          )}
        </div>
        {children}
        {actionBtn && !isLoading && this.renderActionButton(actionBtnClickHandler, openModal, actionBtn)}
      </div>
    );
  }
}


PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  actionBtn: PropTypes.string,
  actionBtnClickHandler: PropTypes.func,
  openModal: PropTypes.func,
  location: PropTypes.string,
  titleClassName: PropTypes.string,
  icon: PropTypes.string,
  iconLink: PropTypes.string,
  addLink: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]),
};

PageHeader.defaultProps = {
  actionBtn: '',
  location: '',
  titleClassName: 'title',
  icon: headerIcon,
  iconLink: '',
  addLink: false,
  isLoading: false,
  actionBtnClickHandler: null,
  openModal: () => { },
  children: '',
};

export default PageHeader;

import React, { PureComponent, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Overlay from './overlay/Overlay';
import closeButton from '../../images/icons/close.svg';
import './_modal.scss';


class Modal extends PureComponent {
  renderModalHeader = () => {
    const { title, closeModal, modalBar, closeDeleteModal, requestId } = this.props;
    let url = location.pathname;
    if (requestId) {
      let urlArr = url.split('/');
      url = urlArr.slice(0, urlArr.length - 1).join('/');
    }
    if (/requests\/\w+\/checklist/.test(url)) {
      url = '/requests';
    }
    return (
      <div className="modal-title-bar">
        <div className="modal-title-text">
          <div className="modal-title modal-title-word">
            {title}
          </div>
          <div className="lable-text modal-bar">
            {modalBar}
          </div>
        </div>
        {closeDeleteModal ?
          (
            <button type="button" onClick={closeDeleteModal} className="modal-close">
              <img alt="close" src={closeButton} />
            </button>
          )
          :
          (
            (url.includes('/requests')) ?
              (
                <button
                  type="button" onClick={closeDeleteModal ?
                    closeDeleteModal : closeModal} className="modal-close">
                  <img alt="close" src={closeButton} />
                </button>
              ) : (
                <button
                  type="button" onClick={closeDeleteModal ? 
                    closeDeleteModal : closeModal} className="modal-close">
                  <img alt="close" src={closeButton} />
                </button>
              )
          )
        }
      </div>
    );
  };

  render() {
    const {
      children,
      visibility,
      width,
      modalId,
      modalContentId,
      showOverlay,
      customOverlayStyle,
      customModalStyles
    } = this.props;
    const overlayStyle = `${visibility} ${customOverlayStyle}`;

    return (
      visibility === 'visible' ? (
        <Fragment>
          <Overlay
            className={overlayStyle} overlayBackground={!showOverlay ? 'overlayBackground' : ''}>
            <div
              className={`modal ${visibility} ${customModalStyles}`}
              style={{maxWidth: width}}
              onClick={e => {e.stopPropagation();}} onKeyPress={() => {}}
              id={modalId}
              tabIndex="0"
              role="button">
              {this.renderModalHeader()}
              <div className="modal-content" id={modalContentId}>
                {children}
              </div>
            </div>
          </Overlay>
        </Fragment>
      ) : null
    );
  }
}


Modal.propTypes = {
  visibility: PropTypes.oneOf(['visible', 'invisible']).isRequired,
  closeModal: PropTypes.func,
  title: PropTypes.string,
  modalId: PropTypes.string,
  modalContentId: PropTypes.string,
  width:  PropTypes.string,
  showOverlay: PropTypes.bool,
  modalBar: PropTypes.object,
  customModalStyles: PropTypes.string,
  closeDeleteModal: PropTypes.func,
  requestId: PropTypes.string,
  customOverlayStyle: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.shape({}),
    PropTypes.array
  ])
};

Modal.defaultProps = {
  title: '',
  modalId: '',
  requestId: '',
  width: '',
  modalContentId: '',
  customOverlayStyle: '',
  customModalStyles: '',
  showOverlay: true,
  modalBar: <div />,
  closeModal: null,
  closeDeleteModal: null,
  children: {}
};

export default Modal;

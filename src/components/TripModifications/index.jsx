import React, { Component } from 'react';
import './TripModifications.scss';
import PropTypes from 'prop-types';
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog';

class TripModifications extends Component{

  state = {
    buttonSelected: '',
    modalInvisible: true
  };


  componentWillReceiveProps(nextProps, nextContext) {
    const { tripModification: { updatingStatus }} = nextProps;
    if(!updatingStatus){
      this.setState({ modalInvisible: true});
    }
  }

  renderDialogText = () => {
    const {buttonSelected} = this.state;
    if (buttonSelected === 'Approve') return 'trip cancellation';
    return 'rejection';
  };

  handleDecision = () => {
    const { modification, updateModification } = this.props;
    const { buttonSelected } = this.state;
    const status = {
      Approve: 'Approved', Reject: 'Rejected'
    };
    updateModification(modification.id, status[buttonSelected]);
  };

  renderButtons = (modification, buttonSelected, modalInvisible, tripModification) => (
    <div className="btn-group">
      <button
        onClick={() => this.setState({buttonSelected: 'Approve', modalInvisible: false})}
        type="button" className="action-button--approve">
        {modification.type === 'Cancel Trip' ? 'Cancel Trip' : 'Modify Dates' }
      </button>
      <button
        onClick={() => this.setState({buttonSelected: 'Reject', modalInvisible: false})}
        type="button" className="action-button--reject">
        Decline
      </button>
      <ConfirmDialog
        id={`${modification.id}`}
        renderDialogText={this.renderDialogText}
        customOverlayClass="trip-modification-modal-overlay"
        handleReject={this.handleDecision}
        customButtonClass={`trip-modification-${buttonSelected}`}
        handleApprove={this.handleDecision}
        isConfirmDialogLoading={tripModification.updatingStatus}
        closeDeleteModal={() => this.setState({modalInvisible: true})}
        modalInvisible={modalInvisible}
        buttonSelected={buttonSelected}
        documentText="Modification"
      />
    </div>
  );

  renderCancelTripMessage = (status, name) => {
    switch(status){
    case 'Open':
      return (
        <React.Fragment>
          <b>{`${name} `}</b>
            would like to cancel this request due to the following reason
        </React.Fragment>
      );
    case 'Approved':
      return (
        <React.Fragment>
            This trip was cancelled due to the following reason:
        </React.Fragment>
      );
    case 'Rejected':
      return (
        <React.Fragment>
            This trip was submitted for cancellation due to the following reason.
            However, the cancellation request was declined.
        </React.Fragment>
      );
    }
  };

  renderModifyTripMessage = (status, name) => {
    switch(status){
    case 'Open':
      return (
        <React.Fragment>
          <b>{`${name} `}</b>
          would like to modify this request due to the following reason
        </React.Fragment>
      );
    case 'Approved':
      return (
        <React.Fragment>
          This trip was modified due to the following reason:
        </React.Fragment>
      );
    case 'Rejected':
      return (
        <React.Fragment>
          This trip was submitted for modification due to the following reason.
          However, the modification request was declined.
        </React.Fragment>
      );
    }
  };

  getModificationText = (status, type) => {
    switch(type){
    case 'Cancel Trip':{
      return status === 'Approved' ? 'Trip Cancelled' : 'Declined';
    }
    case 'Modify Dates':{
      return status === 'Approved' ? 'Trip Modified' : 'Declined';
    }
    }
  };

  renderModificationMessage = (status, type, name) => {
    switch(type) {
    case 'Cancel Trip': {
      return this.renderCancelTripMessage(status, name);
    }
    case 'Modify Dates': {
      return this.renderModifyTripMessage(status, name);
    }
    }
  };

  renderModification = (modification) => {
    const { name, tripModification } = this.props;
    const { buttonSelected, modalInvisible } = this.state;
    return (
      <div className="trip-modification row">
        <p className="trip-modification__title">
          {
            this.renderModificationMessage( modification.status, modification.type, name )
          }
        </p>
        <h6>
          {modification.reason}
        </h6>
        {
          modification.status === 'Open' ? (
            this.renderButtons(modification, buttonSelected, modalInvisible,tripModification)
          ) : (
            <div
              className={`trip-modification__status trip-modification__status--${modification.status}`}>
              <span>
                {
                  this.getModificationText(modification.status, modification.type)
                }
              </span>
            </div>
          )
        }
      </div>
    );
  };

  render() {
    const { modification } = this.props;
    return (
      <div className="trip-modifications">
        <div className="trip-modifications__header">
          <p className="trip-modifications__header__title">Modification Request</p>
        </div>
        <div className="trip-modifications__list">
          {this.renderModification(modification)}
        </div>
      </div>
    );
  }
}

TripModifications.propTypes = {
  modification: PropTypes.shape({}).isRequired,
  name: PropTypes.string.isRequired,
  updateModification: PropTypes.func.isRequired,
  tripModification: PropTypes.object.isRequired
};

export default TripModifications;

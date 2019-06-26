import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChecklistItem from './ChecklistItem';

class TravelChecklist extends Component {
  render() {
    const {
      checklistItems, tripId, requestId, postSubmission, openModal, closeModal,
      shouldOpen, uploadFile, userReadinessDocument, fileUploads, downloadAttachments,
      postSuccess, modalType, destination
    } = this.props;
    const location = localStorage.getItem('location');
    const checkItems = location === destination || checklistItems.length === 2;
    const message =
      location === destination
        ? 'Checklist for your location are not displayed '
        : 'There are no checklists for this destinaton';

    return (
      <div className="check-list">
        {checkItems ? (
          <div className="no-checklist">{message}</div>
        ) : (
          checklistItems.map((checklistItem, index) => {
            let itemType;
            const requiresFile = checklistItem.requiresFiles;
            itemType = requiresFile ? 'uploadItem' : 'responseItem';
            const checkBoth =
              requiresFile &&
              /(visa)|(passport)/.test(checklistItem.name.toLowerCase());
            itemType = checkBoth ? 'duoItem' : itemType;
            return (
              !['default'].includes(
                checklistItem.destinationName.toLowerCase()
              ) && (
                <ChecklistItem
                  checklistItem={checklistItem} key={checklistItem.id} number={index + 1}
                  requestId={requestId} checkId={`${tripId}-${checklistItem.id}`}
                  postSubmission={postSubmission} tripId={tripId} openModal={openModal}
                  closeModal={closeModal} shouldOpen={shouldOpen} uploadFile={uploadFile}
                  itemType={itemType} userReadinessDocument={userReadinessDocument}
                  fileUploads={fileUploads} downloadAttachments={downloadAttachments}
                  postSuccess={postSuccess} modalType={modalType}
                />
              )
            );
          })
        )}
      </div>
    );
  }
}

TravelChecklist.propTypes = {
  postSubmission: PropTypes.func.isRequired,
  requestId: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired,
  shouldOpen: PropTypes.bool.isRequired,
  checklistItems: PropTypes.array.isRequired,
  tripId: PropTypes.string.isRequired,
  uploadFile: PropTypes.func.isRequired,
  fileUploads: PropTypes.object.isRequired,
  downloadAttachments: PropTypes.func.isRequired,
  userReadinessDocument: PropTypes.object.isRequired,
  modalType: PropTypes.string,
  destination: PropTypes.string.isRequired,
  postSuccess: PropTypes.array.isRequired
};


TravelChecklist.defaultProps = {
  modalType: ''
};

export default TravelChecklist;

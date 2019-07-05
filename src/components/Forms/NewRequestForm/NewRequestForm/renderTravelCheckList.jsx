import React from 'react';
import PropTypes from 'prop-types';
import SubmitArea from '../FormFieldsets/SubmitArea';
import BackButton from '../../BackButton';
import TravelChecklistsCard from '../FormFieldsets/TravelChecklistsCard';
import PendingApprovals from '../FormFieldsets/PendingApprovalsCard';

function renderTravelCheckList (...args) {
  const [_this, hasBlankFields, selection, creatingRequest,
    currentTab, fetchTravelChecklist, trips,
    checklistItems, isLoading, userData, editing,
    history, isEditing] = args;

  return (
    <div>
      <div className="travel-checklist__tab mdl-grid">
        <TravelChecklistsCard
          fetchTravelChecklist={fetchTravelChecklist}
          trips={trips}
          checklistItems={checklistItems}
          isLoading={isLoading}
          userData={userData}
        />
        <PendingApprovals />
      </div>
      <div className="travel-checklist__submit-area submit-area">
        <div className="back-btn-checklist">
          <BackButton
            backStep={_this.backStep}
          />
        </div>
        <SubmitArea
          hasBlankFields={false}
          selection={selection}
          loading={creatingRequest || isEditing}
          send={editing ? 'Update Request' : 'SUBMIT'}
          currentTab={currentTab}
          history={history}
          editing={editing}
          onCancel={_this.onEditCancelHandler}
        />
      </div>
    </div>
  );
}

function _renderTravelCheckList (...args) {
  return renderTravelCheckList(this, ...args);
}

export default _renderTravelCheckList;

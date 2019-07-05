import React from 'react';
import PropTypes from 'prop-types';
import Script from 'react-load-script';
import SubmitArea from '../FormFieldsets/SubmitArea';
import BackButton from '../../BackButton';

function renderSubmitArea (...args) {
  const [_this, hasBlankFields, errors, sameOriginDestination,
    selection, creatingRequest, disableOnChangeProfile, collapse,
    commentTitle, currentTab, editing] = args;
  const { props, state } = _this;
  const { requestOnEdit, userData, comments } = props;
  const { isLoading, isSameDate, isLowerDate, inValidOtherReason } = state;
  return (
    <div className="trip__tab-body">
      <span className={`trip-${isLoading ? 'loading' : 'not-loading'}`}>
        <div
          id="trip-loader" />
      </span>
      {_this.renderTravelDetailsFieldset()}
      <Script
        url={process.env.REACT_APP_CITY}
        onCreate={_this.handleScriptCreate}
        onError={_this.handleScriptError}
        onLoad={_this.handleScriptLoad} />
      <div className="back-btn-request">
        <BackButton
          backStep={_this.backStep}
        />
      </div>
      <SubmitArea
        hasBlankFields={
          !hasBlankFields && !errors.manager
            ? false : true
        }
        isSameDate={isSameDate}
        isLowerDate={isLowerDate}
        inValidOtherReason={inValidOtherReason}
        sameOriginDestination={sameOriginDestination}
        selection={selection}
        loading={creatingRequest}
        disableOnChangeProfile={disableOnChangeProfile}
        send="Next"
        nextStep={_this.nextStep}
        currentTab={currentTab}
        collapsible={_this.showComments}
        collapse={collapse}
        commentTitle={commentTitle}
        handleComment={_this.handleComment}
        editing={editing}
        requestData={requestOnEdit}
        currentUser={userData}
        comments={comments}
      />
    </div>
  );
}

function _renderSubmitArea (...args) {
  return renderSubmitArea(this, ...args);
}

renderSubmitArea.propTypes = {
  userData: PropTypes.object,
  requestOnEdit: PropTypes.object,
  comments: PropTypes.array,
};

renderSubmitArea.defaultProps = {
  userData: {},
  requestOnEdit: {
    trips: []
  },
  comments: []
};

export default _renderSubmitArea;

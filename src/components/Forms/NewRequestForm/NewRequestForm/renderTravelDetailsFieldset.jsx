import React from 'react';
import PropTypes from 'prop-types';
import TravelDetailsFieldset from '../FormFieldsets/TravelDetails';

function renderTravelDetailsFieldset (_this) {
  const {
    onChangeDate, handleReason, handlePickBed, handleRadioButton,
    onChangeInput, addNewTrip, removeTrip, setCurrentOrigin,
    props, state,
  } = _this;

  const { selection, parentIds, values } = state;
  const {
    fetchAvailableRooms, availableRooms,
    editing, requestOnEdit, listTravelReasons
  } = props;

  return (
    <TravelDetailsFieldset
      fetchAvailableRooms={fetchAvailableRooms}
      values={values}
      value="232px"
      selection={selection}
      handleDate={onChangeDate}
      handleReason={handleReason}
      handlePickBed={handlePickBed}
      handleRadioButtonChange={handleRadioButton}
      onChangeInput={onChangeInput}
      parentIds={parentIds}
      addNewTrip={addNewTrip}
      removeTrip={removeTrip}
      availableRooms={availableRooms}
      editing={editing}
      requestOnEdit={requestOnEdit}
      listTravelReasons={listTravelReasons}
      setCurrentOrigin={setCurrentOrigin}
    />
  );
}

function _renderTravelDetailsFieldset () {
  return renderTravelDetailsFieldset(this);
}

renderTravelDetailsFieldset.propTypes = {
  editing: PropTypes.bool,
  requestOnEdit: PropTypes.object,
  fetchAvailableRooms: PropTypes.func.isRequired,
  availableRooms: PropTypes.object.isRequired,
  listTravelReasons: PropTypes.object,
};

renderTravelDetailsFieldset.defaultProps = {
  editing: false,
  requestOnEdit: {
    trips: []
  },
  listTravelReasons: {},
};

export default _renderTravelDetailsFieldset;

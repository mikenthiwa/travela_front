import React from 'react';
import PropTypes from 'prop-types';
import RequestTabHeader from '../../../RequestTab/RequestTabHead';
import { FormContext } from '../../FormsAPI';
import RenderPersonalDetailsFieldset from './renderPersonalDetailsFieldset';
import RenderSubmitArea from './renderSubmitArea';
import RenderTravelCosts from './renderTravelCosts';
import RenderTravelCheckList from './renderTravelCheckList';

function renderForm (props, _this) {
  const renderPersonalDetailsFieldset = RenderPersonalDetailsFieldset.bind(_this);
  const renderSubmitArea = RenderSubmitArea.bind(_this);
  const renderTravelCosts = RenderTravelCosts.bind(_this);
  const renderTravelCheckList = RenderTravelCheckList.bind(_this);

  const { state } = _this;
  const {
    errors, values, hasBlankFields, selection, trips,
    sameOriginDestination, steps, currentTab, collapse, commentTitle
  } = state;
  const {
    editing, creatingRequest, fetchTravelChecklist,
    travelChecklists, userData, history, isEditing
  } = props;
  const { checklistItems, isLoading } = travelChecklists || {};
  const { requestOnEdit } = props;
  const { name, gender, department, role, manager } = requestOnEdit || {};
  const {
    name: stateName, manager: stateManager, gender: stateGender,
    department: stateDepartment, role: stateRole
  } = values || {};
  const disableOnChangeProfile = (name === stateName && gender === stateGender &&
    department === stateDepartment && role === stateRole && manager === stateManager)
    ? true : false;

  return (
    <div className="width-91">
      <RequestTabHeader steps={steps} currentTab={currentTab} editing={editing} history={history} />
      <FormContext
        targetForm={_this}
        values={values}
        errors={errors}
        validatorName="validate">
        <form onSubmit={_this.handleSubmit} className="new-request">
          {currentTab === 1 &&
            renderPersonalDetailsFieldset()}
          {currentTab === 2 && renderSubmitArea(
            hasBlankFields, errors, sameOriginDestination,
            selection, creatingRequest, disableOnChangeProfile,
            collapse, commentTitle, currentTab, editing, history)
          }
          {currentTab === 3 &&
            renderTravelCosts()}
          {currentTab === 4 &&
            renderTravelCheckList(
              hasBlankFields, selection, creatingRequest,
              currentTab, fetchTravelChecklist, trips, checklistItems, isLoading, userData,
              editing, history, isEditing
            )}
        </form>
      </FormContext>
    </div>
  );
}

function _renderForm () {
  return renderForm(this.props, this);
}

renderForm.propTypes = {
  userData: PropTypes.object,
  creatingRequest: PropTypes.bool,
  editing: PropTypes.bool,
  requestOnEdit: PropTypes.object,
  history: PropTypes.object,
  fetchTravelChecklist: PropTypes.func,
  travelChecklists: PropTypes.object,
  isEditing: PropTypes.bool,
};

renderForm.defaultProps = {
  creatingRequest: false,
  editing: false,
  userData: {},
  requestOnEdit: {
    trips: []
  },
  history: {},
  travelChecklists: {},
  fetchTravelChecklist: () => {
  },
  isEditing: false,
};

export default _renderForm;

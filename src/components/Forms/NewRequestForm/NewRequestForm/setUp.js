import React from 'react';
import tabIcons from '../../../../images/icons/new-request-icons';
import travelStipendHelper from '../../../../helper/request/RequestUtils';
import getPersonalDetails from './getPersonalDetails';

const defaultState = {
  trips: [{}],
  prevTrips: [{}],
  comments: {},
  errors: {},
  hasBlankFields: true,
  isSameDate: false,
  isLowerDate: false,
  inValidOtherReason: false,
  sameOriginDestination: true,
  checkBox: 'notClicked',
  selection: 'return',
  collapse: false,
  title: 'Hide Details',
  commentTitle: 'Add Comment',
  position: 'none',
  line: '1px solid #E4E4E4',
  parentIds: 1,
};

const steps = (editing) => {
  const status = 'You are currently here';
  return {
    steps: [
      {
        id: 1,
        name: 'Personal Information',
        status: editing ? '' : status,
        icon: tabIcons.personal
      },
      {
        id: 2,
        name: 'Trip Details',
        status: editing ? status : '',
        icon: tabIcons.tripDetails
      },
      { id: 3, name: 'Travel Costs', status: '', icon: tabIcons.stipend },
      { id: 4, name: 'Travel Checklist', status: '', icon: tabIcons.checkList }
    ],
  };
};

function setUp () {
  const { editing, requestOnEdit, managers } = this.props;
  const { name, gender, department, role, manager, location } = getPersonalDetails.bind(this)(
    editing,
    requestOnEdit
  );
  const managerName = travelStipendHelper.getManagerNameOrId(managers, manager);
  const defaultTripStateValues = this.getDefaultTripStateValues(0);
  this.defaultState = {
    ...defaultState,
    ...steps(editing),
    optionalFields: ['bedId'],
    values: {
      name: name,
      gender,
      department,
      role,
      location,
      manager: managerName,
      ...defaultTripStateValues
    },
    currentTab: editing ? 2 : 1,
    isLoading: false
  };
  this.stipendField = React.createRef();
}

export default setUp;

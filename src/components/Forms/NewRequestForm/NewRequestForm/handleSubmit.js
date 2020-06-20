import moment from 'moment';
import { pick, isEqual } from 'lodash';
import travelStipendHelper from '../../../../helper/request/RequestUtils';

const saveDetails = (user, values, newUserData, defaultUserData, updateUserProfile, savePersonalDetails) => {
  const checkBoxState = localStorage.getItem('checkBox');
  if (checkBoxState === 'clicked') {
    if (!isEqual(newUserData, defaultUserData)) {
      values.passportName = values.name;
      values.occupation = values.role;
      const userId = user.UserInfo.id;
      updateUserProfile(values, userId);
      savePersonalDetails({ location: values.location });
    }
  }
};

const validateEntries = (newData, validate, {
  editing, requestOnEdit, handleEditRequest, handleCreateRequest, history
}) => {
  let data = { ...newData };
  if (validate() && editing) {
    data.stipendBreakdown = data.stipendBreakdown || [];
    handleEditRequest(requestOnEdit.id, data, history);
  } else {
    handleCreateRequest(data, history);
  }
};

function handleSubmit (event) {
  event.preventDefault();
  const {
    updateUserProfile,
    userData,
    user,
    managers
  } = this.props;
  const { values, selection, trips, stipend, stipendBreakdown, comments } = this.state;
  userData.name = userData.passportName;
  userData.role = userData.occupation;

  const attrb = ['name', 'gender', 'role', 'department', 'manager', 'location'];
  const managerId = travelStipendHelper.getManagerNameOrId(managers, values.manager);
  const defaultUserData = pick(userData, attrb);
  const newUserData = pick(values, attrb);
  const newData = {
    ...newUserData,
    manager: managerId,
    trips,
    tripType: selection,
    stipend,
    stipendBreakdown,
    comments
  };

  if (selection === 'oneWay') {
    const departDate = newData.trips[0].departureDate;
    const newdate = new Date(departDate);
    const arrivalDate = moment(newdate);
    newData.trips[0].returnDate = arrivalDate.add(1, 'months').format('YYYY-MM-DD');
  }

  validateEntries(newData, this.validate, this.props);
  saveDetails(user, values, newUserData, defaultUserData, updateUserProfile, this.savePersonalDetails);
}

export default handleSubmit;

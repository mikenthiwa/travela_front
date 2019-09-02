import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import InputRenderer, {
  FormContext,
  getDefaultBlanksValidatorFor
} from '../FormsAPI';
import ProfileDetails from './FormFieldsets/ProfileDetails';
import './ProfileForm.scss';
import Validator from '../../../validator';
import RequestUtils from '../../../helper/request/RequestUtils';

// TODO: Create your own meta data.
import * as formMetadata from '../FormsMetadata/NewProfileMetadata/index';

class ProfileForm extends PureComponent {
  constructor(props) {
    super(props);
    this.defaultState = {
      values: {
        name: '',
        gender: '',
        department: '',
        role: '',
        manager: '',
        location: '',
      },
      userProfile: {

      },
      errors: {},
      hasBlankFields: true,
      hideNotificationPane: true,
      hideSideBar: false,
      openSearch: false,
      selectedLink: 'settings page',
      hideOverlay: false,
    };
    this.state = { ...this.defaultState };
    this.validate = getDefaultBlanksValidatorFor(this);
  }

  componentWillReceiveProps(nextProps) {
    const { userData, userDataUpdate: { result }, managers, isUpdating } = nextProps;
    if (userData !== undefined && !isUpdating) {
      const { fullName, gender, department, occupation, manager, location } = userData;
      const managerName = RequestUtils.getManagerNameOrId(managers, manager);
      const userGender = result ? result.gender : gender;
      this.setState((prevState) => ({
        ...prevState,
        values: {
          name: Validator.databaseValueValidator(fullName),
          gender: Validator.databaseValueValidator(userGender),
          department: Validator.databaseValueValidator(department),
          role: Validator.databaseValueValidator(occupation),
          manager: Validator.databaseValueValidator(managerName),
          location: Validator.databaseValueValidator(location)
        }
      }));
      this.setState((prevState => ({
        userProfile: prevState.values,
        hasBlankFields: true
      })));
    }
  }

  changeState = (InputState, ErrorMessageState, errorMessage, value) => {
    const {occupations, managers} = this.props;
    this.setState((prevState) => {
      const newState = {...prevState.values, ...InputState };
      return {...prevState, values: {...newState}};
    });
    const suggestionChoices = 'manager' in InputState ? managers.map(manager => manager.fullName):
      occupations.map(occupation => occupation.occupationName);
    // if typed manager is not in the database return error
    if (suggestionChoices.indexOf(value) === -1) return this.setError(errorMessage);
    // clear out error message
    return this.setState((prevState) => {
      const newError = {...prevState.errors, ...ErrorMessageState};
      return {...prevState, errors: {...newError}, hasBlankFields:false };
    });
  }

  onChangeAutoSuggestion = (type, value) => {
    let errorMessage = {manager: ' No manager with the name exists'};
    const managerInputState = {'manager': value};
    const managerErrorMessageState = {'manager': ''};
    const occupationErrorMessageState ={'role':''};
    let occupationInputState = {'role': value};
    if ( type === 'manager' ){
      this.changeState(managerInputState, managerErrorMessageState, errorMessage, value);
    }
    errorMessage = {role: ' No role with the name exists'};
    if (type === 'role'){
      this.changeState(occupationInputState, occupationErrorMessageState, errorMessage, value);
    }
  };

  setError = (errorMessage) => {
    return this.setState((prevState) => {
      const newError = {
        ...prevState.errors,
        ...errorMessage
      };
      return {...prevState, errors: {...newError}};
    });
  };

  submitProfileForm = event => {
    event.preventDefault();
    const { updateUserProfile, user, managers } = this.props;

    const userId = user.UserInfo.id;
    const { values } = this.state;
    if (this.validate) {
      let data = { ...values };
      const managerId = RequestUtils.getManagerNameOrId(managers, data.manager);
      data.passportName = data.name;
      data.occupation = data.role;
      data.manager = managerId;
      updateUserProfile(data, userId, true);
      this.setState({ hasBlankFields: true });
      localStorage.setItem('location', values.location);
    }
  };

  handleClearForm = () => {
    this.setState((prevState => ({
      ...this.defaultState,
      values: { ...prevState.userProfile },
      userProfile: prevState.userProfile
    })));
  };

  renderUpdateButtons = (hasBlankFields) => {
    return (
      <div className="submit-area ">
        <button
          type="submit"
          className="bg-btn bg-btn--active"
          disabled={hasBlankFields}
        >
          Save Changes
        </button>
        <button
          type="button"
          className="bg-btn bg-btn--inactive"
          onClick={this.handleClearForm} id="btn-cancel">
          Cancel
        </button>
      </div>
    );
  }

  render() {
    const { values, errors, hasBlankFields } = this.state;
    const { managers, centers, isUpdating, departments, } = this.props;
    return (
      <FormContext targetForm={this} validatorName="validate" values={values} errors={errors}>
        <form onSubmit={this.submitProfileForm} className="new-profile">
          <ProfileDetails
            departments={departments}
            values={values}
            onChangeAutoSuggestion={this.onChangeAutoSuggestion}
            managers={managers}
            centers={centers} />
          {hasBlankFields || errors.manager || errors.role || isUpdating ? (
            <div className="submit-area">
              <button
                type="submit"
                id="btn-update"
                disabled={hasBlankFields}
                className="profile-bg-btn bg-btn bg-btn--inactive">
                {isUpdating ? <i className="loading-icon" /> : ''}
                Save Changes
              </button>
            </div>
          ) : this.renderUpdateButtons(hasBlankFields)
          }
        </form>
      </FormContext>
    );
  }
}

ProfileForm.propTypes = {
  updateUserProfile: PropTypes.func.isRequired,
  managers: PropTypes.array,
  occupations: PropTypes.array,
  departments: PropTypes.array,
  user: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  centers: PropTypes.array,
  isUpdating: PropTypes.bool,
  userDataUpdate: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
};
ProfileForm.defaultProps = {
  userDataUpdate: [],
  managers: [],
  occupations: [],
  departments: [],
  centers: [],
  isUpdating: false
};

export default ProfileForm;


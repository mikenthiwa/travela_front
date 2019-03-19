import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import InputRenderer, {
  FormContext,
  getDefaultBlanksValidatorFor
} from '../FormsAPI';
import ProfileDetails from './FormFieldsets/ProfileDetails';
import './ProfileForm.scss';
import Validator from '../../../validator';

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

  componentWillReceiveProps(nextProps){
    const { userData, userDataUpdate: { result }, managers, isUpdating } = nextProps;

    if(userData !== undefined && !isUpdating){
      const { passportName, gender, department, occupation, manager, location } = userData;
      const userGender = result ? result.gender : gender;
      this.setState((prevState) => ({
        ...prevState,
        values: {
          name: Validator.databaseValueValidator(passportName),
          gender: Validator.databaseValueValidator(userGender),
          department: Validator.databaseValueValidator(department),
          role: Validator.databaseValueValidator(occupation),
          manager: Validator.databaseValueValidator(manager),
          location: Validator.databaseValueValidator(location)
        }
      }));
      this.checkManager(managers);
      this.setState((prevState => ( {
        userProfile: prevState.values,
        hasBlankFields: true
      })));
    }
  }

  checkManager = (managers,value) => {
    const { values } = this.state;
    const managerChoices = managers.map(manager => manager.fullName);
    const manager = value ? value : values.manager;

    // if manager in manager input box is not in database
    if ( managerChoices.length && managerChoices.indexOf(manager) === -1){
      this.setManagerError();
    } else {
      this.setState((prevState) => {
        const newError =  { ...prevState.errors, manager: '' };
        return { ...prevState, errors: { ...newError }, hasBlankFields: false };
      });
    }
  }

  onChangeManager = value => {
    const { managers } = this.props;
    // save input
    this.setState((prevState) => {
      const newState = { ...prevState.values, manager: value };
      return { ...prevState, values: { ...newState } };
    });
    this.checkManager(managers,value);
  }

  submitProfileForm = event => {
    event.preventDefault();
    const { updateUserProfile, user} = this.props;

    const userId = user.UserInfo.id;
    const { values } = this.state;
    if (this.validate) {
      let data = { ...values };
      data.passportName = data.name;
      data.occupation = data.role;

      updateUserProfile(data, userId, true);
      this.setState({hasBlankFields: true});
      localStorage.setItem('location', values.location);
    }
  };

  setManagerError = () => {
    return this.setState((prevState) => {
      const newError =  {
        ...prevState.errors,
        manager: 'Please select a manager from the dropdown'
      };
      return { ...prevState, errors: { ...newError } };
    });
  };

  handleClearForm = () => {
    this.setState((prevState => ({
      ...this.defaultState,
      values: {...prevState.userProfile},
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
    const { managers, centers, isUpdating } = this.props;
    return (
      <FormContext targetForm={this} validatorName="validate" values={values} errors={errors}>
        <form onSubmit={this.submitProfileForm} className="new-profile">
          <ProfileDetails
            values={values}
            onChangeManager={this.onChangeManager}
            managers={managers}
            centers={centers} />
          {hasBlankFields || errors.manager || isUpdating ? (
            <div className="submit-area">
              <button
                type="submit"
                id="btn-update"
                disabled={hasBlankFields}
                className="profile-bg-btn bg-btn bg-btn--inactive">
                { isUpdating ? <i className="loading-icon" /> : '' }
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
  centers: [],
  isUpdating: false
};

export default ProfileForm;


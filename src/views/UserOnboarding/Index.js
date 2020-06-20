import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import './userOnboardingForm.scss';
import OnBoardingTabHead from '../../components/RequestTab/OnboardingTabHead';
import ConfirmPersonalDetailsFieldset from '../../components/Forms/NewRequestForm/FormFieldsets/ConfirmPersonalDetails';
import travelStipendHelper from '../../helper/request/RequestUtils';
import FormContext from '../../components/Forms/FormsAPI/FormContext/FormContext';
import getDefaultBlanksValidatorFor from '../../components/Forms/FormsAPI/formValidator/confirmUserDetails';
import WelcomePage from '../../components/WelcomePage';
import UploadPassportPage from '../../components/PassportUpload/UploadPassport';

class UserOnboarding extends Component {
  constructor(props) {
    super(props);
    this.setUp();
    this.state = {
      ...this.defaultState,
      currentPage: 1,
      currentTab: 1,
      currentOrigin: 0,
    };
    this.validate = getDefaultBlanksValidatorFor(this);
  }

  componentDidMount() {
    const { managers } = this.props;
    const { values } = this.state;
    const managerChoices = managers.map(manager => manager.fullName);
    values.manager !== ''
      && managerChoices === [];

  }

  setUp = () => {
    const { managers } = this.props;
    const { name, gender, department, role, manager, location } = this.getPersonalDetails();
    const managerName = travelStipendHelper.getManagerNameOrId(managers, manager);
    this.defaultState = {
      values: {
        name: name,
        gender,
        department,
        role,
        location,
        manager: managerName,
      },
      errors: {},
      hasBlankFields: true,
      collapse: false,
      parentIds: 1,
      steps: [
        {
          id: 1,
          position: 1,
          name: 'Personal Information',
        },
        {
          id: 2,
          position: 2,
          name: 'Travel Document',
        },
      ],
    };
  };
  getPersonalDetails = (editing, detailsSource) => {
    const { userData, userDataUpdate: { result } } = this.props;
    const personalDetails = {};
    const personalDetailsAttributes = [
      'name',
      'gender',
      'department',
      'role',
      'manager',
      'location'
    ];
    const userGender = result ? result.gender : userData.gender;
    personalDetailsAttributes.map(attrb => {
      if (userData) {
        if (editing)
          return (personalDetails[attrb] = detailsSource[attrb]);
        userData.name = userData.passportName;
        userData.role = userData.occupation;
        userData.gender = userGender;
        let value = userData[attrb];
        value = !/^null|undefined$/.test(value) ? value : '';
        return (personalDetails[attrb] = value);
      }
    });
    return personalDetails;
  };
  handleSubmit = () => {
    const { updateUserProfile, user, managers } = this.props;
    const userId = user.UserInfo.id;
    const { values } = this.state;
    if (this.validate) {
      const managerId = travelStipendHelper.getManagerNameOrId(managers, values.manager);
      const data = {
        fullName: values.name,
        passportName: values.name,
        occupation: values.role,
        manager: managerId,
        location: values.location,
        gender: values.gender,
        department: values.department,
      };
      updateUserProfile(data, userId, true);
      this.setState({ hasBlankFields: true });
      localStorage.setItem('location', values.location);
    }

  }

  changeState = (InputState, ErrorMessageState, errorMessage, value) => {
    const { occupations, managers } = this.props;
    const getUser = this.getPersonalDetails();
    const userDepartment = Object.keys(getUser).map((key) => {
      return [(key), getUser[key]];
    });
    const mainDepartment = userDepartment.filter(department => department.includes('department'));
    const mainLocation = userDepartment.filter(location => location.includes('location'));
    this.setState((prevState) => {
      const newState = { ...prevState.values, ...InputState };
      return { ...prevState, values: { ...newState } };
    });
    const departmentSuggestionChoices = 'manager' in InputState ? managers.map(manager => manager.fullName) :
      mainDepartment.map(department => department[1]);
    const locationSuggestionChoices  = 'manager' in InputState ? managers.map(manager => manager.fullName) :
      mainLocation.map(location => location[1]);
    const NameManagerSuggestionChoices = 'manager' in InputState ? managers.map(manager => manager.fullName) :
      occupations.map(occupation => occupation.occupationName);
    if ((NameManagerSuggestionChoices.indexOf(value) === -1) && (locationSuggestionChoices.indexOf(value) === -1) &&
      (departmentSuggestionChoices.indexOf(value) === -1)) return this.setError(errorMessage);
    return this.setState((prevState) => {
      const newError = { ...prevState.errors, ...ErrorMessageState };
      return { ...prevState, errors: { ...newError } };
    });
  }
  onChangeAutoSuggestion = (type, value) => {
    let errorMessage = { manager: 'No manager with the name exists' };
    let rolesErrorMessage = { role: 'No role with the name exists' };
    let departmentErrorMessage = { department: 'No department with the name exists' };
    let locationErrorMessage = { location: 'No location with the name exists' };
    const managerInputState = { 'manager': value };
    const managerErrorMessageState = { 'manager': '' };
    const occupationErrorMessageState = { 'role': '' };
    const occupationInputState = { 'role': value };
    const departmentInputState = { 'department': value };
    const departmentErrorMessageState = { 'department': '' };
    const locationInputState = { 'location': value };
    const locationErrorMessageState = { 'location': '' };
    switch (type) {
    case 'manager':
      this.changeState(managerInputState, managerErrorMessageState, errorMessage, value);
      break;
    case 'role':
      this.changeState(occupationInputState, occupationErrorMessageState, rolesErrorMessage, value);
      break;
    case 'department':
      this.changeState(departmentInputState, departmentErrorMessageState, departmentErrorMessage, value);
      break;
    case 'location':
      this.changeState(locationInputState, locationErrorMessageState, locationErrorMessage, value);
      break;
    default:
      null;
    }
  };
  setError = (errorMessage) => {
    return this.setState((prevState) => {
      const newError = {
        ...prevState.errors,
        ...errorMessage
      };
      return { ...prevState, errors: { ...newError } };
    });
  };


  nextStep = (e) => {
    e.preventDefault();
    const { steps, currentPage, currentTab } = this.state;
    if (currentPage !== 2) {
      this.setState({
        currentPage: currentPage + 1
      });
    } else {
      if (currentTab !== 2) {
        this.handleSubmit();
        this.setState({
          currentTab: currentTab + 1,
          currentPage: currentPage + 1
        });
      }
    }
  };

  previousStep = () => {
    const { currentPage , currentTab } = this.state;
    if (currentPage === 3) {
      this.setState({ currentPage: currentPage - 1, currentTab: currentTab -1 });
    }
  };

  renderPersonalDetailsFieldset = () => {
    const { collapse, title, position, line, values, errors } = this.state;
    const { managers, occupations, creatingRequest, departments, userData: { department } } = this.props;

    const existingDepartment = department;

    const getUserDetails = this.getPersonalDetails();
    return (
      <div>
        <ConfirmPersonalDetailsFieldset
          departments={departments}
          existingDepartment={existingDepartment}
          values={values}
          savePersonalDetails={this.savePersonalDetails}
          onChangeAutoSuggestion={this.onChangeAutoSuggestion}
          collapsible={this.collapsible}
          collapse={collapse}
          getUserDetails={getUserDetails}
          managers={managers}
          occupations={occupations}
          value="100%"
          hasBlankFields={
            !!errors.manager || !!errors.role || !!errors.department || !!errors.name || !!errors.location
          }
          loading={creatingRequest}
          send="Next"
          nextStep={this.nextStep}
        />
      </div>

    );
  };

  savePersonalDetails(personalDetails) {
    Object.keys(personalDetails).forEach(key => {
      localStorage.setItem(key, personalDetails[key]);
    });
  }

  renderWelcomePage = () => {
    const { errors } = this.state;
    const { creatingRequest, userData } = this.props;
    return (
      <div className="user_onboarding">
        <WelcomePage
          nextStep={this.nextStep}
          hasBlankFields={
            !!errors.manager
          }
          send="Get Started"
          loading={creatingRequest}
          fullName={userData.fullName}
        />
      </div>
    );
  }
  renderUploadPassportPage = () => {
    const { history } = this.props;
    return (
      <div>
        <UploadPassportPage history={history} />

        <button
          type="button"
          className="back-btn-travel-document back-btn--active"
          onClick={this.previousStep}
        >
       Back
        </button>

      </div>
    );
  }

  renderForm = () => {
    const {
      errors, values,
      steps, currentPage, currentTab,
    } = this.state;
    const {
      editing, history,
    } = this.props;
    return (
      <div className="width-911">
        {currentPage !== 1 ? (
          <OnBoardingTabHead
            steps={steps} currentTab={currentTab}
            currentPage={currentPage} editing={editing} history={history} />
        ) : null}
        <FormContext
          steps={steps}
          editing={editing} history={history}
          currentPage={currentPage}
          currentTab={currentTab}
          targetForm={this}
          values={values}
          errors={errors}
          validatorName="validate">
          <form onSubmit={() => this.handleSubmit()} className="new-request">
            { currentPage === 1 && this.renderWelcomePage()}
            { currentPage === 2 && this.renderPersonalDetailsFieldset()}
            { currentPage === 3 &&this.renderUploadPassportPage()}
          </form>
        </FormContext>
      </div>

    );

  };
  render() {
    return <div>{this.renderForm()}</div>;
  }
}

UserOnboarding.propTypes = {
  user: PropTypes.object.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
  userData: PropTypes.object,
  managers: PropTypes.array,
  departments: PropTypes.array,
  occupations: PropTypes.array,
  creatingRequest: PropTypes.bool,
  editing: PropTypes.bool,
  userDataUpdate: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  history: PropTypes.object,
};

UserOnboarding.defaultProps = {
  creatingRequest: false,
  editing: false,
  managers: [],
  departments: [],
  occupations: [],
  userData: {},
  userDataUpdate: [],
  history: {}
};

export default UserOnboarding;

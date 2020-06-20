import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { getDefaultBlanksValidatorFor } from '../../FormsAPI';
import './NewRequestForm.scss';
import '../RequestLoader.scss';
import newSteps from '../../../../helper/newSteps';
import setDropdownLocation from '../../../../scripts/dropdownLocation';
import '../TravelCosts/TravelCosts.scss';
import setupEditState from './setupEditState';
import setUp from './setUp';
import onChangeDate from './onChangeDate';
import handleRadioButton from './handleRadioButton';
import onChangeInput from './onChangeInput';
import handleSubmit from './handleSubmit';
import { addNewTrip, removeTrip, getTrips, setTrips } from './Trips';
import handleReason from './handleReason';
import renderPersonalDetailsFieldset from './renderPersonalDetailsFieldset';
import renderTravelDetailsFieldset from './renderTravelDetailsFieldset';
import renderTravelCosts from './renderTravelCosts';
import renderSubmitArea from './renderSubmitArea';
import renderTravelCheckList from './renderTravelCheckList';
import renderForm from './renderForm';
import { nextStep, backStep } from './steps';
import handleEditForm from './handleEditForm';
import refreshValues from './refreshValues';
import { showComments, handleComment } from './commentHandler';
import getPersonalDetails from './getPersonalDetails';
import { checkLowerDate, checkSameDate } from './verifyDates';

class NewRequestForm extends PureComponent {
  constructor(props) {
    super(props);
    this.setUp = setUp.bind(this);
    this.setUp();
    this.state = {
      ...this.defaultState,
      currentOrigin: 0
    };
    this.validate = getDefaultBlanksValidatorFor(this);
    this.checkLowerDate = checkLowerDate.bind(this);
    this.checkSameDate = checkSameDate.bind(this);
    this.setupEditState = setupEditState.bind(this);
    this.onChangeDate = onChangeDate.bind(this);
    this.handleRadioButton = handleRadioButton.bind(this);
    this.onChangeInput = onChangeInput.bind(this);
    this.handleSubmit = handleSubmit.bind(this);
    this.handleReason = handleReason.bind(this);
    this.handleEditForm = handleEditForm.bind(this);
    this.refreshValues = refreshValues.bind(this);
    this.addNewTrip = addNewTrip.bind(this);
    this.removeTrip = removeTrip.bind(this);
    this.getTrips = getTrips.bind(this);
    this.setTrips = setTrips.bind(this);
    this.nextStep = nextStep.bind(this);
    this.backStep = backStep.bind(this);
    this.getPersonalDetails = getPersonalDetails.bind(this);
    this.showComments = showComments.bind(this);
    this.handleComment = handleComment.bind(this);
    this.renderPersonalDetailsFieldset = renderPersonalDetailsFieldset.bind(this);
    this.renderTravelDetailsFieldset = renderTravelDetailsFieldset.bind(this);
    this.renderTravelCosts = renderTravelCosts.bind(this);
    this.renderSubmitArea = renderSubmitArea.bind(this);
    this.renderTravelCheckList = renderTravelCheckList.bind(this);
    this.renderForm = renderForm.bind(this);
  }

  componentDidMount() {
    const { managers, fetchAllTravelStipends } = this.props;
    const { values } = this.state;
    const managerChoices = managers.map(manager => manager.fullName);
    // if manager in manager input box is not in database
    if (
      values.manager !== ''
      && managerChoices === []
      && managerChoices.indexOf(values.manager) === -1
    ) this.setManagerError();
    fetchAllTravelStipends();
    this.setupEditState();
    window.addEventListener('scroll', this.locationDropdownStick, true);
  }

  componentDidUpdate(prevProps, prevState) {
    const { values, trips, selection } = this.state;
    if ((
      (prevState.values.gender !== values.gender) || (prevState.values.role !== values.role))
      && selection !== 'oneWay') {
      trips.map((trip, index) => {
        this.handlePickBed(null, index, false);
      });
    }
    this.checkTab(prevState);
  }

  componentWillUnmount() {
    const { fetchUserRequests, fetchAvailableRoomsSuccess } = this.props;
    fetchUserRequests();
    fetchAvailableRoomsSuccess({ beds: [] });
    window.removeEventListener('scroll', this.locationDropdownStick, true);
  }

  locationDropdownStick = () => {
    const { currentOrigin } = this.state;
    const target = `origin-${currentOrigin}`;
    const dropdown = document.getElementsByClassName('pac-container');
    if (dropdown) setDropdownLocation(target, 0);
  }

  setCurrentOrigin = currentOrigin => this.setState({ currentOrigin });

  getDefaultTripStateValues = (index, valueObj) => ({
    [`origin-${index}`]: valueObj && valueObj.origin || '',
    [`destination-${index}`]: '',
    [`arrivalDate-${index}`]: null,
    [`departureDate-${index}`]: null,
    [`otherReasons-${index}`]: '',
    [`reasons-${index}`]: '',
    [`bed-${index}`]: '',
  });

  collapsible = () => {
    const { collapse } = this.state;
    if (!collapse) {
      this.setState({
        collapse: true,
        title: 'Show Details',
        position: 'rotate(266deg)',
        line: 'none'
      });
    } else {
      this.setState({
        collapse: false,
        title: 'Hide Details',
        position: 'none',
        line: '1px solid #E4E4E4'
      });
    }
  };

  validator = (trips) => {
    const { editing, requestOnEdit, validateTrips } = this.props;
    const { steps, currentTab } = this.state;
    validateTrips(
      { ...trips, editing, id: requestOnEdit.id },
      () => this.setState({
        currentTab: 3, isLoading: false, steps: newSteps(steps, currentTab)
      }),
      () => this.setState({ isLoading: false, hasBlankFields: true })
    );
  };

  handlePickBed = (bedId, tripIndex, updateTrip = true) => {
    const fieldName = `bed-${tripIndex}`;
    this.setState(prevState => {
      const { trips } = prevState;
      if (updateTrip) trips[tripIndex].bedId = bedId;
      return {
        ...prevState,
        values: {
          ...prevState.values,
          [fieldName]: bedId
        },
        trips
      };
    }, () => {
      this.validate(fieldName);
    });
  };

  onEditCancelHandler = () => {
    const { history } = this.props;
    history.push('/requests');
  };

  getStipendOriginAndDestination = (trips) => {
    const locations = trips.map(trip => {
      const { origin, destination } = trip;
      return { origin, destination };
    });
    return locations;
  };

  checkTab(prevState) {
    const { currentTab, trips, selection: tripType } = this.state;
    if (prevState.currentTab === 2 && currentTab === 3) {
      const { fetchTravelCostsByLocation, fetchAllTravelStipends } = this.props;
      let locations = tripType === 'One Way' ? [] : this.getStipendOriginAndDestination(trips);
      fetchTravelCostsByLocation(locations);
      fetchAllTravelStipends();
    }
    if (prevState.currentTab !== currentTab) {
      this.setState({ collapse: false });
    }
  }

  savePersonalDetails (personalDetails) {
    Object.keys(personalDetails).forEach(key => {
      localStorage.setItem(key, personalDetails[key]);
    });
  }

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

NewRequestForm.propTypes = {
  managers: PropTypes.array,
  editing: PropTypes.bool,
  requestOnEdit: PropTypes.object,
  fetchUserRequests: PropTypes.func.isRequired,
  fetchAvailableRoomsSuccess: PropTypes.func.isRequired,
  history: PropTypes.object,
  fetchAllTravelStipends: PropTypes.func.isRequired,
  fetchTravelCostsByLocation: PropTypes.func,
  validateTrips: PropTypes.func.isRequired,
};

NewRequestForm.defaultProps = {
  editing: false,
  managers: [],
  requestOnEdit: {
    trips: []
  },
  history: {},
  fetchTravelCostsByLocation: () => {},
};

export default NewRequestForm;

import React, {PureComponent} from 'react';
import {PropTypes} from 'prop-types';
import Script from 'react-load-script';
import {isEqual, pick} from 'lodash';
import moment from 'moment';
import toast from 'toastr';
import {FormContext, getDefaultBlanksValidatorFor} from '../FormsAPI';
import PersonalDetailsFieldset from './FormFieldsets/PersonalDetails';
import TravelDetailsFieldset from './FormFieldsets/TravelDetails';
import SubmitArea from './FormFieldsets/SubmitArea';
import RequestTabHeader from '../../RequestTab/RequestTabHead';
import StipendDetails from './Stipend/StipendDetails';
import './NewRequestForm.scss';
import './RequestLoader.scss';
import tabIcons from '../../../images/icons/new-request-icons';
import travelStipendHelper from '../../../helper/request/RequestUtils';
import hideSection from '../../../helper/hideSection';
import newSteps from '../../../helper/newSteps';
import TravelChecklistsCard from './FormFieldsets/TravelChecklistsCard';
import PendingApprovals from './FormFieldsets/PendingApprovalsCard';
import setDropdownLocation from '../../../scripts/dropdownLocation';
import BackButton from '../BackButton';

class NewRequestForm extends PureComponent {
  constructor(props) {
    super(props);
    this.setUp();
    this.state = {
      ...this.defaultState,
      currentOrigin: 0
    };
    this.validate = getDefaultBlanksValidatorFor(this);
  }

  componentDidMount() {
    const {managers, fetchAllTravelStipends} = this.props;
    const {values} = this.state;
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
    const {values, trips, selection, currentTab } = this.state;
    if ((
      (prevState.values.gender !== values.gender) || (prevState.values.role !== values.role))
      && selection !== 'oneWay') {
      trips.map((trip, index) => {
        this.handlePickBed(null, index, false);
      });
    }
  }

  componentWillUnmount() {
    const {fetchUserRequests, fetchAvailableRoomsSuccess} = this.props;
    fetchUserRequests();
    fetchAvailableRoomsSuccess({beds: []});
    window.removeEventListener('scroll', this.locationDropdownStick, true);
  }

  setupEditState() {
    const {editing, requestOnEdit, userData: {location}} = this.props;
    const {trips, tripType} = requestOnEdit;
    if (editing && requestOnEdit && trips.length > 0) {
      trips.map(eachTrip => {
        if (eachTrip.accommodationType === 'Not Required') {
          eachTrip.bedId = -2;
        } else if (eachTrip.accommodationType === 'Hotel Booking') {
          eachTrip.bedId = -1;
        }
      });
      this.handleEditForm();
      const defaultTripStateValues = this.getDefaultTripStateValues(0);
      const editTripsStateValues = editing ? this.getTrips(requestOnEdit) : {};
      const requestTrips = editing ? this.setTrips(requestOnEdit) : [{}];
      const {name, gender, department, role, manager} = this.getPersonalDetails(
        editing,
        requestOnEdit
      );

      const values = {
        name: name,
        gender,
        department,
        role,
        location,
        manager,
        ...defaultTripStateValues,
        ...editTripsStateValues,
      };
      this.setState({
        values,
        selection: tripType,
        trips: requestTrips,
        prevValues: values,
        prevTrips: requestTrips
      }, () => {
        this.checkLowerDate();
        this.checkSameDate();
        this.validate();
      });
    }
  }

  locationDropdownStick = () => {
    const { currentOrigin } = this.state;
    const target = `origin-${currentOrigin}`;
    const dropdown = document.getElementsByClassName('pac-container');
    if (dropdown) setDropdownLocation(target, 0);
  }

  setCurrentOrigin = currentOrigin => this.setState({ currentOrigin });

  setUp = () => {
    const status = 'You are currently here';
    const {editing, requestOnEdit} = this.props;
    const {name, gender, department, role, manager, location} = this.getPersonalDetails(
      editing,
      requestOnEdit
    );
    const defaultTripStateValues = this.getDefaultTripStateValues(0);
    this.defaultState = {
      optionalFields: ['bedId'],
      values: {
        name: name,
        gender,
        department,
        role,
        location,
        manager,
        ...defaultTripStateValues
      },
      trips: [{}],
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
        {id: 3, name: 'Travel Stipends', status: '', icon: tabIcons.stipend},
        {id: 4, name: 'Travel Checklist', status: '', icon: tabIcons.checkList}
      ],
      currentTab: editing ? 2 : 1,
      isLoading: false
    };
    this.stipendField = React.createRef();
  };

  getPersonalDetails = (editing, detailsSource) => {
    const {userData, userDataUpdate: {result}} = this.props;
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

  setTrips = requestOnEdit => {
    const {trips} = requestOnEdit;
    let allTrips = [];
    trips.map(trip => allTrips.push(trip));
    return allTrips;
  };

  getTrips = requestOnEdit => {
    const {trips, tripType} = requestOnEdit;
    const tripsStateValues = [];
    trips.map((trip, index) => {
      tripsStateValues[`origin-${index}`] = trip.origin;
      tripsStateValues[`destination-${index}`] = trip.destination;
      tripsStateValues[`arrivalDate-${index}`] = moment(trip.returnDate);
      tripsStateValues[`departureDate-${index}`] = moment(trip.departureDate);
      tripsStateValues[`bed-${index}`] = trip.bedId && trip.bedId;
      tripsStateValues[`otherReasons-${index}`] = trip.otherTravelReasons;
      tripsStateValues[`reasons-${index}`] = trip.otherTravelReasons ?
        'Other..'
        : trip.reasons && trip.reasons.title;
      if (tripsStateValues[`reasons-${index}`] !== 'Other..') {
        delete tripsStateValues[`otherReasons-${index}`];
      }
      tripsStateValues[`trip-type-${index}`] = tripType;
    });
    return tripsStateValues;
  };

  handleEditForm = () => {
    const {requestOnEdit} = this.props;
    const event = {
      target: {
        value: requestOnEdit.tripType
      }
    };
    this.handleRadioButton(event);
  };

  onChangeDate = (date, event) => {
    const {trips, selection} = this.state;
    const dateFormat = date ?  date.format('YYYY-MM-DD') : null;
    const dateWrapperId = event.nativeEvent.path[7].id || event.nativeEvent.path[4].id;
    const dateName = dateWrapperId.split('_')[0];
    const getId = dateName.split('-')[1];
    const dateStartsWithDeparture = dateName.startsWith('departure');
    const dateStartsWithArrival = dateName.startsWith('arrival');

    if (trips[getId]) {
      if (dateStartsWithDeparture) {
        trips[getId].departureDate = dateFormat;
      } else if (dateName.startsWith('arrival')) {
        trips[getId].returnDate = dateFormat;
      }
    } else {
      trips.push({
        [dateName.split('-')[0]]: dateFormat
      });
    }

    if (dateStartsWithArrival && selection === 'multi') {
      const targetFieldId = Number(getId) + 1;
      this.setState(
        prevState => {
          const {trips} = prevState;
          const newTrips = [...trips];

          if (targetFieldId < newTrips.length) {
            newTrips[targetFieldId].departureDate = dateFormat;
          }
          return {
            targetFieldId,
            values: {
              ...prevState.values,
              [`departureDate-${targetFieldId}`]: date
            },
            trips: [...newTrips]
          };
        }
      );
    }
    if (
      dateStartsWithDeparture
      && selection === 'multi'
      && `departureDate-${getId}` !== 'departureDate-0'
    ) {
      const targetFieldId = getId - 1;
      this.setState(
        prevState => {
          const {trips} = prevState;
          const newTrips = [...trips];
          newTrips[targetFieldId].arrivalDate = dateFormat;
          newTrips[targetFieldId].returnDate = dateFormat;
          return {
            targetFieldId,
            values: {
              ...prevState.values,
              [`arrivalDate-${targetFieldId}`]: date
            },
            trips: [...newTrips]
          };
        }
      );
    }
    const onPickDate =
      dateStartsWithDeparture && selection !== 'oneWay'
        ? () => this.resetTripArrivalDate(getId, dateName)
        : () => this.validate(dateName);

    this.setState(
      prevState => ({
        values: {
          ...prevState.values,
          [dateName]: date
        }
      }),
      onPickDate
    );
    // selection !== 'oneWay' &&
    this.checkSameDate();
    this.checkLowerDate();
  };

  //dates for each trip cant be the same.
  checkSameDate = () => {
    const {trips, values} = this.state;
    const tripsLength = trips.length > 1 ? trips.length - 1 : trips.length;
    const tripsDate = [];
    for (let i = 0; i < tripsLength; i++) {
      tripsDate.push(moment(trips[i].departureDate).isSame(trips[i].returnDate, 'day'));
    }
    let theBool = 0;
    for (let i = 0; i < tripsDate.length; i++){
      theBool += tripsDate[i];
    }
    if (theBool && trips[0].returnDate) {
      this.setState({isSameDate: true});
      const firstMatch = tripsDate.findIndex(trip => trip);
      trips[0].returnDate &&
      firstMatch !== -1 && toast
        .error(`Return date must be the greater than Departure date for Trip ${
          trips.length > 1 ? firstMatch + 1 : ''}`);
    } else  this.setState({isSameDate: false});
  };

  //dates can be lower than the currents days date.
  checkLowerDate = () => {
    const {trips} = this.state;
    const tripsLength = trips.length > 1 ? trips.length - 1 : trips.length;
    const tripsDate = [];
    for (let i = 0; i < tripsLength; i++) {
      tripsDate.push(moment().isAfter(trips[i].departureDate, 'day'));
    }
    const firstMatch = tripsDate.findIndex(trip => trip);
    if (firstMatch !== -1) {
      this.setState({isLowerDate: true});
      toast.error(`Date must be the greater than Today's Date for Trip ${
        trips.length > 1 ? firstMatch + 1 : ''}`);
    } else  this.setState({isLowerDate: false});
  }

  resetTripArrivalDate = (id, dateName) => {
    this.setState(
      prevState => ({
        values: {
          ...prevState.values,
          [`arrivalDate-${id}`]: null
        }
      }),
      () => this.validate(dateName)
    );
  };

  onChangeInput = event => {
    const name = event.target.name;
    const getId = event.target.dataset.parentid;
    const {trips} = this.state;
    const options = {
      types: ['(cities)']
    };
    const autocomplete = new google.maps.places.Autocomplete(
      event.target,
      options
    );
    autocomplete.addListener('place_changed', () => {
      if (autocomplete.getPlace().address_components) {
        const place = autocomplete.getPlace().address_components;
        const countryIndex = place.findIndex(addr =>
          addr.types.includes('country')
        );
        const places = place[0].long_name + ', ' + place[countryIndex].long_name;
        if (trips[getId]) {
          if (name.startsWith('destination')) {
            trips[getId].destination = places;
          } else if (name.startsWith('origin')) {
            trips[getId].origin = places;
          }
        } else {
          trips.push({
            [name.split('-')[0]]: places
          });
        }
        this.setState(
          prevState => ({
            values: {
              ...prevState.values,
              [name]: places
            }
          }), () => this.validate('bed-0')
        );
        const {selection} = this.state;
        if (selection !== 'oneWay') {
          this.handlePickBed(null, getId, false);
        }

        if (name.startsWith('destination') && selection === 'multi') {
          const targetFieldId = Number(getId) + 1;
          this.setState(
            prevState => {
              const {trips} = prevState;
              const newTrips = [...trips];

              if (targetFieldId < newTrips.length) {
                newTrips[targetFieldId].origin = places;
              }
              return {
                targetFieldId,
                values: {
                  ...prevState.values,
                  [`origin-${targetFieldId}`]: places
                },
                trips: [...newTrips]
              };
            }
          );
        }
      }
    });
  };

  handleRadioButton = event => {
    const { editing } = this.props;
    let {collapse, trips, values, selection, prevValues, prevTrips = []} = this.state;
    const tripType = event.target.value;
    const { requestOnEdit: { trips: nextTrips } } = this.props;
    this.setState({selection: tripType});
    const newTrips = prevTrips.map((trip, index) => ({...trip, ...trips[index]}));
    prevValues && prevValues['arrivalDate-0'] ? delete prevValues['arrivalDate-0'] : null;
    values && values['arrivalDate-0'] ? delete values['arrivalDate-0'] : null;
    this.setState(
      {
        prevTrips: newTrips,
        prevValues: {...prevValues, ...values}
      }, () => this.validate());
    if (tripType === 'multi' && !collapse) {
      let parentIds,
        secondTripStateValues = {};
      if (newTrips.length > 1) {
        parentIds = newTrips.length || nextTrips.length;
        trips = newTrips;

      } else {
        parentIds = 2;
        trips = [].concat([trips[0] || {}, {
          origin: trips[0].destination,
          departureDate: null,
        }]);
      }
      secondTripStateValues = (editing && newTrips.length > 1) ? {} : this.getDefaultTripStateValues(1, trips[1]);
      this.setState(prevState => ({
        parentIds,
        trips,
        values: {...prevState.prevValues, ...secondTripStateValues}
      }), () => this.validate());
    } else if (!collapse) {
      this.setState(prevState => {
        const {newValues, trips} = this.refreshValues(prevState, tripType);
        return {
          parentIds: 1,
          values: newValues,
          isSameDate: false,
          isLowerDate: false,
          trips: trips || [{}]
        };
      }, () => this.validate());
    } else {
      this.setState(prevState => {
        const {newValues, trips} = this.refreshValues(prevState, tripType);
        return {
          parentIds: 1,
          values: newValues,
          trips: trips || [{}]
        };
      }, () =>this.validate());
      this.collapsible();
    }

    trips[0].travelReasons &&
      !trips[0].otherTravelReasons &&
         this.handleReason(values['reasons-0'],0,null);

    this.checkLowerDate();
    this.checkSameDate();
    selection !== 'oneWay'  && setTimeout(() => this.validate('reasons-0'), 100);
    tripType === 'return'  && !values['arrivalDate-0'] ?
      (() => {
        setTimeout(this.setState({isSameDate: true}), 150);
      })():
      null;
  };

  getDefaultTripStateValues = (index, valueObj) => ({
    [`origin-${index}`]: valueObj && valueObj.origin || '',
    [`destination-${index}`]: '',
    [`arrivalDate-${index}`]: null,
    [`departureDate-${index}`]: null,
    [`otherReasons-${index}`]: '',
    [`reasons-${index}`]: '',
    [`bed-${index}`]: '',
  });

  refreshValues = (prevState, tripType) => {
    // squash state.values to the shape defaultState keeping the values from state
    const {prevValues: values, prevTrips: trips} = prevState;
    let newValues = {...this.defaultState.values};
    Object.keys(newValues).map(
      inputName => (newValues[inputName] = values[inputName])
    );
    if (tripType === 'oneWay') {
      let newTrip = {...trips[0]};
      delete newValues['arrivalDate-0'];
      delete newTrip.returnDate;
      trips[0] = newTrip;
      const slicedTrips = trips.slice(0, 1);
      return {newValues, trips: slicedTrips};
    }
    if (tripType === 'return') {
      let newTrip = {...trips[0]};
      delete newValues['arrivalDate-0'];
      delete newTrip.returnDate;
      trips[0] = newTrip;
      const slicedTrips = trips.slice(0, 1);
      return {newValues, trips: slicedTrips};
    }
    return {newValues, trips};
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      handleCreateRequest,
      handleEditRequest,
      editing,
      requestOnEdit,
      updateUserProfile,
      userData,
      user,
      history
    } = this.props;
    const {values, selection, trips, stipend, stipendBreakdown, comments} = this.state;
    userData.name = userData.passportName;
    userData.role = userData.occupation;

    const attrb = ['name', 'gender', 'role', 'department', 'manager', 'location'];
    const defaultUserData = pick(userData, attrb);
    const newUserData = pick(values, attrb);
    const newData = {
      ...newUserData,
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

    let data = {...newData};
    if (this.validate() && editing) {
      data.stipendBreakdown = data.stipendBreakdown || [];
      handleEditRequest(requestOnEdit.id,data, history);
    } else {
      handleCreateRequest(data, history);
    }
    const checkBoxState = localStorage.getItem('checkBox');
    if (checkBoxState === 'clicked') {
      if (!isEqual(newUserData, defaultUserData)) {
        values.passportName = values.name;
        values.occupation = values.role;
        const userId = user.UserInfo.id;
        updateUserProfile(values, userId);
        this.savePersonalDetails({location: values.location});
      }
    }
  };

  onChangeManager = value => {
    const {managers} = this.props;
    // save input
    this.setState((prevState) => {
      const newState = {...prevState.values, manager: value};
      return {...prevState, values: {...newState}};
    });
    const managerChoices = managers.map(manager => manager.fullName);
    // if typed manager is not in the database return error
    if (managerChoices.indexOf(value) === -1) return this.setManagerError();
    // clear out error message
    return this.setState((prevState) => {
      const newError = {...prevState.errors, manager: ''};
      return {...prevState, errors: {...newError}};
    });
  };

  setManagerError = () => {
    return this.setState((prevState) => {
      const newError = {
        ...prevState.errors,
        manager: 'That manager does not exist.'
      };
      return {...prevState, errors: {...newError}};
    });
  };

  addNewTrip = () => {
    return this.setState(prevState => {
      const {parentIds, values, trips} = prevState;
      const addedTripStateValues = this.getDefaultTripStateValues(parentIds);
      const nextDepartureField = `departureDate-${parentIds}`;
      const lastArrivalValue = values[`arrivalDate-${parentIds - 1}`];
      const nextOriginField = `origin-${parentIds}`;
      const lastDepartureLocation = values[`destination-${parentIds - 1}`];
      addedTripStateValues[nextDepartureField] = lastArrivalValue;
      addedTripStateValues[nextOriginField] = lastDepartureLocation;
      const newTripDepartureDate = lastArrivalValue && lastArrivalValue.format('YYYY-MM-DD');

      return {
        parentIds: parentIds + 1,
        optionalFields: [prevState.optionalFields[0], `arrivalDate-${parentIds}`],
        trips: trips.concat([{
          departureDate: newTripDepartureDate,
          origin: lastDepartureLocation
        }]),
        values: {...values, ...addedTripStateValues}
      };
    }, () => this.validate());
  };

  removeTrip = (i) => {
    const tripProps = ['origin', 'destination', 'arrivalDate', 'departureDate', 'bed', 'reasons', 'otherReasons'];
    this.setState((prevState) => {
      let {parentIds, trips, values, errors} = prevState;
      trips.splice(i, 1);
      parentIds--;
      tripProps.map(prop => {
        // shift trips state values up a level from deleted index
        let start = i;
        while (start < parentIds) {
          values[`${prop}-${start}`] = values[`${prop}-${start + 1}`];
          start++;
        }
        // remove other redundant things from state
        delete values[`${prop}-${parentIds}`];
        delete errors[`${prop}-${i}`];
      });
      return { trips, values, parentIds, errors };
    }, () => this.validate());
  };

  collapsible = () => {
    const {collapse} = this.state;
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

  showComments = () => {
    const {collapse} = this.state;
    const {collapseValue, commentTitle} = hideSection(collapse);
    this.setState({
      collapse: collapseValue,
      commentTitle: commentTitle,
    });
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

  nextStep = (e, travelStipends) => {
    e.preventDefault();
    const { steps, currentTab, trips } = this.state;
    if (currentTab === 2) {
      this.setState({
        isLoading: true
      }, () => this.validator({ trips }));
    } if (currentTab === 3) {
      this.setState({
        stipendBreakdown: travelStipends.length ? travelStipends : undefined,
        stipend: 0
      });
    } if (currentTab !== 2) {
      this.setState({
        steps: newSteps(steps, currentTab),
        currentTab: currentTab + 1
      });
    }
  };

  backStep = (e) => {
    e.preventDefault();
    const { steps, currentTab, trips } = this.state;
    if (currentTab === 2) {
      this.setState({
        steps: newSteps(steps, currentTab - 1),
        currentTab: currentTab - 1
      });
    }
    if (currentTab !==2) {
      this.setState({
        steps: newSteps(steps, currentTab - 1),
        currentTab: currentTab - 1
      });
    }
  };

  renderPersonalDetailsFieldset = () => {
    const {collapse, title, position, line, values, errors} = this.state;
    const {managers, creatingRequest} = this.props;
    return (
      <PersonalDetailsFieldset
        values={values}
        savePersonalDetails={this.savePersonalDetails}
        onChangeManager={this.onChangeManager}
        collapsible={this.collapsible}
        collapse={collapse}
        title={title}
        position={position}
        line={line}
        managers={managers}
        value="100%"
        hasBlankFields={
          !!errors.manager
        }
        loading={creatingRequest}
        send="Next"
        completePersonalDetails={this.nextStep}
      />
    );
  };

  handlePickBed = (bedId, tripIndex, updateTrip = true) => {
    const fieldName = `bed-${tripIndex}`;
    this.setState(prevState => {
      const {trips} = prevState;
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

  handleComment = (commentText) => {
    this.setState(prevState => {
      const {comments} = prevState;
      if (commentText) {
        comments.comment = commentText;
      }
    });
  };

  handleReason = (reason, tripIndex, other) => {
    const fieldName = `reasons-${tripIndex}`;
    const otherfieldName = `otherReasons-${tripIndex}`;
    this.setState(prevState => {
      const {trips} = prevState;
      if (trips[tripIndex]) {
        if (other) {
          trips[tripIndex].otherTravelReasons = reason;
        } else {
          delete prevState.values[otherfieldName];
          trips[tripIndex].travelReasons = this.handleReasonsId(reason);
          return {
            ...prevState,
            values: {
              ...prevState.values,
              [fieldName]: reason
            },
            trips
          };
        }
      }
    }, () => {
      this.validate(fieldName);
      this.checkValidOtherReason();
    });
  };

  checkValidOtherReason = () => {
    const { trips } = this.state;
    const otherReasons = [];
    for (let i = 0; i < trips.length; i++){
      if (trips[i].travelReasons) {continue;}
      otherReasons.push(trips[i].otherTravelReasons ? trips[i].otherTravelReasons.trim() : '');
    }
    const invalidReason = otherReasons.find(reason => reason.length <= 7);
    invalidReason ? this.setState({ inValidOtherReason: true})
      : this.setState({ inValidOtherReason: false});
  }

  onEditCancelHandler = () => {
    const {history} = this.props;
    history.push('/requests');
  };

  handleReasonsId(reason) {
    const {listTravelReasons} = this.props;
    if (reason === 'Other..') {
      return null;
    } else {
      const foundReason = listTravelReasons.travelReasons.find((travelReason) => {
        return travelReason.title === reason;
      });
      return foundReason.id;
    }
  }

  savePersonalDetails(personalDetails) {
    Object.keys(personalDetails).forEach(key => {
      localStorage.setItem(key, personalDetails[key]);
    });
  }

  renderTravelDetailsFieldset = () => {
    const {selection, parentIds, values} = this.state;
    const {
      fetchAvailableRooms, availableRooms,
      editing, requestOnEdit, listTravelReasons
    } = this.props;
    return (
      <TravelDetailsFieldset
        fetchAvailableRooms={fetchAvailableRooms}
        values={values}
        value="232px"
        selection={selection}
        handleDate={this.onChangeDate}
        handleReason={this.handleReason}
        handlePickBed={this.handlePickBed}
        handleRadioButtonChange={this.handleRadioButton}
        onChangeInput={this.onChangeInput}
        parentIds={parentIds}
        addNewTrip={this.addNewTrip}
        removeTrip={this.removeTrip}
        availableRooms={availableRooms}
        editing={editing}
        requestOnEdit={requestOnEdit}
        listTravelReasons={listTravelReasons}
        setCurrentOrigin={this.setCurrentOrigin}
      />
    );
  };

  renderTravelStipend = () => {
    const {trips, selection} = this.state;
    const {travelStipends: {stipends, isLoading}} = this.props;
    let total = '';
    let travelStipends = [];
    if (!isLoading && stipends.length) {
      const {totalStipend, stipendSubTotals} = travelStipendHelper
        .getAllTripsStipend(trips, stipends, selection);
      total = totalStipend;
      travelStipends = stipendSubTotals;
    }
    return (
      <div className="personal-rectangle mdl-grid">
        {
          <StipendDetails
            stipends={stipends}
            trips={trips}
            total={total}
            travelStipends={travelStipends}
            isLoading={isLoading}           
          />
        }
        {!isLoading && (
          <div className="request-submit-area submit-area">
            <button
              onClick={e => this.nextStep(e, travelStipends)}
              disabled={isLoading}
              type="button"
              className="bg-btn bg-btn--active" id="stipend-next">
              Next
            </button>
          </div>
        )
        }
        <div className="back-btn-stipend">
          <BackButton 
            backStep={this.backStep}
          />
        </div>
      </div>
    );
  };

  renderSubmitArea = (hasBlankFields, errors, sameOriginDestination,
    selection, creatingRequest, disableOnChangeProfile, collapse,
    commentTitle, currentTab, editing,
  ) => {
    const {isLoading, isSameDate, isLowerDate, inValidOtherReason} = this.state;
    const { requestOnEdit, userData, comments } = this.props;
    return (
      <div className="trip__tab-body">
        <span className={`trip-${isLoading ? 'loading' : 'not-loading'}`}>
          <div
            id="trip-loader" />
        </span>
        {this.renderTravelDetailsFieldset()}
        <Script
          url={process.env.REACT_APP_CITY}
          onCreate={this.handleScriptCreate}
          onError={this.handleScriptError}
          onLoad={this.handleScriptLoad} />
        <div className="back-btn-request">
          <BackButton 
            backStep={this.backStep}
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
          nextStep={this.nextStep}
          currentTab={currentTab}
          collapsible={this.showComments}
          collapse={collapse}
          commentTitle={commentTitle}
          handleComment={this.handleComment}
          editing={editing}
          requestData={requestOnEdit}
          currentUser={userData}
          comments={comments}
        />
      </div>
    );
  };

  renderTravelCheckList = (
    hasBlankFields, selection, creatingRequest,
    currentTab, fetchTravelChecklist, trips,
    checklistItems, isLoading, userData, editing,
    history, isEditing
  ) => {
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
              backStep={this.backStep}
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
            onCancel={this.onEditCancelHandler}
          />
        </div>
      </div>
    );
  };

  renderForm = () => {
    const {
      errors, values, hasBlankFields, selection, trips,
      sameOriginDestination, steps, currentTab, collapse, commentTitle
    } = this.state;
    const {
      editing, creatingRequest, fetchTravelChecklist,
      travelChecklists: {checklistItems, isLoading}, userData, history, isEditing
    } = this.props;
    const {requestOnEdit} = this.props;
    const {name, gender, department, role, manager} = requestOnEdit || {};
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
          targetForm={this}
          values={values}
          errors={errors}
          validatorName="validate">
          <form onSubmit={this.handleSubmit} className="new-request">
            {currentTab === 1 &&
            this.renderPersonalDetailsFieldset()}
            {currentTab === 2 && this.renderSubmitArea(
              hasBlankFields, errors, sameOriginDestination,
              selection, creatingRequest, disableOnChangeProfile,
              collapse, commentTitle, currentTab, editing, history)
            }
            {currentTab === 3 &&
            this.renderTravelStipend()}
            {currentTab === 4 &&
            this.renderTravelCheckList(
              hasBlankFields, selection, creatingRequest,
              currentTab, fetchTravelChecklist, trips, checklistItems, isLoading, userData,
              editing, history, isEditing
            )}
          </form>
        </FormContext>
      </div>

    );
  };

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

NewRequestForm.propTypes = {
  handleCreateRequest: PropTypes.func.isRequired,
  userData: PropTypes.object,
  user: PropTypes.object.isRequired,
  updateUserProfile: PropTypes.func.isRequired,
  handleEditRequest: PropTypes.func.isRequired,
  managers: PropTypes.array,
  creatingRequest: PropTypes.bool,
  editing: PropTypes.bool,
  requestOnEdit: PropTypes.object,
  fetchUserRequests: PropTypes.func.isRequired,
  fetchAvailableRooms: PropTypes.func.isRequired,
  availableRooms: PropTypes.object.isRequired,
  fetchAvailableRoomsSuccess: PropTypes.func.isRequired,
  userDataUpdate: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object
  ]),
  listTravelReasons: PropTypes.object,
  history: PropTypes.object,
  fetchAllTravelStipends: PropTypes.func.isRequired,
  travelStipends: PropTypes.object,
  fetchTravelChecklist: PropTypes.func,
  travelChecklists: PropTypes.object,
  validateTrips: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
  comments: PropTypes.array,
};

NewRequestForm.defaultProps = {
  creatingRequest: false,
  editing: false,
  managers: [],
  userData: {},
  userDataUpdate: [],
  requestOnEdit: {
    trips: []
  },
  listTravelReasons: {},
  history: {},
  travelStipends: {
    isLoading: false,
    stipends: []
  },
  travelChecklists: {},
  fetchTravelChecklist: () => {
  },
  isEditing: false,
  comments: []
};

export default NewRequestForm;

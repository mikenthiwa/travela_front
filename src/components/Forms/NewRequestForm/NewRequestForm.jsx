import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import Script from 'react-load-script';
import { isEqual, pick } from 'lodash';
import moment from 'moment';
import { FormContext, getDefaultBlanksValidatorFor } from '../FormsAPI';
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
import TravelChecklistsCard from './FormFieldsets/TravelChecklistsCard';
import PendingApprovals from './FormFieldsets/PendingApprovalsCard';

class NewRequestForm extends PureComponent {
  constructor(props) {
    super(props);
    this.setUp();
    this.state = {
      ...this.defaultState
    };
    this.validate = getDefaultBlanksValidatorFor(this);
  }


  componentDidMount() {
    const { modalType, managers } = this.props;
    const { values } = this.state;
    if (modalType === 'edit request') {
      const { trips } = this.state;
      trips.map(eachTrip => {
        if (eachTrip.accommodationType === 'Not Required') {
          eachTrip.bedId = -2;
        } else if (eachTrip.accommodationType === 'Hotel Booking') {
          eachTrip.bedId = -1;
        }
      });
      this.handleEditForm();
    }
    const managerChoices = managers.map(manager => manager.fullName);
    // if manager in manager input box is not in database
    if (
      values.manager !== ''
      && managerChoices === []
      && managerChoices.indexOf(values.manager) === -1
    ) this.setManagerError();
  }

  componentDidUpdate(prevProps, prevState) {
    const { values, trips, selection, currentTab } = this.state;
    if ((
      (prevState.values.gender !== values.gender) || (prevState.values.role !== values.role))
      && selection !== 'oneWay') {
      trips.map((trip, index) => {this.handlePickBed(null, index, false);});
    }
  }

  componentWillUnmount() {
    const { fetchUserRequests, fetchAvailableRoomsSuccess } = this.props;
    fetchUserRequests();
    fetchAvailableRoomsSuccess({ beds: [] });
  }

  setUp = () => {
    const { modalType, requestOnEdit } = this.props;
    const isEdit = modalType === 'edit request';
    const { name, gender, department, role, manager, location } = this.getPersonalDetails(
      modalType,
      requestOnEdit
    );
    const defaultTripStateValues = this.getDefaultTripStateValues(0);
    const editTripsStateValues = isEdit ? this.getTrips(requestOnEdit) : {};
    const requestTrips = isEdit ? this.setTrips(requestOnEdit) : [{}];
    this.defaultState = {
      optionalFields: ['bedId', 'arrivalDate-1', 'arrivalDate-0'],
      values: {
        name: name,
        gender,
        department,
        role,
        location,
        manager,
        ...defaultTripStateValues,
        ...editTripsStateValues
      },
      trips: requestTrips,
      comments: {},
      errors: {},
      hasBlankFields: true,
      sameOriginDestination: true,
      checkBox: 'notClicked',
      selection: 'return',
      collapse: false,
      title: 'Hide Details',
      commentTitle: 'Add Comment',
      position: 'none',
      line: '1px solid #E4E4E4',
      parentIds: 1,
      steps:[
        { id:1, name:'Personal Information', status:'You are currently here', icon: tabIcons.personal },
        { id:2, name:'Trip Details', status:'', icon: tabIcons.tripDetails },
        { id:3, name:'Travel Stipends', status:'', icon: tabIcons.stipend },
        { id:4, name:'Travel Checklist', status:'', icon: tabIcons.checkList }
      ],
      currentTab: 1,
      isLoading: false
    };
    this.stipendField = React.createRef();
  };

  getPersonalDetails = (modalType, detailsSource) => {
    const { userData, userDataUpdate : { result } } = this.props;
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
      if(userData)  {
        if (modalType === 'edit request')
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
    const { trips } = requestOnEdit;
    let allTrips = [];
    trips.map(trip => allTrips.push(trip));
    return allTrips;
  };

  getTrips = requestOnEdit => {
    const { trips } = requestOnEdit;
    const tripsStateValues = [];
    trips.map((trip, index) => {
      tripsStateValues[`origin-${index}`] = trip.origin;
      tripsStateValues[`destination-${index}`] = trip.destination;
      tripsStateValues[`arrivalDate-${index}`] = moment(trip.returnDate);
      tripsStateValues[`departureDate-${index}`] = moment(trip.departureDate);
      tripsStateValues[`bed-${index}`] = trip.bedId;

    });
    return tripsStateValues;
  };

  handleEditForm = () => {
    const { requestOnEdit } = this.props;
    const event = {
      target: {
        value: requestOnEdit.tripType
      }
    };
    this.handleRadioButton(event);
  };

  onChangeDate = (date, event) => {
    const { trips, selection } = this.state;
    const dateFormat = date.format('YYYY-MM-DD');
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

    if (dateStartsWithArrival && selection === 'multi' ) {
      const targetFieldId = Number(getId) + 1;
      this.setState(
        prevState => {
          const { trips } = prevState;
          const newTrips = [...trips];

          if (targetFieldId < newTrips.length) {
            newTrips[targetFieldId].departureDate = dateFormat; }
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
  };

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
    const { trips } = this.state;
    const options = {
      types: ['(cities)']
    };
    const autocomplete = new google.maps.places.Autocomplete(
      event.target,
      options
    );
    autocomplete.addListener('place_changed', () => {
      if (autocomplete.getPlace().address_components){
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
          }),
          this.validate
        );
        const { selection } = this.state;
        if ( selection !== 'oneWay'){
          this.handlePickBed(null, getId, false);
        }

        if (name.startsWith('destination') && selection === 'multi' ) {
          const targetFieldId = Number(getId) + 1;
          this.setState(
            prevState => {
              const { trips } = prevState;
              const newTrips = [...trips];

              if (targetFieldId < newTrips.length) { newTrips[targetFieldId].origin = places; }
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
        }}
    });
  };

  handleRadioButton = event => {
    const { modalType, requestOnEdit } = this.props;
    let { collapse, trips } = this.state;
    const tripType = event.target.value;
    this.setState(
      {
        selection: tripType
      },
      this.validate
    );
    if (tripType === 'multi' && !collapse) {
      let parentIds,
        secondTripStateValues = {};
      if (modalType === 'edit request') {
        parentIds = requestOnEdit.trips.length;
        trips = requestOnEdit.trips;
      } else {
        parentIds = 2;
        trips = [].concat([trips[0] || {}, {
          origin: trips[0].destination,
          departureDate: trips[0].returnDate
        }]);
        secondTripStateValues = this.getDefaultTripStateValues(1, trips[1]);
      }
      this.setState(prevState => ({
        parentIds,
        trips,
        values: { ...prevState.values, ...secondTripStateValues }
      }));
    } else if (!collapse) {
      this.setState(prevState => {
        const { newValues, trips } = this.refreshValues(prevState, tripType);
        return {
          parentIds: 1,
          values: newValues,
          trips: trips || [{}]
        };
      });
    } else {
      this.setState(prevState => {
        const { newValues, trips } = this.refreshValues(prevState, tripType);
        return {
          parentIds: 1,
          values: newValues,
          trips: trips || [{}]
        };
      });
      this.collapsible();
    }
  };

  getDefaultTripStateValues = (index, valueObj) => ({
    [`origin-${index}`]: valueObj && valueObj.origin || '',
    [`destination-${index}`]: '',
    [`arrivalDate-${index}`]: null,
    [`departureDate-${index}`]: valueObj && moment(valueObj.departureDate) || null,
    [`otherReasons-${index}`]: '',
    [`reasons-${index}`]: '',
    [`bed-${index}`]: '',
  });

  refreshValues = (prevState, tripType) => {
    // squash state.values to the shape defaultState keeping the values from state
    const { values, trips } = prevState;
    const newValues = { ...this.defaultState.values };
    Object.keys(newValues).map(
      inputName => (newValues[inputName] = values[inputName])
    );
    if (tripType === 'oneWay') {
      let newTrip = { ...trips[0] };
      delete newValues['arrivalDate-0'];
      delete newTrip.returnDate;
      trips[0] = newTrip;
      const slicedTrips = trips.slice(0, 1);
      return { newValues, trips: slicedTrips };
    }
    if (tripType === 'return') {
      const slicedTrips = trips.slice(0, 1);
      return { newValues, trips: slicedTrips };
    }
    return { newValues, trips };
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      handleCreateRequest,
      handleEditRequest,
      modalType,
      requestOnEdit,
      updateUserProfile,
      userData,
      user,
      history
    } = this.props;
    const { values, selection, trips, stipend, comments } = this.state;
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
      comments
    };

    if (selection === 'oneWay') {
      const departDate = newData.trips[0].departureDate;
      const newdate = new Date(departDate);
      const arrivalDate = moment(newdate);
      newData.trips[0].returnDate  = arrivalDate.add(1, 'months').format('YYYY-MM-DD');
    }

    let data = { ...newData };
    if (this.validate() && modalType === 'edit request') {
      handleEditRequest(requestOnEdit.id, data);
    }
    else {
      handleCreateRequest(data, history);
    }
    const checkBoxState = localStorage.getItem('checkBox');
    if (checkBoxState === 'clicked') {
      if (!isEqual(newUserData, defaultUserData)) {
        values.passportName = values.name;
        values.occupation = values.role;
        const userId = user.UserInfo.id;
        updateUserProfile(values, userId);
        this.savePersonalDetails({ location: values.location});
      }
    }
  };

  onChangeManager = value => {
    const { managers } = this.props;
    // save input
    this.setState((prevState) => {
      const newState = { ...prevState.values, manager: value };
      return { ...prevState, values: { ...newState } };
    });
    const managerChoices = managers.map(manager => manager.fullName);
    // if typed manager is not in the database return error
    if (managerChoices.indexOf(value) === -1) return this.setManagerError();
    // clear out error message
    return this.setState((prevState) => {
      const newError =  { ...prevState.errors, manager: '' };
      return { ...prevState, errors: { ...newError } };
    });
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

  addNewTrip = () => {
    return this.setState(prevState => {
      const { parentIds, values, trips } = prevState;
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
        optionalFields: [ prevState.optionalFields[0], `arrivalDate-${parentIds}`],
        trips: trips.concat([{
          departureDate: newTripDepartureDate,
          origin: lastDepartureLocation
        }]),
        values: { ...values, ...addedTripStateValues }
      };
    }, () => {this.validate;});
  };

  removeTrip = (i) => {
    const tripProps = ['origin', 'destination', 'arrivalDate', 'departureDate', 'bed'];
    this.setState((prevState) => {
      let { parentIds, trips, values, errors } = prevState;
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
    }, () => {this.validate;});
  };

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

  showComments = () => {
    const { collapse } = this.state;
    const { collapseValue, commentTitle } = hideSection(collapse);
    this.setState({
      collapse: collapseValue,
      commentTitle: commentTitle,
    });
  };

  validator = (trips) => {
    const newState = {
      currentTab: 3, isLoading: false
    };
    const isLoading = false;
    const { fetchAllTravelStipends, validateTrips } = this.props;
    validateTrips(trips, () => this.setState(newState), () => this.setState({ isLoading }));
    fetchAllTravelStipends();
  };
  nextStep =  (e, totalStipend) => {
    e.preventDefault();
    const {  steps, currentTab, trips } = this.state;
    if(currentTab === 2) {
      this.setState({ isLoading: true});
      return this.validator({trips});
    }
    const newSteps = steps;
    const prev = steps[currentTab-1];
    const next = steps[currentTab];
    prev.status = '';
    next.status = 'You are currently here';
    this.setState({
      steps: newSteps,
      currentTab: currentTab + 1,
    });

    if(currentTab === 3) {
      this.setState({
        stipend: totalStipend === 'N/A'
          ? 0
          : totalStipend.split(' ')[1]
      });
    }
  };

  renderPersonalDetailsFieldset = () => {
    const { collapse, title, position, line, values, hasBlankFields, errors } = this.state;
    const { managers, creatingRequest } = this.props;
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
        value="245px"
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
  }

  handleComment = (commentText) => {
    this.setState(prevState => {
      const { comments } = prevState;
      if (commentText) {
        comments.comment = commentText;
      }
    });
  }

  handleReason = (reason, tripIndex, other) => {
    const fieldName = `reasons-${tripIndex}`;
    const otherfieldName = `otherReasons-${tripIndex}`;
    this.setState(prevState => {
      const { trips } = prevState;
      if (trips[tripIndex]) {
        if(other) {
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
    }, () => this.validate());
  };

  handleReasonsId(reason) {
    const { listTravelReasons } = this.props;
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
    Object.keys(personalDetails).forEach( key => {
      localStorage.setItem(key, personalDetails[key]);
    });
  }

  renderTravelDetailsFieldset = () => {
    const { selection, parentIds, values } = this.state;
    const { fetchAvailableRooms, availableRooms,
      modalType, requestOnEdit, listTravelReasons } = this.props;
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
        modalType={modalType}
        requestOnEdit={requestOnEdit}
        listTravelReasons={listTravelReasons}
      />
    );
  };

  renderTravelStipend = ()=>{
    const { trips, selection } = this.state;
    const { travelStipends: { stipends, isLoading }  } = this.props;
    let total = '';
    let travelStipends = [];
    if(!isLoading && stipends.length) {
      const { totalStipend, stipendSubTotals } = travelStipendHelper
        .getAllTripsStipend(trips, stipends, selection);
      total = totalStipend;
      travelStipends = stipendSubTotals;
    }
    return(
      <div className="personal-rectangle">
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
              onClick={e => this.nextStep(e, total)}
              disabled={isLoading}
              type="button"
              className="bg-btn bg-btn--active" id="stipend-next">
                     Next
            </button>
          </div>
        )
        }
      </div>
    );
  };

  renderSubmitArea = (hasBlankFields, errors, sameOriginDestination, 
    selection, creatingRequest, disableOnChangeProfile, modalType,
    collapse, commentTitle, currentTab) => {
    const { isLoading } = this.state;
    return (
      <div className="trip__tab-body">
        <span className={`trip-${isLoading?'loading':'not-loading'}`}><div id="trip-loader" /></span>
        {this.renderTravelDetailsFieldset()}
        <Script
          url={process.env.REACT_APP_CITY}
          onCreate={this.handleScriptCreate}
          onError={this.handleScriptError}
          onLoad={this.handleScriptLoad} />
        <SubmitArea
          hasBlankFields={
            !hasBlankFields && !errors.manager
              ? false : true
          }
          sameOriginDestination={sameOriginDestination}
          selection={selection}
          loading={creatingRequest}
          disableOnChangeProfile={disableOnChangeProfile}
          send={modalType === 'edit request' ? 'Update Request' : 'Next'}
          nextStep={this.nextStep}
          currentTab={currentTab}
          collapsible={this.showComments}
          collapse={collapse}
          commentTitle={commentTitle}
          handleComment={this.handleComment}
        />
      </div>
    );
  };

  renderTravelCheckList =  (hasBlankFields, selection, creatingRequest,
    currentTab, fetchTravelChecklist, trips, checklistItems, isLoading, userData) => {
    return(
      <div>
        <div className="travel-checklist__tab ">
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
          <SubmitArea
            hasBlankFields={hasBlankFields = false}
            selection={selection}
            loading={creatingRequest}
            send="SUBMIT"
            currentTab={currentTab}
          />
        </div>
      </div>
    );
  };

  renderForm = () => {
    const { errors, values, hasBlankFields, selection, trips,
      sameOriginDestination, steps, currentTab, collapse, commentTitle } = this.state;
    const { modalType, creatingRequest, fetchTravelChecklist,
      travelChecklists: { checklistItems, isLoading }, userData } = this.props;
    const { requestOnEdit } = this.props;
    const { name, gender, department, role, manager } = requestOnEdit || {};
    const { name: stateName, manager: stateManager, gender: stateGender,
      department: stateDepartment, role: stateRole} = values;
    const disableOnChangeProfile = (name === stateName && gender === stateGender &&
      department === stateDepartment && role === stateRole && manager === stateManager)
      ? true : false;
    return (
      <div className="width-91">
        <RequestTabHeader steps={steps} currentTab={currentTab} />
        <FormContext
          targetForm={this}
          values={values}
          errors={errors}
          validatorName="validate">
          <form onSubmit={this.handleSubmit} className="new-request">
            { currentTab === 1 &&
              this.renderPersonalDetailsFieldset()}
            { currentTab === 2 && this.renderSubmitArea(
              hasBlankFields, errors, sameOriginDestination,
              selection, creatingRequest, disableOnChangeProfile, modalType,
              collapse, commentTitle)
            }
            { currentTab === 3 &&
              this.renderTravelStipend()}
            { currentTab === 4 && 
              this.renderTravelCheckList(
                hasBlankFields, selection, creatingRequest,
                currentTab, fetchTravelChecklist, trips, checklistItems, isLoading, userData)}
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
  modalType: PropTypes.string,
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
  validateTrips: PropTypes.func.isRequired
};

NewRequestForm.defaultProps = {
  creatingRequest: false,
  modalType: null,
  managers: [],
  userData: {},
  userDataUpdate: [],
  requestOnEdit: {},
  listTravelReasons: {},
  history: {},
  travelStipends: {
    isLoading: false,
    stipends: []
  },
  travelChecklists: {},
  fetchTravelChecklist: () => {}
};

export default NewRequestForm;

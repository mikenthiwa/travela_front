import React from 'react';
import sinon from 'sinon';
import moxios from 'moxios';
import NewRequestForm from '../NewRequestForm';
import beds from '../../../../views/AvailableRooms/__mocks__/mockData/availableRooms';
import profileMock from '../../ProfileForm/__mocks__';
import tabIcons from '../../../../images/icons/new-request-icons';
import travelStipendHelper from '../../../../helper/request/RequestUtils';


const { centers } = profileMock;

describe('<NewRequestForm />', () => {
  let wrapper, onSubmit;
  onSubmit = jest.fn();

  class AutocompleteServiceMock {
    addListener (place_changed ,callback) {
      callback( this.getPlace(), 'OK');
    }
    getPlace = () => {
      const components = {
        address_components:  [
          {long_name: 'Las Vegas', short_name: 'Las Vegas', types: ['locality', 'political']},
          {long_name: 'Las Vegas', short_name: 'Las Vegas', types: ['political']},
          {long_name: 'Las Vegas', short_name: 'Las Vegas', types: ['country', 'political']},
        ]
      };
      return components;
    }
  }
  window.url = 'http://www.goo.com';
  window.google ={
    maps: {
      places: {
        Autocomplete: AutocompleteServiceMock,
      }
    }
  };

  const props = {
    loading: false,
    hasBlankFields: false,
    user: {
      UserInfo: {
        id: '-LJNw1BsT0LP_E4l2peP',
        name: 'Collins',
      }
    },
    userData:{
      id: '2',
      fullName: 'Collins Muru',
      name: 'Collins',
      email: 'collins.muru@andela.com',
      userId: '-LJNw1BsT0LP_E4l2peP',
      passportName: 'Collins',
      department: 'Talent & Development',
      occupation: 'Software Developer',
      manager: 'Collins',
      gender: 'Male',
      createdAt: '2018-09-14T12:48:11.266Z',
      updatedAt: '2018-09-16T07:53:48.835Z',
      roleId: 401938,
      location: 'Kigali'
    },
    userDataUpdate:[],
    requestOnEdit: {
      id: '1',
      name: 'Seun Undefined',
      tripType: 'multi',
      manager: 'Faluyi Seun',
      gender: 'Male',
      department: 'Talent & Development',
      role: 'Software Developer',
      status: 'Open',
      userId: 'lorem-ipsum',
      createdAt: '2018-09-26T15:15:49.808Z',
      updatedAt: '2018-09-26T15:15:49.808Z',
      trips: [
        {
          id: '1',
          origin: 'Nairobi Kenya',
          destination: 'Lagos Nigeria',
          departureDate: '2018-09-30',
          returnDate: '2018-09-30',
          createdAt: '2018-09-27T18:49:03.626Z',
          updatedAt: '2018-09-27T18:49:43.803Z',
          requestId: 'NfR-9KoCP',
          bedId: beds[0].id,
          otherTravelReasons: 'my reason'
        }
      ],
    },
    availableRooms: {
      beds
    },
    google: {},
    getUserData: jest.fn(() => {}),
    handleCreateRequest: jest.fn(() => {}),
    updateUserProfile: jest.fn(() => {}),
    creatingRequest: false,
    handleEditRequest: jest.fn(() => {}),
    fetchUserRequests: jest.fn(() => {}),
    fetchAvailableRooms: jest.fn(() => {}),
    fetchAvailableRoomsSuccess: jest.fn(() => {}),
    fetchAllTravelStipends: jest.fn(),
    closeModal: jest.fn(),
    choices: ['director', 'chef'],
    managers: [{
      fullName: 'Test User',
      email: 'test.user@andela.com'
    },
    {
      fullName: 'Samuel Kubai',
      email: 'samuel@andela.com'
    }],
    modalType:'new model',
    listTravelReasons: { 
      travelReasons: [
        {id: 1, title: 'Bootcamp'}
      ]
    },
    travelChecklists: {
      isLoading: false,
      checklistItems: [
        {
          id: 1,
          name: 'Lagos, Nigeria'
        }
      ]
    },
    trips: [{
      trip:
      {
        destination: 'Lagos, Nigeria'
      }
    }],
    tripDestinations: {
      destination: 'Lagos, Nigeria'
    },
    fetchTravelChecklist: jest.fn(),
    centers,
    history:{
      push: jest.fn()
    },
    travelStipends: { 
      stipends:[
        {
          'id': 1,
          'amount': 100,
          'creator': {
            'fullName': 'Victor Ugwueze',
            'id': 1
          },
          'center': {
            'location': 'Lagos, Nigeria'
          }
        }
      ],
      isLoading: true
    },
    stipends:[
      {
        'id': 1,
        'amount': 100,
        'creator': {
          'fullName': 'Victor Ugwueze',
          'id': 1
        },
        'center': {
          'location': 'Lagos, Nigeria'
        }
      }
    ],
    validateTrips: jest.fn(),
  };
  const event = {
    preventDefault: jest.fn(),
    target: {
      name: 'oneWay'
    },
  };
  const handleSubmit = jest.fn();
  const handleCreateRequest = jest.fn();
  const backToTripDetails = jest.fn();

  const { requestOnEdit } = props;
  const user = localStorage.getItem('name');
  const gender = localStorage.getItem('gender');
  const department = localStorage.getItem('department');
  const role = localStorage.getItem('role');
  const manager = localStorage.getItem('manager');

  const defaultState = {
    values: {
      name: !(/^null|undefined$/).test(user) ? user : '', // FIX: need to be
      gender: !(/^null|undefined$/).test(gender) ? gender: '',
      department: !(/^null|undefined$/).test(department) ? department: '',
      role: !(/^null|undefined$/).test(role) ? role :'',
      manager: !(/^null|undefined$/).test(manager) ? manager : '',
    },
    trips: requestOnEdit.trips || [{}],
    errors: {},
    hasBlankFields: true,
    selection: 'oneWay',
    collapse: false,
    title: 'Hide Details',
    position: 'none',
    line: '1px solid #E4E4E4',
    parentIds: 1,
    steps:[
      { id:1, name:'Personal Information', status:'', icon: tabIcons.personal },
      { id:2, name:'Trip Details', status:'', icon: tabIcons.tripDetails },
      { id:3, name:'Travel Stipends', status:'', icon: tabIcons.stipend },
      { id:4, name:'Travel Checklist', status:'', icon: tabIcons.checkList }
    ],
    currentTab: 1,
  };
  process.env.REACT_APP_CITY = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD-fvLImnNbTfYV3Pd1nJuK7NbzZJNr4ug&libraries=places';

  beforeEach(() => {
    wrapper = mount(<NewRequestForm {...props} />);
    jest.resetAllMocks();
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders 4 svg images', () => {
    const fieldsets = wrapper.find('svg');
    expect(fieldsets).toHaveLength(4);
  });

  it('renders the personal details fieldset', () => {
    const personalDetails = wrapper.find('fieldset.personal-details');
    expect(personalDetails).toHaveLength(1);
  });

  it('renders three buttons', () => {
    const buttons = wrapper.find('button');
    expect(buttons).toHaveLength(3);
  });

  it('picks input values', () => {
    wrapper.find('input[name="name"]').simulate('change', {
      target: {
        name: 'name',
        value: 'John Mutuma',
        type: 'text'
      }
    });
    wrapper.update();
    expect(wrapper.state().values.name).toBe('John Mutuma');
  });

  it('validates form before sending data', () => {
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('call event when date is changed', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    const event = {
      nativeEvent: {
        path: [0,1,2,3,4,5,6,{id: 'departureDate-0_date'}]
      }
    };
    sinon.spy(shallowWrapper.instance(), 'onChangeDate');
    const date = {
      format: () => '2018-12-01'
    };
    shallowWrapper.instance().onChangeDate(date, event);
    expect(shallowWrapper.instance().onChangeDate.calledOnce).toEqual(true);
  });

  it('call event when date is changed', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    const event = {
      nativeEvent: {
        path: [0,1,2,3,4,5,6,{id: 'arrival-0_date'}]
      }
    };
    shallowWrapper.setState({
      selection: 'multi',
      parentIds: 2,
      trips: [
        {destination: 'Amsterdam North Holland', origin: 'Lagos Nigeria', departureDate: '2018-09-24', returnDate: '2018-09-30', bedId: beds[0].id},
      ]
    });
    sinon.spy(shallowWrapper.instance(), 'onChangeDate');
    const date = {
      format: () => '2018-12-01'
    };
    shallowWrapper.instance().onChangeDate(date, event);
    expect(shallowWrapper.instance().onChangeDate.calledOnce).toEqual(true);
  });

  it('call event when date is changed', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    const event = {
      nativeEvent: {
        path: [0,1,2,3,4,5,6,{id: 'departureDate-0_date'}]
      }
    };
    shallowWrapper.setState({
      selection: 'multi',
      parentIds: 2,
      trips: [
        {destination: 'Amsterdam North Holland', origin: 'Lagos Nigeria', departureDate: '2018-09-24', returnDate: '2018-09-30', bedId: beds[0].id},
      ]
    });
    sinon.spy(shallowWrapper.instance(), 'onChangeDate');
    const date = {
      format: () => '2018-12-01'
    };
    shallowWrapper.instance().onChangeDate(date, event);
    expect(shallowWrapper.instance().onChangeDate.calledOnce).toEqual(true);
  });

  it('call event when location is picked', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    const event = {
      target: {
        dataset: {
          parentid: '0'
        },
        name: 'destination-0',
      },
    };
    sinon.spy(shallowWrapper.instance(), 'onChangeInput');
    shallowWrapper.instance().onChangeInput(event);
    expect(shallowWrapper.instance().onChangeInput.calledOnce).toEqual(true);
  });

  it('call event when location is picked', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    const event = {
      target: {
        dataset: {
          parentid: '0'
        },
        name: 'destination-0',
      },
    };
    shallowWrapper.setState({
      selection: 'multi',
      parentIds: 2,
      currentTab: 2,
      trips: [
        {destination: 'Amsterdam North Holland', origin: 'Lagos Nigeria', departureDate: '2018-09-24', returnDate: '2018-09-30', bedId: beds[0].id},
      ]
    });
    sinon.spy(shallowWrapper.instance(), 'onChangeInput');
    shallowWrapper.instance().onChangeInput(event);
    expect(shallowWrapper.instance().onChangeInput.calledOnce).toEqual(true);
  });

  it('call event when location is picked', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    const event = {
      target: {
        dataset: {
          parentid: '0'
        },
        name: 'origin-0',
      },
    };
    shallowWrapper.setState({
      selection: 'multi',
      parentIds: 2,
      currentTab: 2,
      trips: [
        {destination: 'Amsterdam North Holland', origin: 'Lagos Nigeria', departureDate: '2018-09-24', returnDate: '2018-09-30', bedId: beds[0].id},
      ]
    });
    sinon.spy(shallowWrapper.instance(), 'onChangeInput');
    shallowWrapper.instance().onChangeInput(event);
    expect(shallowWrapper.instance().onChangeInput.calledOnce).toEqual(true);
  });

  it('call event when available room is picked', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    const event = {
      target: {
        dataset: {
          parentid: '0'
        },
        name: 'bed-0'
      },
    };
    shallowWrapper.setState({
      selection: 'multi',
      parentIds: 2,
      currentTab: 2,
      trips: [
        {destination: 'Amsterdam North Holland', origin: 'Lagos Nigeria', departureDate: '2018-09-24', returnDate: '2018-09-30', bedId: beds[0].id},
      ]
    });
    sinon.spy(shallowWrapper.instance(), 'onChangeInput');
    shallowWrapper.instance().onChangeInput(event);
    expect(shallowWrapper.instance().onChangeInput.calledOnce).toEqual(true);
  });

  it('should change the radio button on click to multi ', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'multi'
      },
    };
    sinon.spy(shallowWrapper.instance(), 'handleRadioButton');
    shallowWrapper.instance().handleRadioButton(event);
    expect(shallowWrapper.instance().handleRadioButton.calledOnce).toEqual(true);
  });

  it('should change the radio button on click to single and collapse true', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    shallowWrapper.instance().state.collapse=true;
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'single'
      },
    };
    sinon.spy(shallowWrapper.instance(), 'handleRadioButton');
    shallowWrapper.instance().handleRadioButton(event);
    expect(shallowWrapper.instance().handleRadioButton.calledOnce).toEqual(true);
  });

  it('should change the radio button on click to return ', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'return'
      },
    };
    sinon.spy(shallowWrapper.instance(), 'handleRadioButton');
    shallowWrapper.instance().handleRadioButton(event);
    expect(shallowWrapper.instance().handleRadioButton.calledOnce).toEqual(true);
  });

  it('should not close the personal details field if the radio button return ', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      collapse: true
    });
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'return'
      },
    };
    sinon.spy(shallowWrapper.instance(), 'handleRadioButton');
    shallowWrapper.instance().handleRadioButton(event);
    expect(shallowWrapper.instance().handleRadioButton.calledOnce).toEqual(true);
  });

  it('should change the radio button on click to return ', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      selection: 'return'
    });
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'multi'
      },
    };
    sinon.spy(shallowWrapper.instance(), 'handleRadioButton');
    shallowWrapper.instance().handleRadioButton(event);
    expect(shallowWrapper.instance().handleRadioButton.calledOnce).toEqual(true);
  });

  it('should update trip selection to oneWay on select oneWay radio', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    shallowWrapper.setState({ selection: 'return', currentTab: 2 });
    const event = {
      preventDefault: jest.fn(),
      target: {
        value: 'oneWay'
      },
    };
    const travelDetails = shallowWrapper.find('TravelDetailsFieldset').at(0);
    const tripTypeChangeListener = travelDetails.prop('handleRadioButtonChange');
    tripTypeChangeListener(event);
    expect(shallowWrapper.state().selection).toEqual('oneWay');
  });

  it('should update state when a trip is added and when it\'s removed', () => {
    expect.assertions(7);
    // a form has one trip by default
    wrapper.instance().addNewTrip();
    wrapper.instance().addNewTrip();
    expect(wrapper.instance().state.values['origin-1']).toBe('');
    expect(wrapper.instance().state.values['origin-2']).toBe('');
    expect(wrapper.instance().state.parentIds).toBe(3);
    wrapper.instance().removeTrip(1);
    expect(wrapper.instance().state.parentIds).toBe(2);
    // still have two trip, origin-1 should now be what was at origin-2 and so forth
    expect(wrapper.instance().state.values['origin-1']).toBe('');
    // after shifting state values, origin-{parentIds} in state should be undefined
    expect(wrapper.instance().state.values['origin-2']).toBe(undefined);
    expect(wrapper.instance().state.trips).toHaveLength(2);
  });

  it('should close the personal field on button click ', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      collapse: true,
      title: 'Show Details',
      position: 'rotate(266deg)',
      line: 'none'
    });
    sinon.spy(shallowWrapper.instance(), 'collapsible');
    shallowWrapper.instance().collapsible(event);
    expect(shallowWrapper.instance().collapsible.calledOnce).toEqual(true);
  });

  it('should open the personal field on button click ', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      collapse: false,
      title: 'Hide Details',
      position: 'none',
      line: '1px solid #E4E4E4'
    });
    sinon.spy(shallowWrapper.instance(), 'collapsible');
    shallowWrapper.instance().collapsible(event);
    expect(shallowWrapper.instance().collapsible.calledOnce).toEqual(true);
  });
  
  it('should be able to select female gender on button click', () => {
    let femaleButton = wrapper.find('button[data-value="Male"]');
    femaleButton.simulate('click', {
      target: {
        name: 'gender',
        getAttribute: () => {},
        dataset: {
          value: 'Female'
        }
      }
    });

    expect(wrapper.state('values').gender).toBe('Female');
  });

  it('should change the radio button on click', () => {
    let maleButton = wrapper.find('button[data-value="Male"]');
    maleButton.simulate('click', {
      target: {
        name: 'gender',
        getAttribute: () => {},
        dataset: {
          value: 'Male'
        }
      }
    });
    expect(wrapper.state('values').gender).toBe('Male');
  });

  it('should selects gender with browsers that do not support custom datasets', () => {
    let femaleButton = wrapper.find('button[data-value="Female"]');
    femaleButton.simulate('click', {
      target: {
        name: 'gender',
        getAttribute: attrib => 'Female'
      }
    });

    expect(wrapper.state('values').gender).toBe('Female');
  });

  it('should not toggle the modal if request submission failed', () => {
    wrapper.setProps({
      errors: ['error while creating a new request']
    });

    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    wrapper.instance().forceUpdate();
    wrapper.find('form').simulate('submit');
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should clear the form when the component unmounts', () => {
    const componentWillUnmount = jest.spyOn(wrapper.instance(), 'componentWillUnmount');
    wrapper.unmount();
    expect(componentWillUnmount).toHaveBeenCalledTimes(1);
  });

  it('should submit travel details ', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    localStorage.setItem('checkBox', 'clicked');
    shallowWrapper.setState({
      values: {
        name: 'Moses Gitau', // FIX: need to be refactor later
        gender: 'male',
        department: 'Talent Driven Development',
        role: 'Software Developer',
        manager: 'Samuel Kubai',
      },
      trips: [],
      selection: 'return',
    });
    const event = {
      preventDefault: jest.fn(),
    };
    sinon.spy(shallowWrapper.instance(), 'handleSubmit');
    shallowWrapper.instance().handleSubmit(event);
    expect(shallowWrapper.instance().handleSubmit.calledOnce).toEqual(true);
    expect(props.updateUserProfile).toHaveBeenCalledTimes(1);
  });

  it('should test onChangeManager()', () => {
    const shallowWrapper = mount(<NewRequestForm {...props}  />);
    localStorage.setItem('checkBox', 'clicked');
    shallowWrapper.setState({
      values: {
        name: 'Akanmu Chris',
        gender: 'male',
        department: 'Success',
        role: 'Software Developer',
        manager: 'dont exist',
      },
      trips: [],
      selection: 'return',
      stipendBreakDown: []
    });
    const inputField = shallowWrapper.find('.occupationInput');

    inputField.simulate('change', { target: { value: 'Samuel Kubai' } });
    const { manager } = shallowWrapper.state('values');
    const { manager: firstManagerError } = shallowWrapper.state('errors');
    expect(manager).toEqual('Samuel Kubai');
    expect(firstManagerError).toEqual('');

    inputField.simulate('change', { target: { value: 'will fail' } });
    const { manager: newManager } = shallowWrapper.state('values');
    const { manager: secondManagerError } = shallowWrapper.state('errors');
    expect(newManager).toEqual('will fail');
    expect(secondManagerError).toEqual('That manager does not exist.');
  });

  it('should add new trip field for multi trip  ', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      parentIds: 5
    });
    sinon.spy(shallowWrapper.instance(), 'addNewTrip');
    shallowWrapper.instance().addNewTrip();
    expect(shallowWrapper.instance().addNewTrip.calledOnce).toEqual(true);
  });

  

  xit('should save return hasBlankTrips', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    sinon.spy(shallowWrapper.instance(), 'hasBlankTrips');
    shallowWrapper.instance().hasBlankTrips(event);
    expect(shallowWrapper.instance().hasBlankTrips.calledOnce).toEqual(true);
  });

  xit('check hasBlankTrips works', ()=>{
    const wrapper = shallow(<NewRequestForm {...props} />);
    const wrapperInstance = wrapper.instance();
    wrapperInstance.state.trips = ['Nigeria', 'Ghana'];
    expect(wrapperInstance.hasBlankTrips()).toEqual([false, false]);
  });

  it('should update state with bedId when handlePickBed is called', () => {
    const wrapper = shallow(<NewRequestForm {...props} />);
    wrapper.instance().setState(defaultState);
    wrapper.instance().handlePickBed(1, 0);
    expect(wrapper.instance().state.values['bed-0']).toBe(1);
  });

  it('should update edit request', () => {
    const wrapper = shallow(<NewRequestForm {...props} />);
    wrapper.instance().setState(defaultState);
    expect(wrapper.instance().getTrips(props.requestOnEdit)['bed-0']).toBe(1);
  });

  it('should set up trips values', () => {
    const wrapper = shallow(<NewRequestForm {...props} />);
    wrapper.instance().setState(defaultState);
    expect(wrapper.instance().setTrips(props.requestOnEdit)).toEqual(props.requestOnEdit.trips);
  });

  it('should call localStorage when savePersonalDetails is called', () => {
    const wrapper = shallow(<NewRequestForm {...props} />);
    wrapper.instance().savePersonalDetails({ key: 'value'});
    expect(localStorage.getItem('key')).toEqual('value');
  });


  it('should also update the location when a request is saved', () => {
    const wrapper = shallow(<NewRequestForm {...props} />);
    localStorage.setItem('checkBox', 'clicked');
    const values = {
      name: 'Moses Gitau',
      gender: 'male',
      department: 'Talent Driven Development',
      role: 'Software Developer',
      manager: 'Samuel Kubai',
      location: 'San Fransisco'
    };
    wrapper.setState({
      values,
      trips: [],
      selection: 'return',
    });

    wrapper.find('form').simulate('submit', { preventDefault: jest.fn()});
    expect(props.updateUserProfile).toHaveBeenCalledWith(values, props.user.UserInfo.id);
    expect(localStorage.getItem('location')).toEqual('San Fransisco');
  });

  it('should set the location when on edit', () => {
    const wrapper = shallow(<NewRequestForm {...props} modalType="edit-request" />);
    expect(wrapper.state().values.location).toEqual('Kigali');

  });

  it('should set the location when on edit', () => {
    const wrapper = shallow(<NewRequestForm {...props} modalType="edit request" />);
    wrapper.setState({
      trips: [ { id: '1',
        origin: 'Nairobi Kenya',
        destination: 'Lagos Nigeria',
        departureDate: '2018-09-30',
        returnDate: '2018-09-30',
        createdAt: '2018-09-27T18:49:03.626Z',
        updatedAt: '2018-09-27T18:49:43.803Z',
        requestId: 'NfR-9KoCP',
        accomodationType: 'Not Required',
        bedId: 1 } ]
    });
    expect(wrapper.state().trips[0].origin).toEqual('Nairobi Kenya');

  });
  it('should to change to the next step ', () => {
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    const event = {
      preventDefault: jest.fn(),
    };
    sinon.spy(shallowWrapper.instance(), 'nextStep');
    shallowWrapper.instance().nextStep(event);
    expect(shallowWrapper.instance().nextStep.calledOnce).toEqual(true);
  });
  it('should call handleReasons  ', () => {
    const shallowWrapper = mount(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      currentTab: 2,
      trips:[{travelReasons:1}]
    });
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'reason-0'
      },
    };

    const selectField = shallowWrapper.find('DropdownSelect[name="reasons-0"]');
    expect(selectField.props().choices).toEqual(['Other..', 'Bootcamp']);
    selectField.simulate('change', { target: { value: 'Bootcamp' } });
    const travelReasons = shallowWrapper.state('trips');
    expect(travelReasons[0].travelReasons).toEqual(1);


    sinon.spy(shallowWrapper.instance(), 'handleReason');
    shallowWrapper.instance().handleReason('Bootcamp', 0, null);
    expect(shallowWrapper.instance().handleReason.calledOnce).toEqual(true);
  });
  it('should call handleReasons for other reasons ', () => {
    const shallowWrapper = mount(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      currentTab: 2,
      trips:[{otherTravelReasons:1}]
    });
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'reason-0'
      },
    };

    const selectField = shallowWrapper.find('DropdownSelect[name="reasons-0"]');
    selectField.simulate('change', { target: { value: 'Other..' } });
    const travelReasons = shallowWrapper.state('trips');
    expect(travelReasons[0].otherTravelReasons).toEqual(1);
    sinon.spy(shallowWrapper.instance(), 'handleReason');
    shallowWrapper.instance().handleReason('Bootcamp', null, 'conference');
    expect(shallowWrapper.instance().handleReason.calledOnce).toEqual(true);

  });
  it('should display next step on personal information  ', () => {
    const shallowWrapper = mount(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      currentTab: 1
    });
    const nextButton = shallowWrapper.find('#submit');
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'Next',
      }
    };
    nextButton.simulate('click', event);
    sinon.spy(shallowWrapper.instance(), 'renderTravelStipend');
    expect(event.preventDefault).toBeCalled();
    expect(shallowWrapper.state().currentTab).toEqual(2);
  });

  it('should display next step on submitArea', () => {
    const shallowWrapper = mount(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      currentTab: 2
    });
    const nextButton = shallowWrapper.find('#submit');
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'Next',
      }
    };
    nextButton.simulate('click', event);
    expect(shallowWrapper.state().currentTab).toEqual(2);

  });

  it('should set otherTravelReasons in state when handleReason is called', () => {
    const tripIndex = 0;
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      trips: [
        {otherTravelReasons: ''},
      ]
    });
    shallowWrapper.instance().handleReason('reason', tripIndex, 'other');
    expect(shallowWrapper.state().trips[tripIndex].otherTravelReasons).toEqual('reason');
  });

  it('should set travelReasons in state when handleReason is called', () => {
    const tripIndex = 0;
    const listTravelReasons = {
      travelReasons: [
        {title: 'reason', id: 2}
      ]
    };
    const shallowWrapper = shallow(<NewRequestForm {...props} listTravelReasons={listTravelReasons} />);
    shallowWrapper.setState({
      trips: [
        {travelReasons: ''},
      ]
    });
    shallowWrapper.instance().handleReason('reason', tripIndex, null);
    expect(shallowWrapper.state().trips[tripIndex].travelReasons).toEqual(2);
  });

  it('should set comments in state when handleComment is called', () => {
    const commentText = 'Muhanguzi David';
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      comments: {
        comment: ''
      },
    });
    shallowWrapper.instance().handleComment(commentText);
    expect(shallowWrapper.state().comments.comment).toEqual('Muhanguzi David');
  });

  it('should set commentTitle and collapse in state when showComments is called', () => {
    const commentText = 'Muhanguzi David';
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      collapse: false,
      commentTitle: '',
    });
    shallowWrapper.instance().showComments();
    expect(shallowWrapper.state().collapse).toEqual(true);
    expect(shallowWrapper.state().commentTitle).toEqual('Hide Comment');
  });

  it('should not set travelReasons in state when handleReason is called with other reasons', () => {
    const tripIndex = 0;
    const shallowWrapper = shallow(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      trips: [
        {travelReasons: ''},
      ]
    });
    shallowWrapper.instance().handleReason('Other..', tripIndex, null);
    expect(shallowWrapper.state().trips[tripIndex].travelReasons).toEqual(null);
  });

  it('should call handleCreateRequest to create a request when handleSubmit is called', () => {
    const tripIndex = 0;
    const shallowWrapper = shallow(<NewRequestForm
      {...props}
      handleCreateRequest={handleCreateRequest}
      handleSubmit={handleSubmit}
    />);
    shallowWrapper.setState({
      selection: 'oneWay',
    });
    const event = {
      preventDefault: jest.fn(),
    };
    shallowWrapper.instance().handleSubmit(event);
    expect(handleCreateRequest).toBeCalled();
  });

  it('should display next step on trip stipend  ', () => {
    const newProps = {
      ...props,
      travelStipends: {
        stipends: [
          {
            'amount': 100,
            'center': {
              'location': 'Lagos, Nigeria'
            }
          }
        ],
        isLoading: false
      }
    };
    const shallowWrapper = mount(<NewRequestForm {...newProps} />);
    shallowWrapper.setState({
      currentTab: 3,
      trips: [ { id: '1',
        origin: 'Nairobi Kenya',
        destination: 'Lagos Nigeria',
        departureDate: '2018-09-30',
        returnDate: '2018-09-30',
        createdAt: '2018-09-27T18:49:03.626Z',
        updatedAt: '2018-09-27T18:49:43.803Z',
        requestId: 'NfR-9KoCP',
        accomodationType: 'Not Required',
        bedId: 1 },
      {
        destination: 'Nairobi, Kenya'
      } ]
    });
    const nextButton = shallowWrapper.find('#stipend-next');
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'Next',
      }
    };
    nextButton.simulate('click', event);
    expect(event.preventDefault).toBeCalled();
    expect(shallowWrapper.state().currentTab).toEqual(4);
  });

  it('should render stipend on next click', () => {
    const newProps = {
      ...props,
      travelStipends: {
        stipends: [
          {
            'amount': 100,
            'center': {
              'location': 'Lagos, Nigeria'
            }
          }
        ],
        isLoading: false
      }
    };
    const shallowWrapper = mount(<NewRequestForm {...newProps} />);
    shallowWrapper.instance().setState({
      currentTab: 2,
      trips: [
        {
          destination: 'Nairobi, Kenya'
        }
      ]
    });
    const nextButton = shallowWrapper.find('#submit');
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'Next',
      }
    };

    jest.spyOn(shallowWrapper.instance(), 'renderTravelStipend');
    jest.spyOn(travelStipendHelper, 'getAllTripsStipend');
    shallowWrapper.instance().forceUpdate();
    moxios.install();
    nextButton.simulate('click', event);
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status:200
      });
      expect(event.preventDefault).toBeCalled();
      expect(travelStipendHelper.getAllTripsStipend).toHaveBeenCalled();
      expect(shallowWrapper.instance().renderTravelStipend).toBeCalled();
      expect(wrapper.find('StipendDetails')).toBeTruthy();
      expect(shallowWrapper.state().currentTab).toEqual(3);
    });
    moxios.uninstall();
  });
  
  it('should display trip checkList  ', () => {
    const shallowWrapper = mount(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      currentTab: 4,
      errors: { manager:'' },
      trips: [ { id: '1',
        origin: 'Nairobi Kenya',
        destination: 'Lagos Nigeria',
        departureDate: '2018-09-30',
        returnDate: '2018-09-30',
        createdAt: '2018-09-27T18:49:03.626Z',
        updatedAt: '2018-09-27T18:49:43.803Z',
        requestId: 'NfR-9KoCP',
        accomodationType: 'Not Required',
        bedId: 1 } ]
    });
    sinon.spy(shallowWrapper.instance(), 'renderTravelCheckList');
    shallowWrapper.instance().renderTravelCheckList();
    expect(shallowWrapper.instance().renderTravelCheckList.calledOnce).toEqual(true);
  });
  describe('Travel Details', ()=>{
    const shallowWrapper = mount(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      currentTab: 2
    });
    it('should display trip submitArea  ', () => {
      sinon.spy(shallowWrapper.instance(), 'renderSubmitArea');
      shallowWrapper.instance().renderSubmitArea({...props});
      expect(shallowWrapper.instance().renderSubmitArea.calledOnce).toEqual(true);
    });
    it('renders the travel details fieldset', () => {
      const travelDetails = shallowWrapper.find('fieldset.travel-details');
      expect(travelDetails).toHaveLength(1);
    });

    it('validates input on blur', () => {
      shallowWrapper.find('input[name="departureDate-0"]').simulate('blur');
      shallowWrapper.update();
      expect(shallowWrapper.state().errors['departureDate-0']).toBe('This field is required');
    });

  });
  it('should return null when user clicks others', () => {
    const shallowWrapper = mount(<NewRequestForm {...props} />);
    shallowWrapper.setState({
      currentTab: 2
    });
    expect(shallowWrapper.instance().handleReasonsId('Other..')).toEqual(null);
  });

  it('returns trip details page if trip validation fails', (done) => {
    const wrapper = mount(<NewRequestForm {...props} />);
    const trips = [{ id: '1',
      origin: 'Nairobi Kenya',
      destination: 'Lagos Nigeria',
      departureDate: '2018-09-30',
      returnDate: '2018-09-30',
      createdAt: '2018-09-27T18:49:03.626Z',
      updatedAt: '2018-09-27T18:49:43.803Z',
      requestId: 'NfR-9KoCP',
      accomodationType: 'Not Required',
      bedId: 1 }];
    wrapper.instance().setState({
      currentTab: 2,
      trips
    });
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'Next',
      }
    };
    jest.spyOn(wrapper.instance(), 'validator');
    wrapper.find('#submit').simulate('click', event);
    expect(props.validateTrips).toHaveBeenCalled();
    expect(wrapper.instance().validator).toHaveBeenCalled();
    expect(props.fetchAllTravelStipends).toHaveBeenCalled();
    done();
  });
});

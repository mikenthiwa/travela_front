import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { shallow } from 'enzyme';
import UserOnboarding from '../Index';

describe('<UserOnboarding />', () => {
  let wrapper, onSubmit, onClick;
  onSubmit = jest.fn();
  onClick = jest.fn();


  const props = {
    loading: false,
    hasBlankFields: false,
    user: {
      UserInfo: {
        id: '-LJNw1BsT0LP_E4l2peP',
        name: 'Collins',
      }
    },
    userData: {
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


    userDataUpdate: [],
    requestOnEdit: {
      id: '1',
      name: 'Seun Undefined',
      manager: 'Faluyi Seun',
      gender: 'Male',
      department: 'Talent & Development',
      role: 'Software Developer',
      status: 'Open',
      userId: 'lorem-ipsum',
      createdAt: '2018-09-26T15:15:49.808Z',
      updatedAt: '2018-09-26T15:15:49.808Z',
      
    },
    google: {},
    getUserData: jest.fn(() => {
    }),
    updateUserProfile: jest.fn(() => {
    }),
    getPersonalDetails: jest.fn(() => {
    }),
    onChangeAutoSuggestion: jest.fn(),
    choices: ['director', 'chef'],
    managers: [{
      fullName: 'Test User',
      email: 'test.user@andela.com'
    },
    {
      fullName: 'Samuel Kubai',
      email: 'samuel@andela.com'
    }],
    history: {
      push: jest.fn()
    },
    handleSubmit:jest.fn()
  };
  const user = localStorage.getItem('name');
  const location = localStorage.getItem('location');
  const gender = localStorage.getItem('gender');
  const department = localStorage.getItem('department');
  const role = localStorage.getItem('role');
  const manager = localStorage.getItem('manager');

  const defaultState = {
    values: {
      name: !(/^null|undefined$/).test(user) ? user : '', 
      gender: !(/^null|undefined$/).test(gender) ? gender : '',
      department: !(/^null|undefined$/).test(department) ? department : '',
      role: !(/^null|undefined$/).test(role) ? role : '',
      manager: !(/^null|undefined$/).test(manager) ? manager : '',
      location: !(/^null|undefined$/).test(location) ? location : '',
    },
    errors: {},
    hasBlankFields: true,
    collapse: false,
    parentIds: 1,
    steps: [
      { id: 1,  name: 'Personal Information' },
      { id: 2,  name: 'Travel Document' },
    ],
    currentTab: 1,
    currentOrigin: 0,
    currentPage: 1,
  };

  beforeEach(() => {
    wrapper = mount(<UserOnboarding {...props} />);
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should profile information after update ', () => {
    const shallowWrapper = shallow(<UserOnboarding {...props} />);
    localStorage.setItem('checkBox', 'clicked');
    shallowWrapper.setState({
      values: {
        name: 'Moses Gitau', 
        gender: 'male',
        department: 'Talent Driven Development',
        role: 'Software Developer',
        manager: 'Samuel Kubai',
      },
      
    });
    const event = {
      preventDefault: jest.fn(),
    };
    sinon.spy(shallowWrapper.instance(), 'handleSubmit');
    shallowWrapper.instance().handleSubmit(event);
    expect(shallowWrapper.instance().handleSubmit.calledOnce).toEqual(true);
    expect(props.updateUserProfile).toHaveBeenCalledTimes(1);
  });
  it('Test HandleSubmit button ', () => {
    const spy = sinon.spy();
    const wrapper = shallow(<UserOnboarding {...props} handleSubmit={spy} />);
    wrapper.find('form').at(0).simulate('click');
    expect(spy.wrapper);
  });

  it('renders the personal details fieldset', () => {
    const personalDetails = wrapper.find('fieldset.personal-details');
    expect(personalDetails);
  });

  it('renders one buttons', () => {
    const buttons = wrapper.find('button');
    expect(buttons).toHaveLength(1);
  });
  it('Test the onclick button for the next step action', () => {
    const clickButton = wrapper.find('request-submit-area-details');

  });
  it('validates form before sending data', () => {
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(onSubmit).toHaveBeenCalledTimes(0);
  });

  it('should test onChangeManager()', () => {
    const shallowWrapper = mount(<UserOnboarding {...props} />);
    localStorage.setItem('checkBox', 'clicked');
    shallowWrapper.setState({
      values: {
        name: 'Akanmu Chris',
        gender: 'male',
        department: 'Success',
        role: 'Software Developer',
        manager: 'Samuel Kubai',
      },
    });
    const params = ['manager', 'David Ssalli'];
    expect(shallowWrapper.instance().onChangeAutoSuggestion(...params));
    const { manager } = shallowWrapper.state('values');
    expect(manager).toEqual('David Ssalli');

    const params2 = ['manager', 'will fail'];
    expect(shallowWrapper.instance().onChangeAutoSuggestion(...params2));
    const { manager: newManager } = shallowWrapper.state('values');
    const { manager: secondManagerError } = shallowWrapper.state('errors');
    expect(newManager).toEqual('will fail');
    expect(secondManagerError).toEqual('No manager with the name exists');
    
  });

  it('should test onChangeOccupation()', () => {
    const shallowWrapper = mount(<UserOnboarding {...props} />);
    localStorage.setItem('checkBox', 'clicked');
    shallowWrapper.setState({
      values: {
        name: 'Kevin Munene',
        gender: 'male',
        department: 'Success',
        role: 'Software Developer',
        manager: 'David Ssali',
      },
    });

    const params = ['role', 'Software Developers'];
    expect(shallowWrapper.instance().onChangeAutoSuggestion(...params));
    const { role } = shallowWrapper.state('values');
    expect(role).toEqual('Software Developers');

    const params2 = ['role', 'Journalist'];
    expect(shallowWrapper.instance().onChangeAutoSuggestion(...params2));
    const { role: newRole } = shallowWrapper.state('values');
    const { role: secondRoleError } = shallowWrapper.state('errors');
    expect(newRole).toEqual('Journalist');
    expect(secondRoleError).toEqual('No role with the name exists');
    
  });

  it('should test onChangeLocation()', () => {
    const shallowWrapper = mount(<UserOnboarding {...props} />);
    localStorage.setItem('checkBox', 'clicked');
    shallowWrapper.setState({
      values: {
        name: 'Kevin Munene',
        gender: 'male',
        department: 'Success',
        role: 'Software Developer',
        manager: 'David Ssali',
        location: 'Lagos'
      },
    });
    const params = ['location', 'Lagos'];
    expect(shallowWrapper.instance().onChangeAutoSuggestion(...params));
    const { location } = shallowWrapper.state('values');
    expect(location).toEqual('Lagos');

    const params2 = ['location', 'Aba'];
    expect(shallowWrapper.instance().onChangeAutoSuggestion(...params2));
    const { location: newLocation } = shallowWrapper.state('values');
    const { location: secondLocationError } = shallowWrapper.state('errors');
    expect(newLocation).toEqual('Aba');
    expect(secondLocationError).toEqual('No location with the name exists');
    
  });

  it('should test onChangeDeparment()', () => {
    const shallowWrapper = mount(<UserOnboarding {...props} />);
    localStorage.setItem('checkBox', 'clicked');
    shallowWrapper.setState({
      values: {
        name: 'Kevin Munene',
        gender: 'male',
        department: 'Success',
        role: 'Software Developer',
        manager: 'David Ssali',
        
      },
    });
    const params = ['department', 'Success'];
    expect(shallowWrapper.instance().onChangeAutoSuggestion(...params));
    const { department } = shallowWrapper.state('values');
    expect(department).toEqual('Success');

    const params2 = ['department', 'Actor'];
    expect(shallowWrapper.instance().onChangeAutoSuggestion(...params2));
    const { department: newDepartment } = shallowWrapper.state('values');
    const { department: secondDepartmentError } = shallowWrapper.state('errors');
    expect(newDepartment).toEqual('Actor');
    expect(secondDepartmentError).toEqual('No department with the name exists');
    
  });

  it('It should not return any onChangeAutoSuggestion', () => {
    const shallowWrapper = mount(<UserOnboarding {...props} />);
    localStorage.setItem('checkBox', 'clicked');
    shallowWrapper.setState({
      values: null
    });
    const params = [];
    expect(shallowWrapper.instance().onChangeAutoSuggestion(params));

    
  });
  it('should call localStorage when savePersonalDetails is called', () => {
    const wrapper = shallow(<UserOnboarding {...props} />);
    wrapper.instance().savePersonalDetails({ key: 'value' });
    expect(localStorage.getItem('key')).toEqual('value');
  });

  it('should change to the next step ', () => {
    const shallowWrapper = shallow(<UserOnboarding {...props} />);
    const event = {
      preventDefault: jest.fn(),
    };
    sinon.spy(shallowWrapper.instance(), 'nextStep');
    shallowWrapper.instance().nextStep(event);
    expect(shallowWrapper.instance().nextStep.calledOnce).toEqual(true);
  });
  it('should display next step on personal information  ', () => {
    const shallowWrapper = mount(<UserOnboarding {...props} />);
    shallowWrapper.setState({
      currentTab: 1
    });
    const event = {
      preventDefault: jest.fn(),
      target: {
        name: 'Personal Information',
      }
    };
    expect(shallowWrapper.state().currentTab).toEqual(1);
  });

  describe('Request Edit', () => {
    const sagaMiddleware = [createSagaMiddleware];
    const mockStore = configureStore(sagaMiddleware);
    const store = mockStore({
      requests: {
        requestOnEdit: props.requestOnEdit,
        requestData: {}
      },

    });
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <UserOnboarding {...props} editing />
        </MemoryRouter>
      </Provider>
    );

    it('should not submit data without validation', () => {
      const requestForm = wrapper.find('form');
      requestForm.simulate('submit');
      expect(onSubmit).toHaveBeenCalledTimes(0);
    });
    it('should render main div correctly', () => {
      const wrapper = shallow(<UserOnboarding />);
      const currentTab = 1;
      const defaultState = {
        currentPage: 1,
        currentTab: 1,
        currentOrigin: 0,
      };
      wrapper.instance().setState(defaultState);
      expect(wrapper.find('.user_onboarding').length).toBe(currentTab);
    });
    it('renders correctly', () => {
      const wrapper = shallow(<UserOnboarding />);
      expect(wrapper).toMatchSnapshot();
    });

    it('should to change to the next step ', () => {
      const shallowWrapper = shallow(<UserOnboarding />);
      const defaultState = {
        currentTab: 1,
        currentPage: 1,
        steps: '',
      };
      shallowWrapper.instance().setState(defaultState);
      const event = {
        preventDefault: jest.fn(),
      };
      sinon.spy(shallowWrapper.instance(), 'nextStep');
      shallowWrapper.instance().nextStep(event);
      expect(shallowWrapper.instance().nextStep.calledOnce).toEqual(true);
    });

    it('should submit user details when the next button is click ', () => {
      const spy = sinon.spy();
      const shallowWrapper = shallow(<UserOnboarding {...props} handleSubmit={spy} />);
      const defaultState = {
        currentTab: 1,
        currentPage: 2,
        steps: ''
      };
      shallowWrapper.instance().setState(defaultState);
      const event = {
        preventDefault: jest.fn(),
      };
      shallowWrapper.find('form').at(0).simulate('click');
      sinon.spy(shallowWrapper.instance(), 'nextStep');
      sinon.spy(shallowWrapper.instance(), 'handleSubmit');
      const res = shallowWrapper.instance().nextStep(event);
      expect(shallowWrapper.instance().nextStep.calledOnce).toEqual(true);
      expect(shallowWrapper.instance().handleSubmit.calledOnce).toEqual(true);
      expect(spy.wrapper);
    });

  });
  it('validates required field at initial state', () => {
    wrapper.instance().validate();
    expect(wrapper.state('errors').undefined).toEqual('This field is required');
  });
  
});

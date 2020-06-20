import React from 'react';
import {Provider} from 'react-redux';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ConnectedReminders, { Reminders } from '../index';
import {initialState} from '../../../redux/reducers/emailReminder';


const onPageChangeEvent = jest.fn();
const mockStore = configureStore();

const initState = {
  emailReminders: {
    ...initialState,
    meta: {
      documentCount: {
        passport: 2,
        visa: 1
      },
      pagination: {
        'pageCount': 3,
        'currentPage': 1
      }
    },
    singleReminder: {
      data: {
        conditionName: 'Passport',
        documentType: 'passport',
        id: 1,
        reminders: [
          {
            frequency: '2 Weeks',
            id: 1,
          }
        ]
      }
    },
    reminders: [
      {
        id: 3,
        conditionName: 'PasssssT',
        documentType: 'Passport',
        disabled: false,
        createdAt: '2019-01-24T16:11:09.802Z',
        updatedAt: '2019-01-25T14:42:00.976Z',
        userId: '-LT2Pgjb2os_fE5yxSf9',
        user: {
          fullName: 'Adeniyi Adeyokunnu'
        },
        reasons: [
          {
            reason: 'Home stretch',
            conditionId: 3,
            createdAt: '2019-01-25T14:35:39.275Z'
          }
        ]
      }
    ]
  },
  modal: {
    modal: { ...initialState }
  }
};
const store = mockStore(initState);

const props = {
  history: {
    push: jest.fn()
  },
  disableReminderTemplate: jest.fn(),
  disableReminderCondition: jest.fn(),
  fetchEmailReminder: jest.fn(),
  getSingleReminder: jest.fn(),
  openModal:jest.fn,
  setItemToDisable: jest.fn(),
  shouldOpen: true,
  modalType: 'disable reminder condtion',
  closeModal: jest.fn(),
  enableDisabledReminderCondition: jest.fn(),
  reminders: [],
  meta: {pagination: {}, documentCount: {}},
  location: {
    search: 'document=passport'
  },
  singleReminder: {
    data: {}
  },
  user: {},
  id: 1
};

describe('Reminder component', () => {

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should test two button exist (passport and visa)  ', () => {
    // The page to be rendered
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <ConnectedReminders {...{...props, isLoading: false }} />
        </BrowserRouter>
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
    // To find two button tags on the DOM
    const buttons = wrapper.find('button');
    expect(buttons.length).toEqual(8);
  });

  it('should test if the two buttons are passport and visa', () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <ConnectedReminders {...props} />
        </BrowserRouter>
      </Provider>
    );
    const button = wrapper.find('#passportButton');
    expect(button.text()).toEqual('Passports 0');

    const visaButton = wrapper.find('#visaButton');
    expect(visaButton.text()).toEqual('Visas 0');
  });

  it('should call the setItemToDisable function', () => {
    const shallowWrapper = mount( <Reminders {...props} />);
    const conditionId = { id: 5 };
    const wrapperInstance = shallowWrapper.instance();
    wrapperInstance.setItemToDisable(false,conditionId);
    expect(shallowWrapper.state().conditionId).toEqual(conditionId.id);
  });

  it('should test default button is passport', () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <ConnectedReminders {...props} />
        </BrowserRouter>
      </Provider>
    );

    const passportButton = wrapper.find('#passportButton');
    const {className} = passportButton.props();
    expect(className).toEqual('document-button_group__active');
  });
  it('should render the Reminder page without crashing', () => {

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedReminders {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });


  it('should test that passport and visa button toggle when clicked',  () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <ConnectedReminders {...props} />
        </BrowserRouter>
      </Provider>
    );
    wrapper.find('#passportButton').simulate('click');
    const passportButton = wrapper.find('#passportButton');
    const {className: classNamePassport} = passportButton.props();
    expect(classNamePassport).toEqual('document-button_group__active');

    wrapper.find('#visaButton').simulate('click');
    const visaButton = wrapper.find('#visaButton');
    const {className: classNameVisa} = visaButton.props();
    expect(classNameVisa).toEqual('document-button_group__inactive');
  });

  it('should test page change function when next button is clicked on pagination', () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <ConnectedReminders 
            {
            ...{...props, 
              isLoading: false
            }
            } />
        </BrowserRouter>
      </Provider>
    );

    wrapper.find('#next-button').simulate('click');
    expect(props.history.push).toHaveBeenCalledWith('/settings/reminders?document=passport&page=2');
  });

  it('should test page change function when next button is clicked on pagination', () => {
    const wrapper = mount(

      <Reminders {
      ...{...props, 
        isLoading: false, shouldOpen: true, 
        modalType: 'enable disabled reminder'}} 
      />

    );

    wrapper.find('#oncancel').simulate('click');
    expect(wrapper.state().conditionId).toEqual('');
  });

  it('should show loading icon on enable button when `isEnablingReminder` is true', () => {
    const wrapper = mount(

      <Reminders {
      ...{...props, 
        isLoading: false, 
        shouldOpen: true,
        isEnablingReminder: true,
        modalType: 'enable disabled reminder'}} 
      />

    );

    expect(wrapper.find('i.loading-icon').length).toBe(1);
  });

  it('should not show loading icon when on enable button `isEnablingReminder` a reminder', () => {
    const wrapper = mount(

      <Reminders {
      ...{...props, 
        isLoading: false, 
        shouldOpen: true,
        isEnablingReminder: false,
        modalType: 'disable reminder condtion'}} 
      />

    );

    expect(wrapper.find('i.loading-icon').length).toBe(0);
  });

  it('should show loading icon on disbable button when `isDisabling` is true', () => {
    const wrapper = mount(

      <Reminders {
      ...{...props, 
        isLoading: false, 
        shouldOpen: true,
        isDisabling: true,
        modalType: 'disable reminder condtion'}} 
      />

    );

    expect(wrapper.find('i.loading-icon').length).toBe(1);
  });

  it('should not show loading icon on disbable button when `isDisabling` is true', () => {
    const wrapper = mount(

      <Reminders {
      ...{...props, 
        isLoading: false, 
        shouldOpen: true,
        isDisabling: false,
        modalType: 'enable disabled reminder'}} 
      />

    );

    expect(wrapper.find('i.loading-icon').length).toBe(0);
  });

  it('should fetch the required data on componentDidMount', () => {
    const newProps = {
      ...props,
      location: {
        search: 'document=passport&page=2'
      }
    };
    mount(
      <Provider store={store}>
        <Reminders {...newProps} />
      </Provider>
    );
    expect(newProps.fetchEmailReminder).toHaveBeenCalledWith({document: 'passport', page: '2'});
  });
});

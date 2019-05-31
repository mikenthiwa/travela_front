import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import mockData from '../../../mockData/hotelEstimate';
import { HotelEstimates, mapStateToProps } from '..';

const { estimates } = mockData;
let props = {
  location: {
    search: '?country=true',
    pathname: '/travel-cost/hotel-estimates'
  },
  history: {
    push: jest.fn()
  },
  listAllHotelEstimates: {
    selectedEstimate: {
      id: 12,
      amount: 1000,
      country: 'Kenya',
      creator: {
        fullName: 'Andrew Hinga',
        id: 3
      }
    },
    updatedEstimate: {
      data: {
        ...estimates[0]
      },
      errors: {
        estimate: ''
      },
      isSaving: false
    },
    hotelEstimates: {},
    errors: [],
    isLoading: false,
    estimates
  },
  getCountryChoices: jest.fn(() => {}),
  handleCreateHotelEstimate: jest.fn(() => {}),
  CreateHotelEstimate: jest.fn(() => {}),
  isLoading: false,
  createNewRequest: jest.fn(),
  loading: false,
  errors: [],
  shouldOpen: false,
  modalType: 'create hotel estimate',
  openModal: sinon.spy(() => Promise.resolve()),
  closeModal: sinon.spy(() => Promise.resolve()),
  fetchAllHotelEstimates: jest.fn(),
  fetchSingleHotelEstimate: jest.fn()
};

const initialState = {
  auth: {
    isAuthenticated: true,
    user: {
      UserInfo: {
        name: 'Tomato Jos',
        picture: 'http://picture.com/gif'
      }
    }
  },
  errors: {
    estimate: ''
  },
  hotelEstimates: {
    errors: {},
    estimates,
    isLoading: false
  },
  modalReducer: {
    shouldOpen: false,
    modalType: null
  },
  hasBlankFields: false
};

const mockStore = configureStore();
const store = mockStore(initialState);

describe('HotelEstimate', () => {
  it('should render the hotel estimate page without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <HotelEstimates {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });
  it('should test for presence of regions and countries toggle buttons', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <HotelEstimates {...props} />
        </MemoryRouter>
      </Provider>
    );
    const regionbutton = wrapper.find('#passportButton');
    expect(regionbutton.text()).toEqual('Regions ');

    const countrybutton = wrapper.find('#visaButton');
    expect(countrybutton.text()).toEqual('Countries ');
  });
  it('should test default button is region', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <HotelEstimates {...props} />
        </MemoryRouter>
      </Provider>
    );

    const regionButton = wrapper.find('#passportButton');
    const { className } = regionButton.props();
    expect(className).toEqual('document-button_group__active');
  });
  it('should test active button is is set to clicked one', () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <HotelEstimates {...props} />
        </BrowserRouter>
      </Provider>
    );

    const countryButton = wrapper.find('#visaButton').simulate('click');
    const { className } = countryButton.props();
    expect(className).toEqual('document-button_group__inactive');
  });

  it('should set `shouldOpen` prop to `true` when add hotel estimate button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <HotelEstimates
            {...{
              ...props,
              shouldOpen: true,
              values: {},
              modalType: 'create hotel estimate'
            }}
          />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('.create-new').simulate('click');
    expect(wrapper.find('HotelEstimates').props().shouldOpen).toBe(true);
    expect(props.openModal.called).toBe(true);
  });

  it('should set `visibility` prop to `visible` when add estimate button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <HotelEstimates
            {...{
              ...props,
              shouldOpen: true,
              modalType: 'create hotel estimate'
            }}
          />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('.create-new').simulate('click');
    expect(
      wrapper
        .find('Modal')
        .at(0)
        .props().visibility
    ).toEqual('visible');
  });

  it('should close modal when close button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <HotelEstimates
            {...{
              ...props,
              shouldOpen: true,
              modalType: 'create hotel estimate'
            }}
          />
        </MemoryRouter>
      </Provider>
    );

    wrapper.find('button.modal-close').simulate('click');
    expect(props.closeModal.called).toBe(true);
  });
});

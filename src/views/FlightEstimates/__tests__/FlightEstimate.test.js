import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import mockData from '../../../mockData/flightEstimateMockData';
import { FlightEstimates, mapStateToProps } from '..';

const { flightEstimates } = mockData;
let props = {
  history: {
    push: jest.fn()
  },
  listAllFlightEstimates: {
    selectedEstimate: {
        success: true,
        flightEstimate: {
          id: 1,
          originRegion: null,
          destinationRegion: null,
          originCountry: "Nigeria",
          destinationCountry: "Uganda",
          createdBy: "2190",
          amount: 200,
        }
    },
    updatedEstimate: {
      data: {
        ...flightEstimates[0]
      },
      errors: {
        flightEstimate: ''
      },
      isSaving: false
    },
    flightEstimates: {},
    errors: [],
    isLoading: false,
    flightEstimates
  },
  getCountryChoices: jest.fn(() => {}),
  handleCreateFlightEstimate: jest.fn(() => {}),
  CreateFlightEstimate: jest.fn(() => {}),
  isLoading: false,
  createNewRequest: jest.fn(),
  loading: false,
  errors: [],
  shouldOpen: false,
  modalType: 'create flight estimate',
  openModal: sinon.spy(() => Promise.resolve()),
  closeModal: sinon.spy(() => Promise.resolve()),
  fetchAllFlightEstimates: jest.fn(),
  fetchSingleFlightEstimate: jest.fn(),
  fetchRegions: jest.fn(),
  travelRegion: [],
  history: {
    push: jest.fn()
  }
};

const initialState = {
  errors: {
    flightEstimate: ''
  },
  flightEstimates: {
    errors: {},
    flightEstimates,
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

describe('FlightEstimates', () => {
  it('should render the flight estimate page without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <FlightEstimates {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should open modal when add estimate button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <FlightEstimates
            {...{
              ...props,
              shouldOpen: true,
              modalType: 'create flight estimate'
            }}
          />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('button.btn-new-request').simulate('click');
    expect(props.openModal.called).toBe(true);
  });

  it('should close modal when close button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <FlightEstimates
            {...{
              ...props,
              shouldOpen: true,
              modalType: 'create flight estimate'
            }}
          />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('button.modal-close').simulate('click');
    expect(props.closeModal.called).toBe(true);
  });

  it("should map state to props", () => {
    const initialState = {
      modal: {modal: {}},
     listAllFlightEstimates: jest.fn(),
     travelRegion:{
       regions: {}
      }
    };
    mapStateToProps(initialState);
  });

  it('should have create flight estimate default props', () => {
    const result = FlightEstimates.defaultProps.createFlightEstimate();
    expect(result).toBe(undefined);
  });

  it('should have delete flight estimate default props', () => {
    const result = FlightEstimates.defaultProps.deleteFlightEstimate();
    expect(result).toBe(undefined);
  });

  it('should have update flight estimate default props', () => {
    const result = FlightEstimates.defaultProps.updateFlightEstimate();
    expect(result).toBe(undefined);
  });

  it('should have history.push default props', () => {
    const result = FlightEstimates.defaultProps.history.push();
    expect(result).toBe(undefined);
  });
});

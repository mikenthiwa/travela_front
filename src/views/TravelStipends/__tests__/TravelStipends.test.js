import React from 'react';
import { mount, shallow } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import mockData from '../../../mockData/travelStipend';
import { TravelStipends, mapStateToProps } from '..';
import NewTravelStipendForm
  from '../../../components/Forms/NewTravelStipendForm/NewTravelStipendForm';

const { stipends } = mockData;
let props = {
  travelStipends: {
    selectedStipend: {
      id: 12,
      amount: 1000,
      country: 'Kenya',
      creator: {
        fullName: 'Super Modo',
        id: 3
      }
    },
    updatedStipend: {
      data: {
        ...stipends[0]
      },
      errors: {},
      isSaving: false
    },
    travelStipends: {},
    errors: [],
    isLoading: false,
    stipends: [{
      amount: 100,
      country: 'United Kingdom'
    }]
  },
  centers: {
    center: [
      {
        location: 'Rwanda'
      },
    ]
  },
  getCountryChoices: jest.fn(() =>{}),
  handleCreateTravelStipend: jest.fn(() => {
  }),
  CreateTravelStipend: jest.fn(() => {
  }),
  isLoading: false,
  createNewRequest: jest.fn(),
  loading: false,
  errors: [],
  shouldOpen: false,
  fetchCenters: jest.fn(),
  modalType: 'create travel stipend',
  openModal: sinon.spy(() => Promise.resolve()),
  closeModal: sinon.spy(() => Promise.resolve()),
  fetchAllTravelStipends: jest.fn(),
  fetchSingleTravelStipend: jest.fn(),
  deleteTravelStipend: jest.fn(),
  updateTravelStipend: jest.fn(),
  history: {
    push: jest.fn()
  },
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
  errors: {},
  travelStipends: {
    errors: {},
    stipends,
    isLoading: false
  },
  modalReducer: {
    shouldOpen: false,
    modalType: null
  },
  hasBlankFields: false,
};
const mockStore = configureStore();
const store = mockStore(initialState);

describe('<TravelStipends>', () => {
  it('should render the TravelStipends page without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <TravelStipends {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('renders as expected', () => {
    const wrapper = mount(
      <MemoryRouter>
        <TravelStipends {...props} />
      </MemoryRouter>);
    expect(wrapper).toMatchSnapshot();
  });


  it('should set `shouldOpen` prop to `true` when add stipend button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <TravelStipends {... {...props, shouldOpen: true, modalType: 'create travel stipend' }} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('button.btn-new-request').simulate('click');
    expect(wrapper.find('TravelStipends').props().shouldOpen).toBe(true);
    expect(props.openModal.called).toBe(true);
  });

  it('should set `visibility` prop to `visible` when add stipend button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <TravelStipends
            {...{...props, shouldOpen: true, modalType: 'create travel stipend'}}
          />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('button.btn-new-request').simulate('click');
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
          <TravelStipends
            {...{...props, shouldOpen: true, modalType: 'create travel stipend'}}
          />
        </MemoryRouter>
      </Provider>
    );

    wrapper.find('button.modal-close').simulate('click');
    expect(props.closeModal.called).toBe(true);
  });

  it('maps state to props and return the expected object', () => {
    const travelStipends = {
      travelStipends: {},
    };

    const modal = {
      modal: {
        shouldOpen: false,
        modalType: null
      }
    };

    const centers = {
      center: [
        {
          location: 'kigali'
        }
      ]
    };

    const props = mapStateToProps({travelStipends, modal, centers});
    expect(props).toEqual({
      ...travelStipends, ...modal.modal,
      centers: centers,
      travelStipends: travelStipends,
    });
  });

  describe('Update Travel Stipend', () => {
    const testSetup = (props) => {
      return mount(
        <MemoryRouter>
          <TravelStipends {...props} />
        </MemoryRouter>);
    };
    const setupWithStore = (store, props) => {
      return mount(
        <Provider store={store}>
          <MemoryRouter>
            <TravelStipends
              {...props}
            />
          </MemoryRouter>
        </Provider>
      );
    };
    it('should open the edit/delete menu when ellipsis is clicked', () => {
      const wrapper = testSetup(props);
      let actionMenu = wrapper.find('.table__menu-container.open');

      expect(actionMenu.length).toBe(0);

      wrapper.find('.fa-ellipsis-v').first().simulate('click');

      actionMenu = wrapper.find('.table__menu-container.open');
      expect(actionMenu.length).toBe(1);
    });

    it('should have the edit option in the menu', () => {
      const wrapper = testSetup(props);

      wrapper.find('.fa-ellipsis-v').first().simulate('click');

      const editOption = wrapper.find('.edit').first();

      expect(editOption.text()).toEqual('Edit');
    });

    it('should open the edit stipend modal', () => {
      const newProps = {
        ...props,
        shouldOpen: true,
        modalType: 'edit travel stipend'
      };
      const wrapper = setupWithStore(store, newProps);

      const visibilityProp = wrapper.find('Modal').at(0).props().visibility;

      wrapper.find('.fa-ellipsis-v').first().simulate('click');
      expect(visibilityProp).toEqual('visible');
    });

    it('should update the state with stipend details when editing=true', () => {
      const { centers: { andelaCenters } } = props;
      const { travelStipends: { selectedStipend: { amount, country } } } = props;
      const wrapper = mount(
        <NewTravelStipendForm
          {...props}
          centers={andelaCenters}
        />
      );

      wrapper.setProps({
        editing: true
      });

      const wrapperState = wrapper.state();
      const { values } = wrapperState;

      expect(values.center).toEqual(country);
      expect(values.stipend).toEqual(amount);
    });

    it('should update the props with errors', () => {
      const travelStipend = {
        updatedStipend: {
          errors: {
            error: 'Something went wrong'
          }
        },
        stipends: [{
          amount: 100,
          center: {location: 'United Kingdom'}
        }]
      };
      const { centers: { center }, getCountryChoices } = props;
      const wrapper = mount(
        <NewTravelStipendForm
          {...props}
          centers={center}
          getCountryChoices={getCountryChoices}
          travelStipends={travelStipend}
        />
      );

      wrapper.setProps({
        editing: true
      });

      expect(wrapper.props().travelStipends.updatedStipend.errors)
        .toEqual(wrapper.state().errors);
    });

    it('should dispatch the update action when form is submitted', () => {
      const newProps = {
        ...props,
        shouldOpen: true,
        modalType: 'edit travel stipend',
        editing: true
      };

      const wrapper = mount(<TravelStipends {...newProps} />);
      const event = {
        target: {
          value: 300
        }
      };

      wrapper.find('input[name="stipend"]').simulate('change', event);

      wrapper.find('.new-request').simulate('submit');

      expect(props.updateTravelStipend).toBeCalled();
      expect(props.updateTravelStipend).toBeCalledWith(
        12, {center: 'Kenya', 'stipend': 300, }, props.history
      );
    });

    it('should dispatch the create action when editing is false', () => {
      const { centers: { center } } = props;
      const newProps = {
        ...props,
        editing: false
      };
      const event = (value) => ({
        target: {
          value
        }
      });
      const amountEvent = event(300);
      const centerEvent = event('Ghana');

      const wrapper = mount(
        <NewTravelStipendForm
          {...newProps}
          centers={center}
        />
      );

      wrapper.find('input.occupationInput').simulate('change', centerEvent);
      wrapper.find('NumberInput').find('input[name="stipend"]').simulate('change', amountEvent);
      wrapper.find('.new-request').simulate('submit');
      expect(props.handleCreateTravelStipend).toHaveBeenCalled();
    });
  });
});

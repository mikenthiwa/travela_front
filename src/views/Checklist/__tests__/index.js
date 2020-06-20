import React from 'react';
import sinon from 'sinon';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import ConnectedChecklist, { Checklist, mapStateToProps } from '../index';
import travelChecklistMockData from '../../../mockData/travelChecklistMockData';

travelChecklistMockData[0].destinationName = 'Nairobi, Kenya';

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
  requestsReducer: {
    requests: [],
    request: {},
    loading: false,
    errors: []
  },
  modalReducer: {
    shouldOpen: false,
    modalType: null
  },
  getCurrentUserRole: 'tomato',
  travelChecklist: {
    checklistItems: travelChecklistMockData,
    userCenters: ['Nigeria', 'Kenya', 'Uganda']
  }
};
let shallowWrapper, mountWrapper, parentWrapper;

const props = {
  openModal: sinon.spy(),
  closeModal: sinon.spy(),
  createTravelChecklist: jest.fn(),
  fetchTravelChecklist: jest.fn(),
  deleteTravelChecklist: jest.fn(),
  updateTravelChecklist: jest.fn(),
  restoreChecklist: jest.fn(),
  handleInputChange: jest.fn(),
  fetchDeletedChecklistItems: jest.fn(),
  getCurrentUserRole: ['Travel Administrator'],
  shouldOpen: false,
  modalType: 'edit cheklistItem',
  checklistItems: travelChecklistMockData,
  deletedCheckListItems: [
    travelChecklistMockData[0].checklist[0]
  ],
  location: {
    pathname: '/trip-planner/checklists',
    search: '?page=1&center=Kenya',
    hash: '', state: undefined, key: 'idctnr'
  },
  currentUser: {
    location: 'Nairobi'
  },
  isLoading: false,
  history: {
    push: jest.fn()
  }
};

const middleware = [createSagaMiddleware];
const mockStore = configureStore(middleware);


describe('<Checklist> component', () => {

  const store = mockStore(initialState);
  beforeEach(() => {
    shallowWrapper = mount( <Checklist {...props} />);
    mountWrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Checklist {...props} />
        </MemoryRouter>
      </Provider>
    );
    parentWrapper = mountWrapper.find(Checklist);
  });

  it('should render the Checklist page without crashing', () => {
    expect(shallowWrapper.length).toBe(1);
  });

  it('renders loading indicator if `isLoading is true`', () => {
    const wrapper = shallowWrapper;
    wrapper.setProps({ isLoading: true});
    expect(wrapper.find('.loader').length).toBe(3);
  });

  it('should call the setItemToDelete function', () => {
    const checklistItemId = { id: 5 };
    const wrapper = shallowWrapper;
    const wrapperInstance = wrapper.instance();
    wrapperInstance.setItemToDelete(checklistItemId)();
    expect(wrapper.state().checklistItemId).toEqual(checklistItemId.id);
  });

  it('should call the manageModal function', () => {
    const wrapper = shallowWrapper;
    const wrapperInstance = wrapper.instance();
    const { openModal } = props;
    wrapperInstance.manageModal('add')();
    expect(openModal.called).toEqual(true);
  });

  it('should call the manageModal function with `edit`', () => {
    const wrapper = shallowWrapper;
    const wrapperInstance = wrapper.instance();
    const { openModal } = props;
    wrapperInstance.manageModal('edit')();
    expect(openModal.called).toEqual(true);
  });

  it('should call the closeModal function', () => {
    const wrapper = shallowWrapper;
    const wrapperInstance = wrapper.instance();
    const { closeModal } = props;
    wrapperInstance.manageModal('close-edit-modal')();
    expect(closeModal.called).toEqual(true);
  });

  it('should call the closeDeleteModal function', () => {
    const wrapper = shallowWrapper;
    const wrapperInstance = wrapper.instance();
    const { closeModal } = props;
    wrapperInstance.manageModal('close-delete-modal')();
    expect(closeModal.called).toEqual(true);
  });

  it('should call the renderNoMessage function', () => {
    const wrapper = shallowWrapper;
    wrapper.setProps({ checklistItems: []});
    expect(wrapper.find('.checkInTable__trips--empty').at(1).text())
      .toBe('No new checklist item added yet');
  });

  it('should call the deleteChecklistItem function', () => {
    const event = { preventDefault: () => {} };
    const state = {
      itemToEdit: null,
      deleteReason: '',
      checklistItemId: '',
      restoreItemData: {},
      checklistItemName: '',
      'location': 'Kenya',
    };
    const wrapper = shallowWrapper;
    const wrapperInstance = wrapper.instance();
    const { deleteTravelChecklist } = props;
    wrapperInstance.deleteChecklistItem(event);
    expect(deleteTravelChecklist).toBeCalledWith(state.checklistItemId, state);
  });

  it('should call the restoreTravelChecklist function', () => {
    const state = {
      checklistItemId: '',
      restoreItemData: {},
      itemToEdit: null,
      deleteReason: '',
      checklistItemName: ''
    };
    const wrapper = shallowWrapper;
    const wrapperInstance = wrapper.instance();
    const { restoreChecklist } = props;
    wrapperInstance.restoreChecklistItem();
    expect(restoreChecklist).toBeCalledWith(state.checklistItemId, state.restoreItemData);
  });

  it('should call handleInputChange function', () => {
    let event = { target: { value: '' } };
    const wrapper = shallowWrapper;
    event.target.value = 'We need more items';
    wrapper.setProps({
      shouldOpen: true,
      modalType: 'delete checklist item'
    });
    const input = wrapper.find('.delete-checklist-item__input');
    input.simulate('change', event);
    const wrapperInstance = wrapper.instance();
    wrapperInstance.handleInputChange;
    expect(wrapper.instance().state.deleteReason).toBe('We need more items');
  });

  it('maps state to props and return the expected object', () => {
    const modal = {
      modal: {
        shouldOpen: false,
        modalType: null
      }
    };
    const user = {
      currentUser: {},

    };
    const travelChecklist = {
      isLoading: false,
      checklistItems: travelChecklistMockData
    };
    const props = mapStateToProps({ modal, user, travelChecklist });
    expect(props).toEqual({
      ...modal.modal,
      checklistItems: travelChecklist.checklistItems,
      currentUser: user.currentUser,
      isLoading: travelChecklist.isLoading
    });
  });

  test('should have default deleteTravelChecklist', () => {
    const result = Checklist.defaultProps.deleteTravelChecklist();
    expect(result).toEqual(undefined);
  });

  test('should have default updateTravelChecklist', () => {
    const result = Checklist.defaultProps.updateTravelChecklist();
    expect(result).toEqual(undefined);
  });

  it('should call the setItemToRestore function', () => {
    const checklistItemId = 1;
    const wrapper = mount( <Checklist {...props} />);
    const wrapperInstance = wrapper.instance();
    const deletedCheckListItems = [{
      id: checklistItemId,
      name: 'visa application'
    }];
    wrapper.setProps({
      deletedCheckListItems
    });
    wrapper.setState({
      restoreItemData: deletedCheckListItems[0],
      checklistItemName: deletedCheckListItems[0].name
    });
    wrapperInstance.setItemToRestore(checklistItemId)();
    expect(wrapper.state().checklistItemId).toEqual(checklistItemId);
  });
});

describe('<Checklist> component without created or deleted travel checklist items',() => {

  const secondaryInitialState ={
    ...initialState,
    travelChecklist: {
      checklistItems: []
    }
  };
  const secondaryProps = {
    ...props,
    modalType: '',
    checklistItems: [],
    deletedCheckListItems: [],
  };

  const store = mockStore(secondaryInitialState);
  beforeEach(() => {
    shallowWrapper = shallow( <Checklist {...secondaryProps} />);
    mountWrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Checklist {...secondaryProps} />
        </MemoryRouter>
      </Provider>
    );
  });
  it('should show two error messages for travel checlist items',() => {
    const wrapper = shallowWrapper;
    expect(wrapper.find('.checkInTable__trips--empty').length).toBe(3);
  });
});

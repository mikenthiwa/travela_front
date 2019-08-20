import React from 'react';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import ConnectedReadiness from '../index';
import { initialState } from '../../../redux/reducers/travelReadinessDocuments';
import users from '../../TravelReadinessDocuments/__mocks__/users';

const props = {
  closeModal: sinon.spy(() => Promise.resolve()),
  openModal: sinon.spy(() => Promise.resolve()),
  handleModals: sinon.spy(() => Promise.resolve()),
  modalType: 'add visa',
  userReadiness:  sinon.spy(() => Promise.resolve()),
  shouldOpen: false,
  createTravelReadinessDocument: sinon.spy(() => Promise.resolve()),
  user: {
    currentUser:{
      userId: '1200'
    }
  },
  currentUser: {
    userId: '1200'
  },
  location: {
    search: '/travel_readiness?id=EBUmAX3z1&type=passport',
  }, 
  passportInfo:{ passportData:{}}
};

const newProps = {
  ...props,
  modalType: 'add visa',
};

const state = {
  createTravelReadinessDocument: {},
  travelReadinessDocuments: {
    ...initialState,
    users,
    userReadiness: {
      travelDocuments: {
        passport: [],
        visa: [],
        other: []
      }
    },
    documents: {},
    errors:{},
    isLoading: false
  },
  readiness:{
    readiness:[],
    passportInfo:{}
  },
  modal: {
    modal: {

    }
  },
  user: {
    currentUser:{
      userId: '1200'
    }
  },
  documentTypes: {
    documentTypes: [{ id: 'id', name: 'type' }, { id: 'id2', name: 'type2' }]
  },
};

describe('renders <TravelReadinessDocuments />', () =>{
  const mockStore = configureStore();
  const store = mockStore(state);
  it('renders without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedReadiness {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('renders add visa form', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedReadiness {...{...props, shouldOpen:true, modalType: 'interactive'}} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('renders interactive modal', () => {
    const prop = {...props, shouldOpen: true};
    const wrapper = mount(
      <Provider store={store} {...prop}>
        <MemoryRouter>
          <ConnectedReadiness {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('Modal').at(2).length).toBe(1);
    wrapper.unmount();
  });

  it('should open the add passport modal when the yes button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedReadiness {...{...props, shouldOpen:true, modalType: 'interactive'}} />
        </MemoryRouter>
      </Provider>
    );
    let yesButton = wrapper.find('#yes');
    yesButton.simulate('click');

    setTimeout(() => {
      const displayedModal = wrapper.find('.modal.visible.add-document-item');
      const displayedModalTitle = wrapper.find('.modal.visible.add-document-item .modal-title');
      expect(displayedModal.length).toEqual(1);
      expect(displayedModalTitle.text()).toEqual('Add passport');
    }, 200);
  });

  it('should close the interactive modal when the no button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedReadiness {...{...props, shouldOpen:true, modalType: 'interactive'}} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('button#no').simulate('click');
    expect(wrapper.find('Modal').at(2).props().visibility).toEqual('invisible');
  });
  it('renders edit visa form', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedReadiness {...{...newProps, shouldOpen:true, modalType: 'interactive'}} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });
});

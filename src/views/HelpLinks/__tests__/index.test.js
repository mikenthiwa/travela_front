import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import HelpResource from '../index';

const props = {
  helpResources: [
    {
      id: 1,
      link: 'Travel Intranet',
      address: 'https://sites.google.com/andela.com/travel-intranet/home?authuser=0',
      createdAt: '2018-08-16 012:11:52.181+01',
      updatedAt: '2018-08-16 012:11:52.181+01',
    },
    {
      id: 2,
      link: 'Andela Policy',
      address: 'https://docs.google.com/document/d/1ZqJ3OAF-7NfJAgkzMBdiMoTrsftTWJp9tNhV8eOe1d8/edit',
      createdAt: '2018-08-16 012:11:52.181+01',
      updatedAt: '2018-08-16 012:11:52.181+01',
    }
  ],
  isLoaded: true,
  fetchResources: sinon.spy(() => Promise.resolve()),
  isLoading: false,
  errors: [],
  shouldOpen: false,
  modalType: null,
  openModal: jest.fn(),
  closeModal: jest.fn(),
  addResource: jest.fn(),
  roles: []
};
const initialState = {
  helpResources: {
    fetchResources: {},
    helpResourceErrors: '',
    isLoading: false,
    helpResources:[
      {
        id: 1,
        link: 'Travel Intranet',
        address: 'https://sites.google.com/andela.com/travel-intranet/home?authuser=0',
        createdAt: '2018-08-16 012:11:52.181+01',
        updatedAt: '2018-08-16 012:11:52.181+01',
      },
      {
        id: 2,
        link: 'Andela Policy',
        address: 'https://docs.google.com/document/d/1ZqJ3OAF-7NfJAgkzMBdiMoTrsftTWJp9tNhV8eOe1d8/edit',
        createdAt: '2018-08-16 012:11:52.181+01',
        updatedAt: '2018-08-16 012:11:52.181+01',
      }
    ],
  },
  modal: {
    shouldOpen: false,
    modalType: null
  },
  user: {
    getCurrentUserRole: ['Super Administrator', 'Travel Administrator']
  },
  
};
const mockStore = configureStore([createSagaMiddleware]);
const store = mockStore(initialState);

describe('<HelpResourcePage>', () => {
  it('should render the RolesPage without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <HelpResource {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('should set `visibility` prop to `visible` when add new resource button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <HelpResource {...{ ...props, shouldOpen: true, modalType: 'new model' }} />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('.btn-new-request').simulate('click');
    expect(
      wrapper
        .find('Modal')
        .at(0)
        .props().visibility
    ).toEqual('visible');
  });

  it('should not submit with empty values', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <HelpResource {...{ ...props, 
            helpResources:[
              {
                link: '',
                address: '',
              },
            ],
            shouldOpen: true, 
            modalType: 'new model' }} 
          />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('.btn-new-request').simulate('click');
    expect(
      wrapper
        .find('Modal')
        .at(0)
        .props().visibility
    ).toEqual('visible');
  });
});


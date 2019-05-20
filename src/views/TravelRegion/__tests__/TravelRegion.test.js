import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import TravelRegion from '../index';

const props = {
  travelRegion: [
    {
      id: 1002,
      region: 'West Africa',
      description: 'Nigeria',
      createdAt: '2019-10-05T09:37:11.170Z',
      updatedAt: '2019-10-05T09:37:11.170Z'
    },
    {
      id: 1001,
      region: 'East Africa',
      description: 'Kenya, Uganda and Rwanda',
      createdAt: '2019-10-05T08:36:11.170Z',
      updatedAt: '2019-10-05T08:36:11.170Z'
    }
  ],
  isLoaded: true,
  fetchRegions: sinon.spy(() => Promise.resolve()),
  isLoading: false,
  errors: [],
  shouldOpen: false,
  modalType: null,
  openModal: jest.fn(),
  closeModal: jest.fn(),
  addRegion: jest.fn(),
};
const initialState = {
  travelRegion: {
    fetchRegions: {},
    regionErrors: '',
    isLoading: false,
    regions:[
      {
        id: 1002,
        region: 'West Africa',
        description: 'Nigeria',
        createdAt: '2019-10-05T09:37:11.170Z',
        updatedAt: '2019-10-05T09:37:11.170Z'
      },
      {
        id: 1001,
        region: 'East Africa',
        description: 'Kenya, Uganda and Rwanda',
        createdAt: '2019-10-05T08:36:11.170Z',
        updatedAt: '2019-10-05T08:36:11.170Z'
      }
    ],
  },
  modal: {
    shouldOpen: false,
    modalType: null
  }
};
const mockStore = configureStore([createSagaMiddleware]);
const store = mockStore(initialState);

describe('<RegionPage>', () => {
  it('should render the RolesPage without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <TravelRegion {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('should set `visibility` prop to `visible` when add new region button is clicked', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <TravelRegion {...{ ...props, shouldOpen: true, modalType: 'new model' }} />
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

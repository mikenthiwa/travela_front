import React from 'react';
import { mount } from 'enzyme';
import TravelReadinessDocuments from '..';
import { Provider } from 'react-redux';
import { MemoryRouter, BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { initialState } from '../../../redux/reducers/travelReadinessDocuments';
import users from '../__mocks__/users';

const state = {
  travelReadinessDocuments: {
    ...initialState,
    users,
    meta: {
      pageCount: 2,
      currentPage: 1,
    },
  }
};

const initiaStore = {
  travelReadinessDocuments: {
    ...initialState
  }
};

const noDataStore = configureStore()(initiaStore);


const store = configureStore()(state);

describe('TravelReadinessDocuments', () => {
  const props = {
    users,
    location: {
      search: 'successs'
    },
    history: {
      push: jest.fn(),
    }
  };

  it('should render the Travel Readiness page without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <TravelReadinessDocuments {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('should call \'onPageChange\'with \'2\'', () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <TravelReadinessDocuments {...props} />
        </BrowserRouter>
      </Provider>
    );
    const travelReadinessDocuments = wrapper.find('TravelReadinessDocuments');
    const onPageChange = jest.spyOn(travelReadinessDocuments.instance(), 'onPageChange');

    wrapper.instance().forceUpdate();   
    travelReadinessDocuments.find('#next-button').simulate('click');
    expect(onPageChange).toHaveBeenCalledWith(2);
    expect(props.history.push)
      .toHaveBeenCalledWith('/trip-planner/travel-readiness?page=2');
  });

  it('should not display pagination component when there\'s no travel readiness data', () => {
    const newProps = {
      ...props,
      users: []
    };
    const wrapper = mount(
      <Provider store={noDataStore}>
        <BrowserRouter>
          <TravelReadinessDocuments {...newProps} />
        </BrowserRouter>
      </Provider>
    );
    const pagination = wrapper.find('Pagination');
    expect(pagination.length).toBe(0);
  });

  it('should display pagination component when there\'s travel readiness data', () => {
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <TravelReadinessDocuments {...props} />
        </BrowserRouter>
      </Provider>
    );
    const pagination = wrapper.find('Pagination');   
    expect(pagination.length).toBe(1);
  });
});

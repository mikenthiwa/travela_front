import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

import ConnectedAnalytics, { Analytics } from '..';

const initialState = {
  analytics: {
    payload: {
      total_requests: 230
    },
    error: '',
    isLoading: false,
    success: false
  }
};

const mockStore = configureStore();
const store = mockStore(initialState);
let wrapper, props, fetchAnalytics;


beforeEach(() => {
  props = {
    analytics: {
      payload: {
        total_requests: 230
      }
    },
    children: [],
    context: {
      state: {
        range: ['2018-11-01', '2018-11-08'],
        city: 'Nairobi',
      },
      handleFilter: jest.fn()
    },
    fetchAnalytics: jest.fn()
  };
});

describe('<Analytics />', () => {
  it('calls ComponentDidMount', () => {
    wrapper = shallow(
      <MemoryRouter>
        <Analytics {...props} />
      </MemoryRouter>
    ).dive().dive();
    expect(props.fetchAnalytics).toHaveBeenCalled();
  });

  it('call componentWillReceiveProps', () => {
    wrapper = shallow(
      <MemoryRouter>
        <Analytics {...props} />
      </MemoryRouter>
    ).dive().dive();
    wrapper.setProps({
      context: {
        state: {
          range: {start: '2018-12-01', end: '2018-12-31'},
          filter: 'This Month',
          city: 'Nigeria',
        },
        handleFilter: jest.fn()
      }
    });
    expect(props.fetchAnalytics).toHaveBeenCalled();
    expect(wrapper.instance().props.context.state.range.start).toBe('2018-12-01');
  });

  it('should render the connected component without crashing', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedAnalytics {...props} />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });
  it('should redirect to correct link when cards are clicked', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <ConnectedAnalytics {...props} />
        </MemoryRouter>
      </Provider>
    );
    let allRequestsCard = wrapper.find('.analytics-card').at(0);
    let pendingRequestsCard = wrapper.find('.analytics-card').at(1);
    expect(allRequestsCard.find('Link').prop('to')).toEqual('/requests/my-verifications');
    expect(pendingRequestsCard.find('Link').prop('to')).toEqual('/requests/my-verifications?status=approved');
  });
});

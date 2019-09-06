import mockStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import React from 'react';
import EmailApproval from '../index';

const createStore = mockStore();

const props = {
  match: {
    params: {
      type: 'manager',
      modelId: '123',
      approvalType: 'Approved',
      approvalToken: 'token'
    }
  }
};

const initialState = {
  loading: true,
  response: '',
  error: false
};

describe('<EmailApproval />', () => {

  const createWrapper = (initialState, props) => {
    return mount(
      <Provider store={createStore(initialState)}>
        <EmailApproval {...props} />
      </Provider>
    );
  };

  it('should render with a loader by default', () => {
    const wrapper = createWrapper(initialState, props);
    expect(wrapper.find('.card-content').length).toEqual(1);
  });
});

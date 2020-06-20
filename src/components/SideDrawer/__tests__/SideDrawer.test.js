import React from 'react';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import ConnectedSideDrawer, { SideDrawer } from '../SideDrawer';

const middleware = [createSagaMiddleware];
const mockStore = configureStore(middleware);

const props = {
  user: {
    UserInfo: {
      name: 'Icon Max',
      picture: 'http://picture.com/gif'
    }
  },
  handleShowDrawer: jest.fn()
};

const initialState = {
  auth: {
    isAuthenticated: true,
    user: {
      UserInfo: {
        name: 'Icon Max',
        picture: 'http://picture.com/gif'
      }
    }
  }
};

const store = mockStore(initialState);

describe('<SideDrawer>', () => {
  const wrapper = shallow(<SideDrawer {...props} />);
  it('should render as expected', () => {
    expect(wrapper.find('div').length).toBe(4);
    expect(wrapper.find('ImageLink').length).toBe(1);
  });

  it('should render all the components except the notification pane', () => {
    const wrapper = shallow(
      <ConnectedSideDrawer
        handleShowDrawer={jest.fn()}
        store={store}
      />);
    expect(wrapper.length).toBe(1);
  });
});

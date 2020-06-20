import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import UserProfile from '../index';

const props = {
  user: {
    UserInfo: {
      name: 'John Doe',
      id: '-LHJlG',
      picture: 'http://www.image.com/jepg'
    }
  },
  isLoading: false,
  history: {
    push: jest.fn()
  },
  errors: [],
  shouldOpen: false,
  onNotificationToggle: jest.fn(),
  getUserData: jest.fn()

};

const initialState = {
  auth: {
    user: {
      UserInfo: {
        name: 'John Doe',
        id: '-LHJlG',
        picture: 'http://www.image.com/jepg'
      }
    }
  },
  user: {
    getUserData: {
      result: {
        id: '2',
        fullName: 'Collins Muru',
        email: 'collins.muru@andela.com',
        userId: '-LJNw1BsT0LP_E4l2peP',
        passportName: 'Collins Njau',
        department: 'Talent & Development',
        occupation: 'Software Developer',
        manager: 'Collins',
        gender: 'Male',
        createdAt: '2018-09-14T12:48:11.266Z',
        updatedAt: '2018-09-16T07:53:48.835Z',
        roleId: 401938
      }
    }
  },
  errors: []
};

const mockStore = configureStore();
const store = mockStore(initialState);

describe('<UserProfile />', () => {
  it('should render correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <UserProfile {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('ProfileForm').props().userData.email).toEqual(
      'collins.muru@andela.com'
    );
    expect(wrapper).toMatchSnapshot();
  });
});

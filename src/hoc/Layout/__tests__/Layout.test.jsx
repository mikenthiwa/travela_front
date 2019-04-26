import React from 'react';
import sinon from 'sinon';
import { Provider } from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import createSagaMiddleware from 'redux-saga';
import { Layout } from '..';
import {REQUESTER} from '../../../helper/roles';
import { NavBar } from '../../../components/nav-bar/NavBar';
import notificatonsMockData from '../../../components/nav-bar/__mocks__/notificationMockData-navBar';

const middleware = [createSagaMiddleware];
const mockStore = configureStore(middleware);

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
  modal: {
    modal: {}
  },
  approvals: {
    myCenters: []
  },
  notifications: {
    notifications: [],
    singleNotificationRead: 0
  }
};

const store = mockStore(initialState);

const props = {
  children: {},
  location: {},
  notifications: [],
  user: {
    UserInfo: {
      name: 'Tomato Jos',
      picture: 'http://picture.com/gif',
      getCurrentUserRole: [REQUESTER]
    }
  },
  getUserData: jest.fn(),
  isLoaded: true
};

describe('Layout component', () => {
  describe('Layout Mount', () => {
    const mountProps = {
      ...props,
      history: {
        push: jest.fn()
      },
      approvals: {
        myCenters: []
      },
      logout: jest.fn(),
    };

    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <Layout {...mountProps} location={{}}>
              <div>
                Test Content
              </div>
            </Layout>
          </MemoryRouter>
        </Provider>
      );
    });

    it('should render all the components except the notification pane', () => {
      expect(wrapper.find('.sidebar').length).toBe(1);// LeftSideBar
      expect(wrapper.find('.notification').hasClass('hide')).toEqual(true);
    });

    it('should display the notification pane when the notification icon gets clicked', () => {
      const notificationIcon = wrapper.find('.navbar__navbar-notification');
      if( wrapper.find('.notification.hide').exists()){
        notificationIcon.simulate('click');
      }
      expect(wrapper.find('.notification').exists()).toBeTruthy();
      expect(wrapper.find('.notification .hide').exists()).toBeFalsy();
      expect(wrapper.find('.sidebar').hasClass('hide')).toEqual(true);
      expect(wrapper.find('NavBar').exists()).toBeTruthy();
    });

    it('should close the notification pane when the close icon is clicked', () => {
      const closeIcon = wrapper.find('.notifications-header__close-btn');
      const openNotificationIcon = wrapper.find('.navbar__navbar-notification');
      if( wrapper.find('.notification.hide').exists()){
        openNotificationIcon.simulate('click');
      }
      expect(wrapper.find('.notification.hide').exists()).toBeFalsy();
      closeIcon.simulate('click');
      expect(wrapper.find('.notification.hide').exists()).toBeTruthy();
    });

    it('should log the user out when the logout button is clicked', () => {
      const customProps = {
        onNotificationToggle: jest.fn(),
        avatar: 'avatar',
        history: {
          push: jest.fn()
        },
        openSearch: true,
        handleHideSearchBar: jest.fn(),
        notifications: [...notificatonsMockData],
        user: {
          UserInfo: {
            name: 'Tomato Jos',
            picture: 'http://picture.com/gif'
          }
        },
        location: {
          search: 'search=gjg',
          pathname: 'requests'
        }
      };
      const navBarSetup = () => mount(
        <MemoryRouter>
          <NavBar {...customProps} />
        </MemoryRouter>
      );
      wrapper = navBarSetup();
      wrapper.find('#logout').simulate('click');
      expect(customProps.history.push).toHaveBeenCalledWith('/');
    });
  });

  describe('Layout Shallow', () => {

    let shallowWrapper;

    beforeEach(() => {
      shallowWrapper = shallow(<Layout {...props} />);
    });

    it('should render layout component correctly', (done) => {
      expect(shallowWrapper).toMatchSnapshot();
      done();
    });

    it('should call handleHideSearchBar method', (done) => {
      shallowWrapper.instance().handleHideSearchBar();
      expect(shallowWrapper.state('openSearch')).toBeTruthy;
      done();
    });

    it('should handle handleOverlay method', (done)=> {
      shallowWrapper.instance().handleOverlay();
      expect(shallowWrapper.state('hideOverlay')).toBe(true);
      done();
    });

    it('should handle handleShowDrawer method', (done)=> {
      shallowWrapper.instance().handleShowDrawer();
      expect(shallowWrapper.state('hideOverlay')).toBe(false);

      done();
    });

    it('should call onNotificationToggle method', (done) => {
      const onNotificationToggleSpy= jest
        .spyOn(shallowWrapper.instance(), 'onNotificationToggle');
      shallowWrapper.instance().onNotificationToggle();
      expect(onNotificationToggleSpy).toHaveBeenCalled();

      done();
    });
  });
});

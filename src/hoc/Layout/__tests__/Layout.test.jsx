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
import checkUploadedDocument from '../helper';

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
  user: {
    currentUser: {
      location: 'Nigeria'
    }
  },
  modal: {
    modal: {}
  },
  approvals: {
    myCenters: []
  },
  travelChecklist: {
    userCenters: []
  },
  notifications: {
    notifications: [],
    singleNotificationRead: 0
  },
  clearNav: false
};

const store = mockStore(initialState);

const props = {
  children: {},
  location: {
    search: 'search=gjg',
    pathname: 'requests'
  },
  notifications: [],
  user: {
    UserInfo: {
      name: 'Tomato Jos',
      picture: 'http://picture.com/gif',
      getCurrentUserRole: [REQUESTER]
    }
  },
  currentUser: {},
  getUserData: jest.fn(),
  isLoaded: true,
  isAuthenticated: true,
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
      travelChecklist: {
        userCenters: []
      },
      logout: jest.fn(),
    };

    let wrapper;

    beforeEach(() => {
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter>
            <Layout {...mountProps}>
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
        currentUser: { travelDocuments: [ { passport: 'passport'}, {other: 'other'} ] },
        location: {
          search: 'search=gjg',
          pathname: 'requests'
        },
        clearNav: false
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

  describe('DOCUMENT REMINDER', () => {

    let shallowWrapper;

    beforeEach(() => {
      shallowWrapper = shallow(<Layout {...props} />);
      localStorage.setItem('loggedInBefore', JSON.stringify('true'));
      localStorage.removeItem('showReminder');
    });

    it('should call closeReminder method', (done) => {
      const closeReminderSpy= jest
        .spyOn(shallowWrapper.instance(), 'closeReminder');
      shallowWrapper.instance().closeReminder();
      expect(closeReminderSpy).toHaveBeenCalled();
      done();
    });

    it('should check if passport document is uploaded', (done) => {
      const currentUser = { travelDocuments: [{}] }
      const travelDocs = {};
      const wrapper = shallow(<Layout {...props} {...currentUser}></Layout>);
      jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
      wrapper.instance().componentWillReceiveProps({location, currentUser});
      expect(checkUploadedDocument(travelDocs)).toBe('your passport document');
      done();
    });

    it('should check if visa document is uploaded', (done) => {
      const currentUser = { travelDocuments: [{}] }
      const travelDocs = {
        passport: 'passport'
      };
      const wrapper = shallow(<Layout {...props} {...currentUser}></Layout>);
      jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
      wrapper.instance().componentWillReceiveProps({location, currentUser});
      expect(checkUploadedDocument(travelDocs)).toBe('your visa document');
      done();
    });

    it('should check if yellow fever card is uploaded', (done) => {
      const currentUser = { travelDocuments: [{}] }
      const travelDocs = {
        passport: 'passport',
        visa: 'visa'
      };
      const wrapper = shallow(<Layout {...props} {...currentUser}></Layout>);
      jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
      wrapper.instance().componentWillReceiveProps({location, currentUser});
      expect(checkUploadedDocument(travelDocs)).toBe('your yellow fever card');
      done();
    });

    it('should close the reminder modal', () => {
      jest.useFakeTimers();
      const currentUser = { travelDocuments: [{}] };
      const wrapper = shallow(<Layout {...props} {...currentUser}></Layout>);
      wrapper.setState({ showReminder: true });
      jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
      wrapper.instance().componentWillReceiveProps({location, currentUser});
      setTimeout(() => {
        wrapper.find('.close-reminder').simulate('click');
        expect(wrapper.state('showReminder')).toEqual(false);
      }, 4000);
      jest.runAllTimers();
    });

    it('should setstate using data from localstorage', (done) => {
      localStorage.setItem('showReminder', JSON.stringify('false'));
      const currentUser = { travelDocuments: [{}] };
      const wrapper = shallow(<Layout {...props} {...currentUser}></Layout>);
      jest.spyOn(wrapper.instance(), 'componentWillReceiveProps');
      wrapper.instance().componentWillReceiveProps({location, currentUser});
      expect(wrapper.state('showReminder')).toEqual(false);
      done();
    });
  });
});

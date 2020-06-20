import React from 'react';
import Cookie from 'cookies-js';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';
import { NavBar } from '../NavBar';
import notificatonsMockData from '../__mocks__/notificationMockData-navBar';

const props = {
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
  userCenters: ['Nigeria', 'Kenya'],
  location: {
    search: '?search=gjg',
    pathname: '/requests'
  },
  clearNav: false,
};



const setup = () => shallow(<NavBar {...props} />);
const navBarSetup = (customProps = props) => mount(
  <MemoryRouter>
    <NavBar {...customProps} />
  </MemoryRouter>
);

// describe what we are testing
describe('Render NavBar component', () => {
  // make our assertions and what we expect to happen
  it('should match snapshot', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the navbar as expected', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });

  it('should render the OnNotification click as exepected', () => {
    const wrapper = setup();
    let NotificationToggleSpy = jest.spyOn(
      wrapper.instance().props,
      'onNotificationToggle'
    );
    wrapper
      .find('#notification')
      .first()
      .simulate('click');
    expect(NotificationToggleSpy).toHaveBeenCalled();
  });

  it('should log user out when the logout link is clicked', () => {
    const wrapper = setup();
    wrapper.find('#logout').simulate('click');
    const token = Cookie.get('login-status');
    const loginStatus = Cookie.get('jwt-token');
    expect(token).toEqual(undefined);
    expect(loginStatus).toEqual(undefined);
  });

  it('should should be search bar for phone view toggle display', () => {
    const wrapper = setup();
    expect(wrapper.length).toBe(1);
  });

  it('should log user out when the logout link is clicked', () => {
    const wrapper = setup();
    wrapper.find('#logout').simulate('click');
    const token = Cookie.get('login-status');
    const loginStatus = Cookie.get('jwt-token');
    expect(token).toEqual(undefined);
    expect(loginStatus).toEqual(undefined);
  });

  it('should render dropdown items contain logout link when button is clicked', ()=>{
    const wrapper = navBarSetup();
    expect(wrapper.find('NavBar').instance().state.hideLogoutDropdown).toBe(true);
    wrapper.find('#demo-menu-lower-right').simulate('click');
    expect(wrapper.find('NavBar').instance().state.hideLogoutDropdown).toBe(false);
  });

  it('should hide  logout Dropdown when dropdown button is clicked twice', ()=>{
    const wrapper = navBarSetup();
    wrapper.find('NavBar').instance().hideDropdown();
    expect(wrapper.find('NavBar').instance().state.hideLogoutDropdown).toBe(true);
  });

  it('should call `getUnreadNotifictionsCount` on component render',
    (done) => {
      const wrapper = setup();

      const getUnreadNotificationsCountSpy =
      jest.spyOn(wrapper.instance(), 'getUnreadNotificationsCount');
      wrapper.instance().getUnreadNotificationsCount();
      expect(getUnreadNotificationsCountSpy).toHaveBeenCalled();

      done();
    });

  it('should update state when onChange function is triggered', () => {
    const wrapper = navBarSetup();
    const event = {
      target: {
        value: 'kampala'
      }
    };
    wrapper.find('NavBar').instance().onChange(event);
    expect(wrapper.find('NavBar').instance().state.keyword).toBe(event.target.value);
  });

  it('should call history push function when onSubmit is triggered', () => {
    const wrapper = navBarSetup();
    wrapper.find('NavBar').instance().setState({ keyword: 'Kampala' });
    wrapper.find('NavBar').instance().onSubmit();
    expect(props.history.push).toHaveBeenCalled();
  });

  it ('should update url when input is provided in the search bar', () => {
    const clock = sinon.useFakeTimers();
    const wrapper = navBarSetup();
    const event = {
      target: {
        value: 'kampala'
      }
    };
    wrapper.find('input#search').at(0).simulate('change', event);
    clock.tick(2000);
    expect(props.history.push).toBeCalledWith('/requests?search=kampala');
    clock.restore();
  });

  it('renders the location dropdown for only allowed routes', () => {
    let wrapper = navBarSetup();
    expect((wrapper).find('SelectDropDown').length).toEqual(0);
    const customProps = { ...props, location: {pathname: '/requests/my-verifications',
      search: ''}};
    wrapper = navBarSetup(customProps);
    expect((wrapper).find('SelectDropDown').length).toEqual(1);
  });

  it('should update the url with a selected center when a center is clicked', () => {
    const customProps = { ...props, location: {pathname: '/requests/my-verifications',
      search: ''}};
    const wrapper = navBarSetup(customProps);
    wrapper.find('.dropdown__container').simulate('click');
    wrapper.find('.dropdown__list__item').at(1).simulate('click');
    expect(props.history.push).toBeCalledWith('/requests/my-verifications?page=1&center=Nigeria');
  });

  it('should remove the center query from the url when a all locations is clicked', () => {
    const customProps = { ...props, location: {pathname: '/requests/my-verifications',
      search: ''}};
    const wrapper = navBarSetup(customProps);
    wrapper.find('.dropdown__container').simulate('click');
    wrapper.find('.dropdown__list__item').at(0).simulate('click');
    expect(props.history.push).toBeCalledWith('/requests/my-verifications?page=1');
  });

  it('clears the search bar if clearNav props is true', () => {
    const wrapper = navBarSetup();
    const event = {
      target: {
        value: 'test value'
      }
    };
    wrapper.find('input#search').at(0).simulate('change', event);
    expect(wrapper.find('input#search').at(0).prop('value')).toEqual('test value');
    wrapper.setProps({
      children: (
        <NavBar
          {...props}
          clearNav
        />
      )
    });
    expect(wrapper.find('input#search').at(0).prop('value')).toEqual('');
    wrapper.unmount();
  });
});

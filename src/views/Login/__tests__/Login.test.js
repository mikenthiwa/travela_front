import React from 'react';
import Cookie from 'cookies-js';
import { Login } from '..';
import {GoogleLogin} from 'react-google-login';
import TextLink from '../../../components/TextLink/TextLink';
import Utils from '../../../helper/Utils';

const props = {
  setUser: () => {},
  isAuthenticated: true,
  user:{
    UserInfo: {
      fullName: 'Tomato Jos',
      email: 'tomato@andela.com',
      userId: '29492494',
      picture: 'https://fakephote.jpg'
    }
  },
  history: {
    push: jest.fn()
  },
  postData: jest.fn(),
  match: {
    params: [{}]
  }
};


const wrapper = mount(<Login {...props} />);

describe('Login Component', () => {
  it('should render Login page correctly', () => {
    expect(wrapper.find(TextLink)).toHaveLength(2);
    expect(wrapper.find('#login').length).toEqual(1);
    expect(wrapper.find('img').length).toEqual(5);
    expect(wrapper.find('p').length).toEqual(3);
  });

  it('should find the Login button', () => {
    expect(wrapper.find('button').exists).toBeTruthy();
  });

  it('should render the google button', () => {
    const updateSpy= jest.spyOn(wrapper.instance(), 'updated');
    wrapper.setProps({ postUserData: { token: 'This is the token'}});
    expect(updateSpy).toHaveBeenCalled();
  });

  it('should authenticate if it is a valid token', () => {
    jest.resetAllMocks();
    Utils.verifyToken = jest.fn(() => ({ exp: false}));
    Utils.isExpired = jest.fn(() => false);

    mount(<Login {...props} />);

    expect(props.history.push).toHaveBeenCalledTimes(0);

    jest.resetAllMocks();
  })

  it('should redirect the user to the home page', () => {
    const wrapper = mount(<Login {...props} />);
    window.location.replace = jest.fn();
    localStorage.getItem = jest.fn(() => null);
    wrapper.setProps({ postUserData: { token: 'This is the token'}});
    expect(window.location.replace).toHaveBeenCalledWith('/home');
  });

  it('should set user Login status to undefined if user not is authenticated', () => {
    const loginStatus = Cookie.get('login-status');
    expect(loginStatus).toEqual(undefined);
  });

  it('should call authenticate method on component mount', (done) => {
    const authenticatedSpy= jest.spyOn(wrapper.instance(), 'authenticated');
    wrapper.instance().componentDidMount();
    expect(authenticatedSpy).toHaveBeenCalledTimes(1);

    done();
  });

  it('should call checkTokenExpiration method on component mount', (done) => {
    const checkTokenExpirationSpy = jest.spyOn(wrapper.instance(), 'checkTokenExpiration');
    const expiredDate = new Date();
    const expiredDateInSeconds = expiredDate.getTime() * 0.001;
    wrapper.instance().checkTokenExpiration(expiredDateInSeconds);
    expect(checkTokenExpirationSpy).toHaveBeenCalledTimes(1);

    done();
  });

  it('should login when GoogleLogin is successful', () => {
    const googleLogin = wrapper.find(GoogleLogin);

    googleLogin.props().onSuccess({ tokenId: 'this is a token id'});

    expect(props.postData).toHaveBeenCalledWith({ token: 'this is a token id'});
  });
});

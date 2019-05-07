import jwtDecode from 'jwt-decode';
import { successMessage, errorMessage } from './toast';

export const userDetails = ()  => {
  const token = localStorage.getItem('jwt-token');
  return {
    isAuthenticated: !!token,
    user: token ? jwtDecode(token) : null
  };
};

export const loginStatus = () => {
  if (!localStorage.getItem('login-status') && localStorage.getItem('jwt-token')) {
    localStorage.setItem('login-status', 'true', { domain: '.andela.com' });
    successMessage('Login Successful');
  }
};

export const logoutUser = (history, msg) => {
  localStorage.removeItem('login-status', { path: '/', domain: '.andela.com' });
  localStorage.removeItem('jwt-token', { path: '/', domain: '.andela.com' });
  history.push('/');
  msg ? errorMessage(msg) : successMessage('Logout Successful');
};

export const getUserRoleCenter = (userDetail, defaultCenter) => {
  const userCenter = userDetail && userDetail.centers && userDetail.centers[0]
    ? userDetail.centers[0].location
    : defaultCenter;
  return userCenter;
};

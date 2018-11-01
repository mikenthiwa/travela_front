import { combineReducers } from 'redux';
import auth from './auth';
import requests from './requests';
import approvals from './approvals';
import modal from './modal';
import user from './user';
import role from './role';
import notifications from './notifications';
import comments from './comments';
import rooms from './room';
import accommodation from './accommodation';
import trips from './trips';
import occupations from './occupations';
import travelChecklist from './travelChecklist';
import centers from './centers';
import availableRooms from './availableRooms';
import analytics from './analytics';

const rootReducer = combineReducers({
  auth,
  requests,
  approvals,
  modal,
  user,
  role,
  comments,
  notifications,
  rooms,
  accommodation,
  trips,
  occupations,
  travelChecklist,
  centers,
  availableRooms,
  analytics
});

export default rootReducer;

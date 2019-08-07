import {REPORT_CRASH} from '../constants/actionTypes';

// eslint-disable-next-line import/prefer-default-export
export const reportCrash = (data) => {
  return {
    type: REPORT_CRASH,
    data
  };
};

export const reportCrashSuccess = (data) => {
  return {
    type: `${REPORT_CRASH}_SUCCESS`,
    data
  };
};

export const reportCrashFailure = (error) => {
  return {
    type: `${REPORT_CRASH}_FAILURE`,
    error
  };
};

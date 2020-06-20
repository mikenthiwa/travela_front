import {reportCrash, reportCrashFailure, reportCrashSuccess} from '../errorBoundaryActions';
import {REPORT_CRASH} from '../../constants/actionTypes';

describe('Error Boundary Actions', () => {

  it('should return the appropriate action for crashReport', () => {
    const data = {
      stackTrace: 'The stack trace',
      link: 'https://travela.andela.com'
    };

    const action = reportCrash(data);

    expect(action).toMatchObject({
      type: REPORT_CRASH,
      data
    });
  });

  it('should create action for success', () => {
    const data = { message: 'Crash reported successfully'};

    expect(reportCrashSuccess(data)).toMatchObject({
      type: `${REPORT_CRASH}_SUCCESS`,
      data
    });
  });

  it('should create action for failure', () => {
    const error = { error: 'Unable to post to slack channel'};
    expect(reportCrashFailure(error)).toMatchObject({
      type: `${REPORT_CRASH}_FAILURE`,
      error
    });
  });
});

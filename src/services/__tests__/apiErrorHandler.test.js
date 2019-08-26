import apiErrorHandler from '../apiErrorHandler';

describe('Api Error Handler', () => {
  let error;

  beforeEach(() => {
    error = {
      response: {
        status: 0,
        data: {
          errors: ['Name is required', 'Destination is required'],
          message: ['errors', 'fix it']
        }
      }
    };
  });

  it('should handle a case when there is no response from the server', () => {
    error = { ...error, response: null };
    expect(apiErrorHandler(error)).toEqual(
      'Possible network error, please reload the page'
    );
  });

  it('should handle a case when the server returns 500', () => {
    error = { ...error, response: { status: 500 } };
    expect(apiErrorHandler(error)).toEqual('Server error, try again');
  });

  it('should handle a case when the server returns 400', () => {
    error = {
      ...error,
      response: {
        status: 400,
        data: {
          message: 'errors',
        }
      }
    };
    expect(apiErrorHandler(error)).toEqual('errors');
  });

  it('should handle error with status code 401', () => {
    error = { ...error,
      response: {
        status: 401,
        data:{
          error: 'Token is Invalid'
        }
      }
    };
    expect(apiErrorHandler(error)).toEqual('Token is Invalid');
  });

  it('should handle a case when the server returns validation errors', () => {
    error = {
      ...error,
      response: {
        status: 422,
        data: {
          'errors': [
            { 'name': 'name', 'msg': 'Name is required' },
            { 'name': 'destination', 'msg': 'Destination is required' },
          ]
        }
      }
    };
    expect(apiErrorHandler(error)).toEqual('Name is required, Destination is required');
  });

  it('should handle a case when the server returns 404 status code', () => {
    error = {
      ...error,
      response: {
        status: 404,
        data: {
          message: 'Not found'
        }
      }
    };
    expect(apiErrorHandler(error)).toEqual('Not found');
  });
  it('should handle a case error 403 status code', () => {
    error = {
      ...error,
      response: {
        status: 403,
        data: {
          message: 'A travel region already exists'
        }
      }
    };
    expect(apiErrorHandler(error)).toEqual('A travel region already exists');
  });
  it('should handle a case error with unhandled code', () => {
    error = {
      ...error,
      response: {
        status: 504,
        data: {
          error: 'Error'
        }
      }
    };
    expect(apiErrorHandler(error)).toEqual('Error');
  });
});

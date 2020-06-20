import {
  fetchAllEmailTemplates,
  fetchAllEmailTemplatesSuccess,
  fetchAllEmailTemplatesFailure
} from '../listEmailTemplatesActions';


describe('listEmailTemplateActions', () => {
  it('should return action with type FETCH_ALL_EMAIL_TEMPLATES', () => {
    const action = fetchAllEmailTemplates('?page=2&limit=10');
    const expectedOutput = {
      type: 'FETCH_ALL_EMAIL_TEMPLATES',
      url: '?page=2&limit=10'
    };
    expect(action).toEqual(expectedOutput);
  });

  it('returns action of type FETCH_EMAIL_TEMPLATES_SUCCESS', () => {
    const response = {
      templates: [],
      pagination: {
        currentPage: 1,
        pageCount: 3
      }
    };
    const action = fetchAllEmailTemplatesSuccess(response);
    const expectedOutput = {
      type: 'FETCH_ALL_EMAIL_TEMPLATES_SUCCESS',
      templates: response.templates,
      pagination: response.pagination
    };
    expect(action).toEqual(expectedOutput);
  });

  it('returns action of type FETCH_ALL_EMAIL_TEMPLATES_FAILURE', () => {
    const errors = { errors: {}};
    const action = fetchAllEmailTemplatesFailure(errors);
    const expectedResult = {
      type: 'FETCH_ALL_EMAIL_TEMPLATES_FAILURE',
      errors
    };
    expect(action).toEqual(expectedResult);
  });
});

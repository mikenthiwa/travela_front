import {
  fetchTemplate
} from '../templatedetailsAction';
  
describe('Fetch Template Details Actions', () => {
  it('should return action of type FETCH_TEMPLATE_DETAILS', () => {
    const receivedAction = {
      type: 'FETCH_TEMPLATE_DETAILS',
      id: ''
    };
    const newAction = fetchTemplate('');
    expect(newAction).toEqual(receivedAction);
  });
});

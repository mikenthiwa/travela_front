import newSteps from '../newSteps';

let steps, currentTab;
describe('TEST newSteps() FUNCTION', () => {
  beforeEach(() => {
    steps = [
      { id: 1, name: 'Personal Information', status: '' },
      { id: 2, name: 'Trip Details', status: '' },
      { id: 3, name: 'Travel Stipends', status: '' },
      { id: 4, name: 'Travel Checklist', status: '' }
    ];
  });
  it('should set last object status', () => {
    currentTab = 3;
    const test1 = newSteps(steps, currentTab);
    expect(test1).toEqual([
      { id: 1, name: 'Personal Information', status: '' },
      { id: 2, name: 'Trip Details', status: '' },
      { id: 3, name: 'Travel Stipends', status: '' },
      { id: 4, name: 'Travel Checklist', status: 'You are currently here' }
    ])
  });

  it('should set second object status', () => {
    currentTab = 1;
    const test1 = newSteps(steps, currentTab);
    expect(test1).toEqual([
      { id: 1, name: 'Personal Information', status: '' },
      { id: 2, name: 'Trip Details', status: 'You are currently here' },
      { id: 3, name: 'Travel Stipends', status: '' },
      { id: 4, name: 'Travel Checklist', status: '' }
    ])
  });
});

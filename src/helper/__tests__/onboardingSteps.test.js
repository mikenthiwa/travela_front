import newSteps from '../onboardingSteps';

let steps, currentTab;
describe('TEST newSteps() FUNCTION', () => {
  beforeEach(() => {
    steps = [
      { id: 1, name: 'Personal Information' },
      { id: 2, name: 'Travel Document' },
    ];
  });
  it('should set second object status', () => {
    currentTab = 2;
    const test1 = newSteps(steps, currentTab);
    expect(test1).toEqual([
      { id: 1,  name: 'Personal Information' },
      { id: 2,  name: 'Travel Document' },
    ])
  });

  it('should set second object status', () => {
    currentTab = 1;
    const test1 = newSteps(steps, currentTab);
    expect(test1).toEqual([
      { id: 1, name: 'Personal Information'},
      { id: 2, name: 'Travel Document' },
    ])
  });
});

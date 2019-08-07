import React from 'react';
import { shallow } from 'enzyme';
import OnBoardingTabHead from '../OnboardingTabHead';


const props = {
  steps:[
    { id:1, position: 1, name:'Personal Information', status:'',  },
    { id:2, position: 2, name:'Travel Document', status:''}, 
  ],
  currentTab: 1,

};

let wrapper;
describe('<RequestTabHead />', () => {
  beforeEach(() => {
    wrapper=  shallow (<OnBoardingTabHead {...props} />);
  });
  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('render all the step', () =>{
    expect(wrapper.find('.request__tab-card-onboarding').length).toEqual(2);
  });
  it('calls renderTab', () => {
    const renderTabSpy = jest.spyOn(wrapper.instance(), 'renderTab');
    wrapper.instance().renderTab(props.steps[0], 1, props.steps[1]);
    expect(renderTabSpy).toHaveBeenCalled();
  });
});

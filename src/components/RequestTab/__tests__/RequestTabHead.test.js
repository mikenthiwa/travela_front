import React from 'react';
import { shallow } from 'enzyme';
import RequestTabHead from '../RequestTabHead';
import tabIcons from '../../../images/icons/new-request-icons';

const props = {
  steps:[
    { id:1, name:'Personal Information', status:'', icon: tabIcons.personal },
    { id:2, name:'Trip Details', status:'', icon: tabIcons.tripDetails },
    { id:3, name:'Travel Stipends', status:'', icon: tabIcons.stipend },
    { id:4, name:'Travel Checklist', status:'', icon: tabIcons.checkList }   
  ],
  currentTab: 3,
  editing: false
};

let wrapper;
describe('<RequestTabHead />', () => {
  beforeEach(() => {
    wrapper=  shallow (<RequestTabHead {...props} />);
  });
  it('should render properly', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('render all the step', () =>{
    expect(wrapper.find('.request__tab-card').length).toEqual(4);
  });
  it('calls renderTab', () => {
    const renderTabSpy = jest.spyOn(wrapper.instance(), 'renderTab');
    wrapper.instance().renderTab(props.steps[0], 1, props.steps[1].icon);
    expect(renderTabSpy).toHaveBeenCalled();
  });
  it('should render the correct title', () => {
    const wrapper = mount(<RequestTabHead {...props} />);

    let title = wrapper.find('.new-request_title').text();

    expect(/CREATE/.test(title)).toBeTruthy();

    wrapper.unmount();

    wrapper.setProps({
      editing: true
    });

    wrapper.mount();

    title = wrapper.find('.new-request_title').text();
    expect(/EDIT/.test(title)).toBeTruthy();
  });
});

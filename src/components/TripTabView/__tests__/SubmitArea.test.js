import React from 'react';
import { mount } from 'enzyme';
import SubmitArea from '../SubmitArea';


describe('<SubmitArea />', () => {
  const props = {
    handleSubmitArea: jest.fn(),
    currentTab:0,
    numTabs: 2
  };

  it('should render <SubmitAra />', () => {
    const wrapper = mount(<SubmitArea {...props} />);
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('.bg-btn').length).toBe(2);
  });
  it('should move to next tab on next button click', () => {
    const wrapper = mount(<SubmitArea {...props} />);
    wrapper.find('.bg-btn').at(1).simulate('click');
    expect(props.handleSubmitArea).toHaveBeenCalledWith('next');
  });
  it('should move to previous tab on back button click', () => {
    const wrapper = mount(<SubmitArea {...props} />);
    wrapper.setProps({ currentTab: 1});
    wrapper.find('.bg-btn').at(0).simulate('click');
    expect(props.handleSubmitArea).toHaveBeenCalledWith('back');
  });
});

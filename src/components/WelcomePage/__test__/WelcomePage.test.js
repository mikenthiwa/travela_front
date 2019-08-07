import React from 'react';
import WelcomePage from '../index';

describe ('<WelcomePage />',() => {

  const props = {
    nextStep: jest.fn(),
    hasBlankFields: true,
    loading: false,
    send: 'Get Started',
  };

  const wrapper = shallow(<WelcomePage {...props} />);

  it('should go to the next user onboarding tab', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const nextStep = {};
    const instance = wrapper.instance();
    jest.spyOn(instance,'handleGetStartedButtonClick');
    wrapper.find('#get-started').simulate('click',event,nextStep);
    expect(instance.handleGetStartedButtonClick).toHaveBeenCalled();
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

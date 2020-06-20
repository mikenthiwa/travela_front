import React from 'react';
import sinon from 'sinon';
import OnboardingButtonToggler from '../OnboardingButtonTogggle';

describe('<OnboardingButtonToggler />', () => {
  const props = {
    name: 'gender',
    choices:['male', 'female'],
    value: 'male',
    onClick: jest.fn(),
    onChange: jest.fn()

  };

  it('renders as expected', () => {
    const wrapper = shallow(<OnboardingButtonToggler {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('Test OnboardingButtonToggler ', () => {
    const event = { target: { value: 'yes' } };
    const spy = sinon.spy();
    const wrapper = shallow(<OnboardingButtonToggler {...props} onChange={spy} />);
    wrapper.find('button').at(0).simulate('click', event);
    expect(spy.calledOnce).toBe(true);
  });
});

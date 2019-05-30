import React from 'react';
import BackButton from '../index';

describe ('<BackButton />',() => {

  const props = {
    backStep: jest.fn()
  };

  const wrapper = shallow(<BackButton {...props} />);

  it('should go to the previous tab on click', () => {
    const event = {
      preventDefault: jest.fn(),
    };
    const backStep = {};
    const instance = wrapper.instance();
    jest.spyOn(instance,'handleBackButtonClick');
    wrapper.find('#back-submit').simulate('click',event,backStep);
    expect(instance.handleBackButtonClick).toHaveBeenCalled();
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

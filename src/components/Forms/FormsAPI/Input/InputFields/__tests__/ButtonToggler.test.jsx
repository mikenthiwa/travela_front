import React from 'react';
import ButtonToggler from '../ButtonToggler';

describe('<ButtonToggler />', () => {
  const props = {
    name: 'gender',
    choices:['male', 'female'],
    value: 'male',
    onChange: jest.fn()
  };

  it('renders as expected', () => {
    const wrapper = shallow(<ButtonToggler {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

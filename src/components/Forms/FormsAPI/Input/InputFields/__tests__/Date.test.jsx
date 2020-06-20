import React from 'react';
import Date from '../Date';

const props = {
  onBlur: jest.fn(),
  onChange: jest.fn(),
};

describe('<Date />', () => {
  it('renders as expected', () => {
    const wrapper = shallow(<Date {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('shows receives error class name', () => {
    const wrapper = shallow(<Date {...props}  />);
    expect(wrapper.prop('className')).toContain('date-wrapper');
  });
})
;

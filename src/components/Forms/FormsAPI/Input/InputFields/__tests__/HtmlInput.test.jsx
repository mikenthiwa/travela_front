import React from 'react';
import HtmlInput from '../HtmlInput';

describe('<HtmlInput />', () => {

  it('renders as expected', () => {
    const wrapper = shallow(<HtmlInput />);
    expect(wrapper).toMatchSnapshot();
  });

  it('shows receives error class name', () => {
    const wrapper = shallow(<HtmlInput error="This field is required" />);
    expect(wrapper.prop('className')).toContain('error');
  });

});

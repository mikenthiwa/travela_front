import React from 'react';
import GetStarted from '..';


describe('<GetStarted />', () => {
  const wrapper = shallow(<GetStarted />);

  it('should render without crashing', () => {
    const wrapper = shallow(<GetStarted />);
    expect(wrapper).toMatchSnapshot();
  });
});

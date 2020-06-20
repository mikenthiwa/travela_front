import React from 'react';
import RequestsPlaceholder from '../RequestsPlaceholder';


describe('<RequestsPlaceholder />', () => {
  const wrapper = shallow(<RequestsPlaceholder />);

  it('should render without crashing', () => {
    const wrapper = shallow(<RequestsPlaceholder />);
    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import TravelReadinessPlaceholder from '../TravelReadinessPlaceholder';


describe('<TravelReadinessPlaceholder />', () => {
  const wrapper = shallow(<TravelReadinessPlaceholder />);

  it('should render without crashing', () => {
    const wrapper = shallow(<TravelReadinessPlaceholder />);
    expect(wrapper).toMatchSnapshot();
  });
});

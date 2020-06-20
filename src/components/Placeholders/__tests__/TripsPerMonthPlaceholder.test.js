import React from 'react';
import TripsPerMonthPlaceholder from '../TripsPerMonthPlaceholder';


describe('<TripsPerMonthPlaceholder />', () => {
  const wrapper = shallow(<TripsPerMonthPlaceholder />);

  it('should render without crashing', () => {
    const wrapper = shallow(<TripsPerMonthPlaceholder />);
    expect(wrapper).toMatchSnapshot();
  });
});

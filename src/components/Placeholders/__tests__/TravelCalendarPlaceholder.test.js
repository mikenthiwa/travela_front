import React from 'react';
import TravelCalendarPlaceholder from '../TravelCalendarPlaceholder';


describe('<TravelCalendarPlaceholder />', () => {
  const wrapper = shallow(<TravelCalendarPlaceholder />);

  it('should render without crashing', () => {
    const wrapper = shallow(<TravelCalendarPlaceholder />);
    expect(wrapper).toMatchSnapshot();
  });
});

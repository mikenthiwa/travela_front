import React from 'react';
import TravelReasonsPlaceholder from '../TravelReasonsPlaceholders';


describe('<TravelCalendarPlaceholder />', () => {
  const wrapper = shallow(<TravelReasonsPlaceholder />);

  it('should render without crashing', () => {
    const wrapper = shallow(<TravelReasonsPlaceholder />);
    expect(wrapper).toMatchSnapshot();
  });
});

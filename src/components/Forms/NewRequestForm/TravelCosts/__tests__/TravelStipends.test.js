import React from 'react';
import { mount } from 'enzyme';
import TravelStipends from '../TravelStipends';


describe('<TravelStipends />', () => {
  const props = {
    isLoading: true, 
    stipend: 3000, 
    calculatedTotalTripStipends: 300, 
    displayType: 'sum'
  };
  const props2 = {
    isLoading: false, 
    stipend: 30,
    rate: 'Kenya', 
    calculatedTotalTripStipends: 300, 
  };

  it('should match snapshot', () => {
    const wrapper = mount(<TravelStipends {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should not render while loading', () => {
    const wrapper = mount(<TravelStipends {...props} />);
    expect(wrapper.find('Preloader')).toHaveLength(1);
  });
  it('should render when loading is complete', () => {
    const wrapper = mount(<TravelStipends props={props2} />);
    expect(wrapper.find('Preloader')).toHaveLength(0);
  });
  it('should render when loading is complete with details', () => {
    const wrapper = mount(<TravelStipends 
      isLoading={false}
      calculatedTotalTripStipends={333} 
      stipend={300} 
      displayType="sum" />);
    expect(wrapper.find('Preloader')).toHaveLength(0);
  });

});


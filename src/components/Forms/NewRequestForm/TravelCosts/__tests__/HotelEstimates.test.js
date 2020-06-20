import React from 'react';
import { mount } from 'enzyme';
import HotelEstimates from '../HotelEstimates';


describe('<HotelEstimates />', () => {
  const props = {
    isLoading: true, 
    origin: 'Nigeria', 
    destination: 'Kenya', 
    cost: 300, 
    displayType: 'sum'
  };
  const props2 = {
    isLoading: false, 
    origin: 'Nigeria', 
    destination: 'Kenya', 
    rate: 300, 
  };

  it('should match snapshot', () => {
    const wrapper = mount(<HotelEstimates {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should not render while loading', () => {
    const wrapper = mount(<HotelEstimates {...props} />);
    expect(wrapper.find('Preloader')).toHaveLength(1);
  });
  it('should render when loading is complete', () => {
    const wrapper = mount(<HotelEstimates props={props2} />);
    expect(wrapper.find('Preloader')).toHaveLength(0);
  });
  it('should render when loading is complete with details', () => {
    const wrapper = mount(<HotelEstimates 
      isLoading={false}
      calculatedTotalHotelRate={333} 
      rate={300} 
      displayType="sum" />);
    expect(wrapper.find('Preloader')).toHaveLength(0);
  });
});


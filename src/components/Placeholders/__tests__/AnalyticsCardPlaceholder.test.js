import React from 'react';
import AnalyticsCardPlaceholder from '../AnalyticsCardPlaceholder';


describe('<AnalyticsCardPlaceholder />', () => {
  const wrapper = shallow(<AnalyticsCardPlaceholder />);

  it('should render without crashing', () => {
    const wrapper = shallow(<AnalyticsCardPlaceholder />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should re-render loaders based on parent card dimensions', () => {
    const wrapper = mount(<AnalyticsCardPlaceholder />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'getContainer').mockImplementation(() => ({
      clientWidth: 1000,
      clientHeight: 500
    }));
    instance.reSize();
    const card = wrapper.find('.analytics-card');
    expect(card.length).toBe(1);
  });
});

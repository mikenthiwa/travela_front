import React from 'react';
import ChartCardPlaceholder from '../ChartCardPlaceholder';
import AnalyticsCardPlaceholder from '../AnalyticsCardPlaceholder';


describe('<ChartCardPlaceholder />', () => {
  const wrapper = shallow(<ChartCardPlaceholder />);

  it('should render without crashing', () => {
    const wrapper = shallow(<ChartCardPlaceholder />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should re-render loaders based on parent card dimensions', () => {
    const wrapper = mount(<ChartCardPlaceholder />);
    const instance = wrapper.instance();
    jest.spyOn(instance, 'getParent').mockImplementation(() => ({
      clientWidth: 1000,
      clientHeight: 500
    }));
    instance.reSize();
    const card = wrapper.find('.analytics-card');
    expect(card.length).toBe(1);
  });
});

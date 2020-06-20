import React from 'react';
import { shallow } from 'enzyme';
import StatsAnalytics from '..';

const props = {
  color: '#000',
  stats: 40,
  icon: 'sfdhd.d'
};

describe('<Dashboard />', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<StatsAnalytics {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders an error text on error with loading data', () => {
    const error = 'Oops! An error occurred in retrieving this data';
    const wrapper = shallow(<StatsAnalytics {...props} error={error} />);
    expect(wrapper.find('p').text()).toEqual(error);
  });
});

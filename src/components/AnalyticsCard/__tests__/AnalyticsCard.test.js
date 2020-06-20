import React from 'react';
import { shallow } from 'enzyme';
import AnalyticsCard from '..';

const props = {
  stats: 30,
  color: 'green',
  title: 'Test title',
  children: []
};

describe('<Dashboard />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AnalyticsCard {...props} />);
  });

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

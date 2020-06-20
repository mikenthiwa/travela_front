import React from 'react';
import { mount, shallow } from 'enzyme';
import NoTravelStipends from '../NoTravelStipends';

describe('<NoTravelStipends />', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<NoTravelStipends />);
    expect(wrapper).toMatchSnapshot();
  });
});



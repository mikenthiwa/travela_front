import React from 'react';
import { shallow } from 'enzyme';
import HelperHeader from '../index';


describe('<HelperHeader />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<HelperHeader />);
    expect(wrapper.find('PageHeader').length).toBe(1);
  });
});

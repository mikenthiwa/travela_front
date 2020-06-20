import React from 'react';
import { shallow } from 'enzyme';
import RegionPanelHeader from '../index';

const props = {
  openModal: jest.fn(),
};

describe('<RegionPanelHeader />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<RegionPanelHeader {...props} />);
    expect(wrapper.find('PageHeader').length).toBe(1);
  });
});

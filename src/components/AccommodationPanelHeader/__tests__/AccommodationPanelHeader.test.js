import React from 'react';
import AccommodationPanelHeader from '../index';

const props = {
  openModal: jest.fn(),
};


describe('<RolePanelHeader />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<AccommodationPanelHeader {...props} />);
    expect(wrapper.find('PageHeader').length).toBe(1);
  })
});

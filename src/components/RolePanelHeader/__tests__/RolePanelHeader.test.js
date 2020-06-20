import React from 'react';
import { shallow } from 'enzyme';
import RolePanelHeader from '../index';

const props = {
  openModal: jest.fn(),
};

describe('<RolePanelHeader />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<RolePanelHeader {...props} />);
    expect(wrapper.find('PageHeader').length).toBe(1);
  })
});

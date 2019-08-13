import React from 'react';
import { shallow } from 'enzyme';
import ChecklistTabs from '../ChecklistTabs';

describe ('ChecklistTabs Test Suite', () => {
  const props = {
    checklist: {}, 
    tripNum: 1, 
    onTabClick: jest.fn(), 
    isActive: false
  };

  const wrapper = shallow(<ChecklistTabs {...props} />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  });
});

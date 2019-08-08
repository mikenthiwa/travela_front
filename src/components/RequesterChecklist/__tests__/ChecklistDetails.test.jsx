import React from 'react';
import { shallow } from 'enzyme';
import ChecklistDetails from '../ChecklistDetails';

describe ('ChecklistDetails Test Suite', () => {
  const props = {
    checklist: { config: {} },
  };

  const wrapper = shallow(<ChecklistDetails {...props} />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  });

});

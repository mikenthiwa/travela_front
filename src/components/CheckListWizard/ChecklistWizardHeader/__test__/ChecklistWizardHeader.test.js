import React from 'react';
import { shallow } from 'enzyme';
import ChecklistWizardHeader from '../index';

describe('<ChecklistWizardHeader />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ChecklistWizardHeader />);
    expect(wrapper.find('div'));
  });
});

import React from 'react';
import { shallow, mount } from 'enzyme';
import { ChecklistWizardHeader } from '../index';

describe('<ChecklistWizardHeader />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ChecklistWizardHeader />);
    expect(wrapper.find('div'));
  });

  it('should display the correct header', () => {
    const props = {
      history: {
        push: jest.fn()
      }
    };
    const wrapper = mount(<ChecklistWizardHeader {...props} />);
    expect(wrapper.find('.role-panel-header')).toHaveLength(1);
    expect(wrapper.find('span.title')).toHaveLength(1);
    expect(wrapper.find('.title').first().text()).toContain('TRAVEL CHECKLIST BUILDER');
    expect(wrapper.find('button')).toHaveLength(1);
    wrapper.find('button').first().simulate('click');
    expect(props.history.push).toHaveBeenCalledTimes(1);
  });
});

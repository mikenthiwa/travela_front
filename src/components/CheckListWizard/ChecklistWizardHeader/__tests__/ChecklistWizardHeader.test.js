import React from 'react';
import { shallow, mount } from 'enzyme';
import { ChecklistWizardHeader } from '../index';

const props = {
  history: {
    push: jest.fn()
  },
  disableUndo: false,
  disableRedo: false,
  redoChecklist: jest.fn(),
  undoChecklist: jest.fn(),
  resetChecklist: jest.fn(),
};

describe('<ChecklistWizardHeader />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<ChecklistWizardHeader {...props} />);
    expect(wrapper.find('div'));
  });

  it('should display the correct header', () => {
    const wrapper = mount(<ChecklistWizardHeader {...props} />);
    expect(wrapper.find('.role-panel-header')).toHaveLength(1);
    expect(wrapper.find('span.title')).toHaveLength(1);
    expect(wrapper.find('.title').first().text()).toContain('TRAVEL CHECKLIST BUILDER');
    expect(wrapper.find('button')).toHaveLength(3);
    wrapper.find('button').first().simulate('click');
    expect(props.history.push).toHaveBeenCalledTimes(1);
  });


  it('should test shortcut keys', () => {
    const wrapper = shallow(<ChecklistWizardHeader {...props} />);
    const event1 = { metaKey: true, key: 'z', shiftKey: false };
    expect(wrapper.find('.undo-redo-container').simulate('keyDown', {metaKey: true, shiftKey: false, key: 'z'}));
    expect(wrapper.instance().shortcut(event1));
    const event2 = { metaKey: true, shiftKey: true, key: 'z' };
    expect(wrapper.find('.undo-redo-container').simulate('keyDown', {metaKey: true, shiftKey: true,  key: 'z'}));
    expect(wrapper.instance().shortcut(event2));
    wrapper.unmount();
  });
});

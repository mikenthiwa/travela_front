import React from 'react';
import {mount, shallow} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import {ChecklistConfigurationsHeader} from '../index';

describe('Tests for Checklist Wizard Header', () => {
  it('should display travel checklist builder when no config is found', () => {
    const props = {
      configFound: false,
      history: {
        push: jest.fn()
      }
    };

    const wrapper = mount(<ChecklistConfigurationsHeader {...props} />);
    expect(wrapper.find('.role-panel-header')).toHaveLength(1);
    expect(wrapper.find('span.title')).toHaveLength(1);
    expect(wrapper.find('.title').first().text()).toContain('TRAVEL CHECKLIST BUILDER');
  });

  it('should display travel checklists when one or more configs are found', () => {
    const props = {
      configFound: true,
      history: {
        push: jest.fn()
      }
    };
    const wrapper = mount(<ChecklistConfigurationsHeader {...props} />);
    expect(wrapper.find('.role-panel-header')).toHaveLength(1);
    expect(wrapper.find('span.title')).toHaveLength(1);
    expect(wrapper.find('.title').first().text()).toContain('TRAVEL CHECKLISTS');
    expect(wrapper.find('button')).toHaveLength(1);
    wrapper.find('button').first().simulate('click');
    expect(props.history.push).toHaveBeenCalledTimes(1);
  });
});

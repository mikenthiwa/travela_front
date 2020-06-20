import React from 'react';
import { mount, shallow } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import ChecklistWizardStartPage  from '../index';

describe('Tests for Checklist Wizard start page', () => {
  const props = {
    fullName: 'Jude Afam'
  };

  it('should render the component', () => {
    const wrapper = mount(
      <MemoryRouter>
        <ChecklistWizardStartPage {...props} />
      </MemoryRouter>);
    expect(wrapper.find('.start-page')).toHaveLength(1);
    expect(wrapper.find('.intro').first().text()).toContain('Welcome to The Travel CheckList Wizard');
  });

  it('should should display the first name of the user', () => {
    const wrapper = mount(
      <MemoryRouter>
        <ChecklistWizardStartPage {...props} />
      </MemoryRouter>);
    expect(wrapper.find('.welcome-message').first().text()).toContain('Jude');
  });
});

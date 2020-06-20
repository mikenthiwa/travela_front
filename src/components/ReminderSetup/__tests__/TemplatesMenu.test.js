import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import TemplatesMenu from '../TemplatesMenu';

describe('<TemplatesMenu />', () => {
  const state = {
    openClose: ''
  };
  const props = {
    disableEnable: false,
    setItemToDisable: jest.fn(),
    id: 1,
    template: {
      id: 'work'
    },
    reminder:{
      id: 'please'
    },
    history: {
      push: jest.fn()
    }
  };
  const event = {
    target: {
      preventDefault: jest.fn()
    }
  };

  it('renders without crashing', () => {
    const wrapper = mount(
      <BrowserRouter>
        <TemplatesMenu {...props} />
      </BrowserRouter>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('opens menu container', () => {
    const wrapper = mount(
      <BrowserRouter>
        <TemplatesMenu {...props} />
      </BrowserRouter>
    );
    const toggleMenu = wrapper.find('#toggleIcon');
    expect(toggleMenu.length).toEqual(1);
    toggleMenu.simulate('click', event);
    expect(wrapper.find('.open').length).toEqual(2);
    wrapper.unmount();
  });

  it('closes on click outside the component', () => {
    const wrapper = mount(
      <BrowserRouter>
        <TemplatesMenu {...props} />
      </BrowserRouter>
    );
    wrapper.simulate('mousedown');
    expect(wrapper.find('.open').length).toEqual(0);
  });

  it('reirects to edit reminder page when edit button is cliked', () => {
    const wrapper = mount(
      <BrowserRouter>
        <TemplatesMenu {...props} template={{}} />
      </BrowserRouter>
    );
    const edit = wrapper.find('.table__menu-list .top');
    expect(edit.find('a').prop('href')).toEqual('/settings/reminders/edit/0');
  });

  it('reirects to edit template page when edit button is cliked', () => {
    const wrapper = mount(
      <BrowserRouter>
        <TemplatesMenu {...props} reminder={{}} />
      </BrowserRouter>
    );
    const edit = wrapper.find('.table__menu-list .top');
    expect(edit.find('a').prop('href')).toEqual('/settings/reminder-setup/update/1');
  });
});

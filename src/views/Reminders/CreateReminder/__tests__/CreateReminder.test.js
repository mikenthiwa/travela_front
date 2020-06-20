import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { initialState } from '../../../../redux/reducers/reminders';
import CreateReminder from '..';

const state = {
  reminders: {
    ...initialState,
  },
  listEmailTemplatesReducer: {
    pagination: {
      pageCount: 2
    }
  }
};

const store = configureStore()(state);

describe('CreateReminder', () => {
  const props = {
    fetchAllEmailTemplates: jest.fn(),
    createReminder: jest.fn(),
    history: {
      push: jest.fn(),
    },
    location: {
      pathname: '/settings/reminders/create'
    },
  };


  it('should render the Create Reminder page without crashing', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CreateReminder {...props} />
        </MemoryRouter>
      </Provider>
    );
    const passportItem = wrapper.find('#Passport-Passport');
    passportItem.simulate('click');
    expect(wrapper.length).toBe(1);
    wrapper.unmount();
  });

  it('Should select the document type on first attempt', ()=> {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CreateReminder {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('.dropdown__input__value').text()).toContain('Select Document');
    const documentDropdown = wrapper.find('.dropdown__container');
    documentDropdown.simulate('click');
    const documentOpen =  wrapper.find('.dropdown__container.open');
    const passport = documentOpen.find('#Passport-Passport');
    expect(passport.text()).toContain('Passport');
    passport.simulate('click');
    expect(wrapper.find('.dropdown__input__value').text()).toContain('Passport');
  });

  it('should have a select document dropdown input with a dropdown__input_error class', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CreateReminder {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper.find('.dropdown__input').hasClass('dropdown__input_error')).toBe(true);
  });
});
describe('Edit Reminder Page', () => {
  const props = {
    fetchAllEmailTemplates: jest.fn(),
    editReminder: jest.fn(),
    isEditMode: jest.fn(),
    history: {
      push: jest.fn(),
    },
    location: {
      pathname: '/settings/reminders/edit/1'
    },
  };

  it('should render the Create Reminder page without crashing', () => {
    const parentWrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CreateReminder {...props} />
        </MemoryRouter>
      </Provider>
    );
    const wrapper = parentWrapper.find('CreateReminder');
    wrapper.instance().setState({
      documentType:'Visa'
    });

    parentWrapper.setProps({ ...props });
    parentWrapper.find('#Visa-Visa').simulate('click');
    expect(parentWrapper.length).toBe(1);
    parentWrapper.unmount();
  });
});

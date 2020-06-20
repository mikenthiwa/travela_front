import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import React from 'react';
import configureStore from 'redux-mock-store';
import UpdateEmailTemplate from '../index';

const state = {
  reminderManagement: {
    updatedEmailTemplate: {
      isSaving: false,
      errors: {},
      data: {}
    }
  }
};

const props = {
  createReminderEmailTemplate: jest.fn(),
  newEmailTemplate: {
    isSaving: true
  },
  history: {
    push: jest.fn(),
  },
  match: {
    params: {}
  },
  editing: true,
  getAllUsersEmail: jest.fn(),
  getUsersEmail: [{id:'travela', text:'travela@travela.com'}],
  errors: {}
};

describe('<UpdateEmailTemplate> page', () => {
  let wrapper;

  beforeEach(() => {
    const mockStore = configureStore();
    const store = mockStore(state);
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <UpdateEmailTemplate {...props} editing />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
    wrapper.unmount();
  });

  it('Should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

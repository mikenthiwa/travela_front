import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import React from 'react';
import configureStore from 'redux-mock-store';
import CreateEmailTemplate from '../index';

const state = {
  reminderManagement: {
    newEmailTemplate: {
      isSaving: false,
      errors: {},
      data: {}
    }
  }
};

const props = {
  createReminderEmailTemplate: jest.fn(),
  history: {
    push: jest.fn(),
  },
  match: {
    params: {}
  },
  isSaving: false,
  getAllUsersEmail: jest.fn(),
  getUsersEmail: [{id:'travela', text:'travela@travela.com'}],
  errors: {}
};

describe('<CreateEmailTemplate> page', () => {
  let wrapper;

  beforeEach(() => {
    const mockStore = configureStore();
    const store = mockStore(state);
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <CreateEmailTemplate {...props} />
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

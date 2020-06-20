import React from 'react';
import {Provider} from 'react-redux';
import {MemoryRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import sinon from 'sinon';
import { mount } from 'enzyme';
import ConnectedReminderSetup, { ReminderSetup } from '../index';


describe('<ConnectedReminderSetup />', () => {
  const props = {
    fetchTemplates: jest.fn(),
    setItemToDisable: jest.fn(),
    enableReminderEmailTemplate: jest.fn(),
    location: {},
    enableReminderEmailTemplateReducer: {
      isLoading: false,
    },
    reminderTemplateDisableReducer: {
      isLoading: false
    },
    listEmailTemplatesReducer: {
      pagination: {
        pageCount: {},
        currentPage: {}
      },
      templates: []
    },
    openModal: sinon.spy(),
    disableEmailTemplate: jest.fn(),
    closeModal: jest.fn(),
    onCancel: jest.fn(),
    history: {
      push: jest.fn(),
    },
    shouldOpen:true
  };

  const state = {
    listEmailTemplatesReducer: {
      pagination: {
        pageCount: 3,
        currentPage: 3
      },
      templates: [{
        id: 1,
        name: '',
        creator : {
          fullName: ''
        },
        createdAt: '2019-01-21T07:33:26.123Z',
        updatedAt: '2019-01-21T07:33:26.123Z',
        deletedAt: null,
        disabled: true,
      }]
    },
    enableReminderEmailTemplateReducer: {
      isLoading: false,
    },
    reminderTemplateDisableReducer: {
      isLoading: false
    },
    templateId: 1,
    modal: {
      shouldOpen: false,
      modalType: '',
    },
    templatedetails: {},
  };
  const mockStore = configureStore();
  const store = mockStore (state);
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <ConnectedReminderSetup {...props} />
      </MemoryRouter>
    </Provider>
  );
  const inst = wrapper.instance();
  it('renders', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the disable modal', () => {
    expect(wrapper.find('Modal').at(0).length).toBe(1);
  });

  it('should call the setItemToDisable function', () => {
    const shallowWrapper = mount( <ReminderSetup {...props} />);
    const templateId = { id: 5 };
    const wrapperInstance = shallowWrapper.instance();
    wrapperInstance.setItemToDisable(false,templateId);
    expect(shallowWrapper.state().templateId).toEqual(templateId.id);
  });

  it('should call the openModal function', () => {
    const shallowWrapper = mount( <ReminderSetup {...props} />);
    const templateId = { id: 5 };
    const wrapperInstance = shallowWrapper.instance();
    wrapperInstance.setItemToDisable(false,templateId);
    const { openModal } = props;
    expect(openModal.called).toEqual(true);
  });

  it('should handle onchange function', () => {
    const shallowWrapper = mount(
      <ReminderSetup
        {...{ ...props, shouldOpen: true, modalType: 'disable reminder template' }}
      />
    );
    shallowWrapper.find('textarea').simulate('change', {
      target: { value: 'hello'}
    });
    expect(shallowWrapper.state().disableReason).toEqual('hello');
  });

  it('should handle disableReminderTemplate function', () => {
    const shallowWrapper = mount(
      <ReminderSetup
        {...{ ...props, shouldOpen: true, modalType: 'disable reminder template' }}
      />
    );
    shallowWrapper.find('textarea').simulate('change', {
      target: { value: 'hello'}
    });
    shallowWrapper.find('button#oncancel').at(0).simulate('click');
    expect(shallowWrapper.state().disableReason).toEqual(null);
  });

  it('should show loading icon when `enableReminderEmailTemplateReducer.isLoading is true`', () => {
    const shallowWrapper = mount(
      <ReminderSetup
        {...{ ...props, 
          shouldOpen: true, 
          modalType: 'enable reminder template',
          enableReminderEmailTemplateReducer: {
            isLoading: true,
          }
        }}
      />
    );
    expect(shallowWrapper.find('i.loading-icon').length).toBe(1);
  });

  it('should not show icon when `enableReminderEmailTemplateReducer.isLoading is false`', () => {
    const shallowWrapper = mount(
      <ReminderSetup
        {...{ ...props, 
          shouldOpen: true, 
          modalType: 'enable reminder template',
          enableReminderEmailTemplateReducer: {
            isLoading: false,
          }
        }}
      />
    );
    expect(shallowWrapper.find('i.loading-icon').length).toBe(0);
  });

  it('should show loading icon when `reminderTemplateDisableReducer.isLoading is true`', () => {
    const shallowWrapper = mount(
      <ReminderSetup
        {...{ ...props, 
          shouldOpen: true, 
          modalType: 'disable reminder template',
          reminderTemplateDisableReducer: {
            isLoading: true,
          }
        }}
      />
    );
    expect(shallowWrapper.find('i.loading-icon').length).toBe(1);
  });

  it('should not show loading icon when `reminderTemplateDisableReducer.isLoading is false`', () => {
    const shallowWrapper = mount(
      <ReminderSetup
        {...{ ...props, 
          shouldOpen: true, 
          modalType: 'enable reminder template',
          reminderTemplateDisableReducer: {
            isLoading: true,
          }
        }}
      />
    );
    expect(shallowWrapper.find('i.loading-icon').length).toBe(0);
  });

  it('should handle enableReminderTemplate function', () => {
    const shallowWrapper = mount(
      <ReminderSetup
        {...{ ...props, shouldOpen: true, modalType: 'enable reminder template' }}
      />
    );
    shallowWrapper.find('button#oncancel').simulate('click');
    expect(shallowWrapper.state().disableReason).toEqual('');
  });
  it('calls actionBtnClickHandler function', () => {
    const createButton = wrapper.find('#actionButton')
    createButton.simulate('click')
    expect(props.history.push).toHaveBeenCalledWith("/settings/reminder-setup/create")
  })
});

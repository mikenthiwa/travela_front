import React from 'react';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import DepartmentsView,{ Departments } from '../index';

describe('<Departments />', () => {
  const props = {
    getAllDepartments: jest.fn(),
    editDepartment: jest.fn(),
    deleteDepartment: jest.fn(),
    getSingleDepartment: jest.fn(),
    addDepartment: jest.fn(),
    openModal: sinon.spy(() => Promise.resolve()),
    closeModal: jest.fn(),
    shouldOpen: false,
    modalType: '',
    department: {
      singleDepartment: {
        id: 1,
        name: 'Operations',
        parentDepartment: 1,
        parentDepartments: {
          name: 'Andela',
        },
        creator: {
          fullName: 'Adeniyi Adeyokunnu',
        },
        createdBy: 1
      },
      isLoadingDepartment: true,
      pagination: {
        pageCount: 1,
        currentPage: 1,
        totalCount: 1
      },
      departments: [
        {
          id: 1,
          name: 'Operations',
          parentDepartment: null,
          createdBy: 1
        }
      ]
    },
    location: {},
    history: {
      push: jest.fn()
    },
    modal: {
      modal: {
        modal: {
          openModal: jest.fn(),
          closeModal: jest.fn(),
          shouldOpen: false
        }
      }
    }
  };

  const state = {
    department: {
      pagination: {
        pageCount: 1,
        currentPage: 1,
        totalCount: 1
      },
      errors: {},
      isLoading: false
    },
    modal: {
      modal: {
        shouldOpen: false,
        modalType: ''
      }
    }
  };
  const mockStore = configureStore();
  const store = mockStore (state);
  let wrapper;

  beforeEach(() => {
    wrapper = mount( <Departments {...props} store={store} />);
  });

  it('renders appropriately', () => {
    const wrapper2 = mount(
      <Provider store={store}>
        <MemoryRouter>
          <DepartmentsView
            {...props} />
        </MemoryRouter>
      </Provider>
    );
    expect(wrapper2).toMatchSnapshot();
  });

  it('should show the create department modal', () => {
    wrapper.setProps({ shouldOpen: true, modalType: 'add department', department: { ...props.department, isLoadingDepartment: false}});

    wrapper.find('PageHeader').find('button').simulate('click');
    expect(wrapper.find('Modal').first().props().visibility).toEqual('visible');
  });

  it('creates a department when the create button is clicked', () => {
    wrapper.setProps({ shouldOpen: true, modalType: 'add department', department: { ...props.department, departments: [], isLoadingDepartment: false}});

    wrapper.find('form').simulate('submit', { preventDefault: jest.fn()});
    expect(props.addDepartment).toHaveBeenCalled();
  });

  it('should open the edit department modal', () => {
    wrapper.setProps({ shouldOpen: true, modalType: 'edit department', department: {
      ...props.department, departments: [
        {
          id: 1,
          name: 'Operations',
          parentDepartment: 1,
          parentDepartments: {
            name: 'Andela',
          },
          creator: {
            fullName: 'Adeniyi Adeyokunnu',
          },
          createdBy: 1
        }]
    }});

    wrapper.find('MenuItem .edit').simulate('click');
    expect(wrapper.find('Modal').first().props().visibility).toEqual('visible');
  });

  it('should open the edit department modal and edit department', () => {
    wrapper.setProps({ shouldOpen: true, modalType: 'edit department', department: {
      ...props.department,
      singleDepartment: {
        id: 1,
        name: 'Regle',
        parentDepartment: 1,
        parentDepartments: {
          name: 'Technology',
        },
        creator: {
          fullName: 'Adeniyi Adeyokunnu',
        },
        createdBy: 1
      },
      departments: [
        {
          id: 1,
          name: 'Operations',
          parentDepartment: 1,
          parentDepartments: {
            name: 'Andela',
          },
          creator: {
            fullName: 'Adeniyi Adeyokunnu',
          },
          createdBy: 1
        }]
    }});

    wrapper.find('form').simulate('submit', { preventDefault: jest.fn()});
    expect(props.editDepartment).toHaveBeenCalled();
  });
});

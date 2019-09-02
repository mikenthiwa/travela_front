import React from 'react';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme/build';
import AddDepartmentForm  from '../index';

describe('<AddDepartmentForm />', () => {
  const props = {
    editDepartment: jest.fn(),
    addDepartment: jest.fn(),
    openModal: sinon.spy(() => Promise.resolve()),
    closeModal: jest.fn(),
    shouldOpen: false,
    modalType: '',
    editing: true,
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
    values: {
      name: '',
      parentDepartment: '',
    },
    errors: {},
    hasBlankFields: true,
  };
  const mockStore = configureStore();
  const store = mockStore (state);
  let wrapper;

  beforeEach(() => {
    wrapper = mount( <AddDepartmentForm {...props} store={store} />);
  });

  it('renders appropriately', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should edit department', () => {
    wrapper.setProps({ modalType: 'edit department', department: {
      ...props.department,
      singleDepartment: {
        id: 1,
        name: 'Technology',
        parentDepartment: null,
        parentDepartments: null,
        creator: {
          fullName: 'Adeniyi Adeyokunnu',
        },
        createdBy: 1
      }
    }});

    wrapper.find('form input').at(0).simulate('change');
    wrapper.find('form').simulate('submit');
    expect(props.editDepartment).toHaveBeenCalled();
  });

  it('should edit department while name changed to empty', () => {
    wrapper.setProps({ modalType: 'edit department', department: {
      ...props.department,
      singleDepartment: {
        id: 1,
        name: 'Technology',
        parentDepartment: null,
        parentDepartments: null,
        creator: {
          fullName: 'Adeniyi Adeyokunnu',
        },
        createdBy: 1
      }
    }});

    wrapper.setState({
      ...state,
      values: {
        name: '',
        parentDepartment: '',
      }});
    wrapper.find('form input').at(0).simulate('change');
    wrapper.find('form').simulate('submit');
    expect(props.editDepartment).toHaveBeenCalled();
  });
});

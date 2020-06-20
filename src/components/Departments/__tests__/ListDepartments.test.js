import React from 'react';
import { Provider } from 'react-redux';
import sinon from 'sinon';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme/build';
import ListDepartments  from '../ListDepartments';

describe('<ListDepartments />', () => {
  const props = {
    getAllDepartments: jest.fn(),
    editDepartment: jest.fn(),
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
        },
        {
          id: 2,
          name: 'Technology',
          parentDepartment: null,
          createdBy: 1
        },
        {
          id: 3,
          name: 'Success',
          parentDepartment: null,
          createdBy: 1
        },
        {
          id: 4,
          name: 'Facilities',
          parentDepartment: null,
          createdBy: 1
        },
        {
          id: 5,
          name: 'Partner Engineering',
          parentDepartment: null,
          createdBy: 1
        },
        {
          id: 6,
          name: 'TDD',
          parentDepartment: null,
          createdBy: 1
        },
        {
          id: 7,
          name: 'Apprenticeship',
          parentDepartment: null,
          createdBy: 1
        },
        {
          id: 8,
          name: 'Finance',
          parentDepartment: null,
          createdBy: 1
        },
        {
          id: 9,
          name: 'Travel',
          parentDepartment: null,
          createdBy: 1
        },
        {
          id: 10,
          name: 'Marketing',
          parentDepartment: null,
          createdBy: 1
        },{
          id: 11,
          name: 'Communications',
          parentDepartment: null,
          createdBy: 1
        },
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

  const state = {};
  const mockStore = configureStore();
  const store = mockStore (state);
  let wrapper;

  beforeEach(() => {
    wrapper = mount( <ListDepartments {...props} store={store} />);
  });

  it('renders appropriately', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should list departments with Pagination changing to next', () => {
    wrapper.setProps({ department: {
      ...props.department,
      isLoadingDepartment: false,
      pagination: {
        pageCount: 2,
        currentPage: 1,
        totalCount: 11
      }
    }});

    const inst = wrapper.instance();

    inst.onPageChange('next');
    inst.onPageChange = jest.fn();

    inst.onPageChange('next');
    wrapper.find('.pagination Button .pagination__button').at(0).simulate('click');
    expect(inst.onPageChange).toHaveBeenCalled();
  });

  it('should list departments with Pagination changing to previous', () => {
    wrapper.setProps({
      location: {
        search: true,
      },
      department: {
        ...props.department,
        isLoadingDepartment: false,
        pagination: {
          pageCount: 2,
          currentPage: 2,
          totalCount: 11
        }
      }
    });

    const inst = wrapper.instance();

    inst.onPageChange('previous');
    inst.onPageChange = jest.fn();

    inst.onPageChange('previous');
    wrapper.find('.pagination Button .pagination__button').at(1).simulate('click');
    expect(inst.onPageChange).toHaveBeenCalled();
  });

  it('should list departments with Pagination set to 1', () => {
    wrapper.setProps({
      location: {
        search: true,
      },
      department: {
        ...props.department,
        isLoadingDepartment: false,
        pagination: {
          pageCount: 2,
          totalCount: 11
        }
      }
    });

    const inst = wrapper.instance();

    inst.onPageChange('previous');
    inst.onPageChange = jest.fn();

    inst.onPageChange('previous');
    wrapper.find('.pagination Button .pagination__button').at(1).simulate('click');
    expect(inst.onPageChange).toHaveBeenCalled();
  });
});

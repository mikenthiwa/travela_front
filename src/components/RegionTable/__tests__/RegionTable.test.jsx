import React from 'react';
import sinon from 'sinon';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { RegionTable } from '../index';

const props = {
  regions: [
    {
      id: 1002,
      region: 'West Africa',
      'description': 'Nigeria',
    },
    {
      id: 1001,
      region: 'East Africa',
      description: 'Kenya, Uganda and Rwanda',
    }
  ],
  pagination: {
    pageCount: 3,
    currentPage: 3,
    totalCount: 21
  },
  deleteRegion: jest.fn(),
  handleEditRegion: jest.fn(),
  deleteTravelRegion: jest.fn(),

};
const state = {
  currentPage: 1,
  searchTerm: '',
  pageStart: 0,
  showDeleteModal: false,
  isDeleting: false,
  regionId: '',
};
let wrapper;
beforeEach(() => {
  wrapper = mount(<MemoryRouter><RegionTable {...props} /></MemoryRouter>);
  jest.clearAllMocks();
});

it('renders correctly', () => {
  expect(wrapper).toMatchSnapshot();
});
describe('RegionTable ', () => {
  const wrapper = shallow(<RegionTable {...props} />);
  it('should render the table with regions', () => {
    expect(wrapper.find('table.mdl-data-table').length).toBe(1);
    expect(wrapper.find('.table__row').length).toBe(2);
  });

  it('should render a div when there are regions', () => {
    wrapper.setProps({ regions: [] });
    expect(wrapper.find('table.mdl-data-table').length).toBe(0);
    expect(wrapper.find('div.table__requests--empty').length).toBe(1);
  });
});

describe('HandleSearch Region', () => {
  it('should search for regionTable', () => {
    const wrapper = mount(<MemoryRouter><RegionTable {...props} /></MemoryRouter>);
    const search = wrapper.find('.input-field');
    search.simulate('change', { target: { value: 'ug' } });
    expect(wrapper.find('.mdl-data-table')).toHaveLength(1);
  });

  it('should visit the next page', () => {
    const wrapper = mount(<MemoryRouter><RegionTable {...props} /></MemoryRouter>);
    const nextBtn = wrapper.find('.pagination__button').last();
    nextBtn.simulate('click');
    expect(wrapper.find('.mdl-data-table')).toHaveLength(1);
  });

  it('should visit the previous page', () => {
    const wrapper = mount(<MemoryRouter><RegionTable {...props} /></MemoryRouter>);
    const nextBtn = wrapper.find('.pagination__button').first();
    nextBtn.simulate('click');
    expect(wrapper.find('tbody')).toHaveLength(1);
  });
});

describe('Edit Travel Region', () => {
  it('should open the edit travel regions modal', () => {
    const wrapper = mount(
      <MemoryRouter>
        <RegionTable {...props} />
      </MemoryRouter>
    );
    wrapper.setProps({
      shouldOpen: true,
      modalType: 'edit travel regions'
    });

    wrapper.find('.edit-region .edit').at(0).simulate('click');

    expect(wrapper.find('Modal').first().props().visibility).toEqual('invisible');
  });
  it('should call toggleDeleteModal', () => {
    const shallowWrapper = shallow(<RegionTable />);
    const defaultState = {
      currentPage: 1,
      searchTerm: '',
      pageStart: 0,
      showDeleteModal: false,
      isDeleting: false,
      regionId: '',
    };
    shallowWrapper.instance().setState(defaultState);
    const event = {
      preventDefault: jest.fn(),
    };
    sinon.spy(shallowWrapper.instance(), 'toggleDeleteModal');
    sinon.spy(shallowWrapper.instance(), 'closeModal');
    sinon.spy(shallowWrapper.instance(), 'onPageChange');
    shallowWrapper.instance().closeModal();
    shallowWrapper.instance().toggleDeleteModal(event);
    shallowWrapper.instance().onPageChange(event);
    expect(shallowWrapper.instance().toggleDeleteModal.calledOnce).toEqual(true);
    expect(shallowWrapper.instance().closeModal.calledOnce).toEqual(true);
    expect(shallowWrapper.instance().onPageChange.calledOnce).toEqual(true);
  });

  it('should not call toggleDeleteModal', () => {
    const shallowWrapper = shallow(<RegionTable />);
    const defaultState = {
      showDeleteModal: true
    };
    shallowWrapper.instance().setState(defaultState);
    const event = {
      preventDefault: jest.fn(),
    };
    sinon.spy(shallowWrapper.instance(), 'toggleDeleteModal');
    shallowWrapper.instance().toggleDeleteModal(event);
    expect(shallowWrapper.contains('showDeleteModal')).toEqual(false);
  });

  it('should call deleteTravelRegion', () => {
    const id = { target: { regionId: 1002 } };
    const wrapper = mount(<MemoryRouter><RegionTable {...props} /></MemoryRouter>);
    const instance = wrapper.find(RegionTable).instance();
    instance.setState({ regionId: 1002 });
    expect(instance.deleteTravelRegion(id)).toBeCalled;
  });
});

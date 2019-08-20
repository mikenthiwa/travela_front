import React from 'react';
import { shallow, mount } from 'enzyme';
import DocumentTypesList from '../DocumentTypesList';

const props = {
  isLoading: false,
  documentTypes: [{ id: 'id', name: 'type', createdAt: 'time' }],
  openForm: jest.fn(),
  openDeleteModal: jest.fn(),
};

describe('<DocumentTypesList />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<DocumentTypesList {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders preloader', () => {
    const wrapper = mount(<DocumentTypesList {...props} isLoading />);
    wrapper.find('.document-types-preloader');
    expect(wrapper.find('.document-types-preloader')).toHaveLength(1);
  });

  it('opens edit modal', () => {
    const wrapper = mount(<DocumentTypesList {...props} />);
    wrapper.instance().openEditForm({ name: 'type' })();
    expect(props.openForm).toHaveBeenCalledWith({  name: 'type' });
  });

  it('opens delete modal', () => {
    const wrapper = mount(<DocumentTypesList {...props} />);
    wrapper.instance().openDeleteModal({ name: 'type' })();
    expect(props.openDeleteModal).toHaveBeenCalledWith({  name: 'type' });
  });

  it('handles page changes', () => {
    const wrapper = mount(<DocumentTypesList {...props} />);
    wrapper.instance().onPageChange(2);
    expect(wrapper.state('currentPage')).toBe(2);
  });
});

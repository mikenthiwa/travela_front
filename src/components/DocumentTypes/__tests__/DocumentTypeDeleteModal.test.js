import React from 'react';
import { shallow, mount } from 'enzyme';
import DocumentTypeDeleteModal from '../DocumentTypeDeleteModal';

const props = {
  isLoading: false,
  shouldOpen: true,
  modalType: 'DELETE_DOCUMENT_TYPE',
  closeModal: jest.fn(),
  deleteDocumentTypes: jest.fn(),
};

describe('<DocumentTypeDeleteModal />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<DocumentTypeDeleteModal {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('handles submission', () => {
    const wrapper = mount(<DocumentTypeDeleteModal {...props} />);
    wrapper.find('button.delete-button').first().simulate('click');
    expect(props.deleteDocumentTypes).toHaveBeenCalledTimes(1);
  });

  it('handles close modal', () => {
    const wrapper = mount(<DocumentTypeDeleteModal {...props} />);
    wrapper.find('button.cancel-button-type').first().simulate('click');
    expect(props.closeModal).toHaveBeenCalledTimes(1);
  });
});

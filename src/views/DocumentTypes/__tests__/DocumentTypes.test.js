import React from 'react';
import { mount, shallow } from 'enzyme';
import DocumentTypes from '..';

jest.mock('react-redux', () => ({
  connect: (state, dispatch) => {
    state({ modal: {}, documentTypes: {} });
    return component => component;
  }
}));

const props = {
  documentTypes: {
    documentTypes: [{ id: 'id', name: 'type '}],
    isLoading: false,
  },
  shouldOpen: false,
  openModal: jest.fn(),
  closeModal: jest.fn(),
  page: {},
  modalType: '',
  editDocumentTypes: jest.fn(),
  createDocumentTypes: jest.fn(),
  deleteDocumentTypes: jest.fn(),
  fetchDocumentTypes: jest.fn(),
};

describe('<DocumentTypes />', () => {
  
  it('renders without errors', () =>{
    const wrapper = shallow(<DocumentTypes {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('opens create/edit forms', () => {
    const wrapper = mount(<DocumentTypes {...props} />);
    wrapper.instance().openForm();
    expect(props.openModal).toHaveBeenCalledWith(true, 'CREATE_DOCUMENT_TYPE', undefined);
    props.openModal.mockClear();
    wrapper.instance().openForm({ id: 'id', name: 'type' });
    expect(props.openModal).toHaveBeenCalledWith(true, 'EDIT_DOCUMENT_TYPE', { id: 'id', name: 'type' });
  });

  it('opens deleteModal', () => {
    props.openModal.mockClear();
    const wrapper = mount(<DocumentTypes {...props} />);
    wrapper.instance().openDeleteModal({ id: 'id', name: 'type' });
    expect(props.openModal).toHaveBeenCalledWith(true, 'DELETE_DOCUMENT_TYPE', { id: 'id', name: 'type' });
  });

  it('edit document type', () => {
    const wrapper = mount(<DocumentTypes {...props} />);
    wrapper.instance().editDocumentTypes('newname');
    expect(props.editDocumentTypes).toHaveBeenCalledTimes(1);
  });

  it('delete document type', () => {
    const wrapper = mount(<DocumentTypes {...props} />);
    wrapper.instance().deleteDocumentTypes('newname');
    expect(props.deleteDocumentTypes).toHaveBeenCalledTimes(1);
  });
});

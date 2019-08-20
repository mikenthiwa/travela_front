import React from 'react';
import { shallow, mount } from 'enzyme';
import DocumentTypesForm from '../DocumentTypesForm';

const props = {
  isLoading: false,
  shouldOpen: true,
  initialValue: '',
  modalType: 'CREATE_DOCUMENT_TYPE',
  closeModal: jest.fn(),
  editDocumentTypes: jest.fn(),
  createDocumentTypes: jest.fn(),
};

describe('<DocumentTypesForm />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<DocumentTypesForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('resets state', () => {
    const wrapper = mount(<DocumentTypesForm {...props} />);
    wrapper.find('input.document-type-input').first().simulate('change', { target: { value: 'name' } });
    expect(wrapper.state('value')).toBe('name');
    
    wrapper.setProps({ shouldOpen: false });
    expect(wrapper.state('value')).toBe('');
  });

  it('handles input change', () => {
    const wrapper = mount(<DocumentTypesForm {...props} />);
    wrapper.find('input.document-type-input').first().simulate('change', { target: { value: 'name' } });
    expect(wrapper.state('value')).toBe('name');

    wrapper.find('input.document-type-input').first().simulate('change', { target: { value: '' } });
    expect(wrapper.state('error')).toBeTruthy();
  });

  it('handles submit for create', () => {
    const wrapper = mount(<DocumentTypesForm {...props} />);
    wrapper.find('input.document-type-input').first().simulate('change', { target: { value: 'name' } });
    expect(wrapper.state('value')).toBe('name');
    
    wrapper.find('button.save-button').first().simulate('click');
    expect(props.createDocumentTypes).toHaveBeenCalledWith({ name: 'name' });
  });

  it('handles submit for edit', () => {
    const wrapper = mount(<DocumentTypesForm {...props} modalType="EDIT_DOCUMENT_TYPE" />);
    wrapper.find('input.document-type-input').first().simulate('change', { target: { value: 'name' } });
    expect(wrapper.state('value')).toBe('name');
    
    wrapper.find('button.save-button').first().simulate('click');
    expect(props.editDocumentTypes).toHaveBeenCalledWith('name');
  });
});

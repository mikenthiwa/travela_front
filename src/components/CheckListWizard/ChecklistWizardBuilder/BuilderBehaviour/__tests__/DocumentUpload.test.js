import React from 'react';
import { shallow, mount } from 'enzyme';
import DocumentUpload from '../DocumentUpload';

jest.mock('react-redux', () => ({
  connect: (state, dispatch) => {
    state({ modal: {}, documentTypes: {} });
    return component => component;
  }
}));

const props = {
  behaviour: { type: 'UPLOAD_DOCUMENT' },
  handleBehaviour: jest.fn(),
  documentTypes: [{ id: 'id', name: 'type'}],
  fetchDocumentTypes: jest.fn(),
};

describe('<DocumentUpload />', () => {
  it('renders properly', () => {
    const wrapper = shallow(<DocumentUpload {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('fetches document types', () => {
    props.fetchDocumentTypes.mockClear();
    mount(<DocumentUpload {...props} />);
    expect(props.fetchDocumentTypes).toHaveBeenCalledTimes(1);
  });

  it('handles dropdown change', () => {
    const wrapper = mount(<DocumentUpload {...props} />);
    props.handleBehaviour.mockClear();
    wrapper.instance().handleDropdownChange('new type');
    expect(props.handleBehaviour).toHaveBeenCalledTimes(1);
  });
});

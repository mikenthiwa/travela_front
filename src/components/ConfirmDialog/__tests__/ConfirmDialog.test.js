import React from 'react';
import { shallow } from 'enzyme';
import ConfirmDialog from '../ConfirmDialog';

const props = {
  id: '1',
  modalInvisible: true,
  buttonSelected: false,
  renderDialogText: jest.fn(),
  closeDeleteModal: jest.fn(),
  handleApprove: jest.fn(),
  handleReject: jest.fn(),
  documentText: 'Request',
  isConfirmDialogLoading:false
};


describe('ConfirmDialog component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<ConfirmDialog {...props} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the ConfirmDialog component as expected', () => {
    expect(wrapper.find('p').length).toBe(1);
    expect(wrapper.find('button').length).toBe(1);
    expect(wrapper.find('Modal').length).toBe(1);
    expect(wrapper.length).toBe(1);
  });

  it('should change the visibility of confirmDialog if modalInvisible is false', () => {
    wrapper.setProps({ buttonSelected: 'Approve' });
    wrapper.setProps({ modalInvisible: false });
    expect(wrapper.props().children.props.visibility).toBe('visible');
  });

  it('should change the visibility of confirmDialog if modalInvisible is true', () => {
    wrapper.setProps({ modalInvisible: true });
    expect(wrapper.props().children.props.visibility).toBe('invisible');
  });

  it('should change the modal title based on button selected', () => {
    wrapper.setProps({ buttonSelected: 'Approve' });
    expect(wrapper.props().children.props.title).toBe('Approve Request?');
  });

  it('should change the modal title based on button selected', () => {
    wrapper.setProps({ buttonSelected: 'Reject' });
    expect(wrapper.props().children.props.title).toBe('Reject Request?');
  });

  it('should call handleApprove method when approve button is clicked', () => {
    wrapper.setProps({ buttonSelected: 'Approve' });
    const button = wrapper.find('#Approve');
    button.simulate('click');
    expect(props.handleApprove).toHaveBeenCalledTimes(1);
  });

  it('should call handleApprove method when Reject button is clicked', () => {
    wrapper.setProps({ buttonSelected: 'Reject' });
    const button = wrapper.find('#Reject');
    button.simulate('click');
    expect(props.handleApprove).toHaveBeenCalledTimes(1);
  });

});

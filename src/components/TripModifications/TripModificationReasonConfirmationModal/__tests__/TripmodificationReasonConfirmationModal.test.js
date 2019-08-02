import React from 'react';
import TripModificationReasonConfirmationModal from '../TripModificationReasonConfirmationModal';

const props = {
  closeModal: jest.fn(),
  shouldOpen: true,
  submittingReason: false,
  modalType: 'Modify Dates request modification confirmation',
  type: 'Modify Dates',
  message: 'Please provide a valid reason for making this modification',
  title: 'Modify Dates',
  onSubmit: jest.fn()
};

const setup = (p = {}) => {
  const finalProps = {...props, ...p};
  return mount(<TripModificationReasonConfirmationModal {...finalProps} />);
};
describe('TripModificationModal', () => {
  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should open the modal based on the type of the modification request', () => {
    const wrapper = setup();
    expect(wrapper.find('.modal').length).toEqual(1);
  });

  it('should not open the modal based on the type of the modification request', () => {
    const wrapper = setup({shouldOpen: false});
    expect(wrapper.find('.modal').length).toEqual(0);
  });

  it('should close the modal on cancel', () => {
    const wrapper = setup();
    wrapper.find('button#cancel').simulate('click');
    expect(props.closeModal).toHaveBeenCalled();
  });

  it('should simulate submit on the modal', () => {
    const wrapper = setup();
    wrapper.find('button#submit').simulate('click');
    expect(wrapper.find('.modal').length).toEqual(1);
  });
});

import React from 'react';
import TripModificationReasonModal from '../TripModificationReasonModal';

const props = {
  closeModal: jest.fn(),
  shouldOpen: true,
  submittingReason: false,
  modalType: 'Cancel Trip request modification',
  type: 'Cancel Trip',
  message: 'Please provide a valid reason for making this modification',
  title: 'Cancel Trip',
  onSubmit: jest.fn()
};

const setup = (p = {}) => {
  const finalProps = {...props, ...p};
  return mount(<TripModificationReasonModal {...finalProps} />);
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

  it('should submit the modification reason upon submit', () => {
    const wrapper = setup();
    const textarea = wrapper.find('textarea');
    textarea.simulate('change', {
      target: {
        value: 'This is the reason I have provided'
      }
    });
    const button = wrapper.find('form');
    button.simulate('submit', { preventDefault: () => {}});
    expect(props.onSubmit).toHaveBeenCalledWith('This is the reason I have provided');
    expect(props.closeModal).toHaveBeenCalled();
  });

  it('should display the correct label based on the message', () => {
    const wrapper = setup();
    wrapper.setProps({ message: 'This is the new message'});
    expect(wrapper.find('Input[name="reason"]').props().label).toEqual('This is the new message');
  });

  it('should close the modal on cancel', () => {
    const wrapper = setup();
    wrapper.find('button#cancel').simulate('click');
    expect(props.closeModal).toHaveBeenCalled();
  });
});

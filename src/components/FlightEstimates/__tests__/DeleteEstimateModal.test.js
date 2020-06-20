import React from 'react';
import { mount, shallow } from 'enzyme';
import DeleteFlightEstimateModal from '../DeleteEstimateModal';

describe('<DeleteFlightEstimateModal />', () => {
  const props = {
    closeModal: jest.fn(),
    selectedEstimate: {},
    modalType: '',
    shouldOpen: false,
    isDeleting: false,
    deleteFlightEstimate: jest.fn(),
    id: 1
  };
  const event = {
    target: {
      preventDefault: jest.fn()
    }
  };

  it('should render without crashing', () => {
    const wrapper = mount(<DeleteFlightEstimateModal {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should close the modal when the cancel button is clicked', () => {
    const wrapper = mount(
      <DeleteFlightEstimateModal
        {...props}
        shouldOpen
        modalType="Delete flight estimate"
      />
    );
    wrapper.find('.bg-btn--inactive').simulate('click', event);
    expect(props.closeModal).toHaveBeenCalled();
  });

  it('should call delete flight estimate action when delete is clicked', () => {
    const wrapper = mount(
      <DeleteFlightEstimateModal 
      {...props} 
      shouldOpen 
      modalType="Delete flight estimate" 
      />
    );
    wrapper.find('.bg-btn--active--delete-stipend').simulate('click', event);
    expect(props.deleteFlightEstimate).toHaveBeenCalled();
  });
});

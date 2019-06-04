import React from 'react';
import { mount, shallow } from 'enzyme';
import DeleteEstimateModal from '../DeleteEstimateModal';

describe('<DeleteEstimateModal />', () => {
  const props = {
    closeModal: jest.fn(),
    selectedStipend: {},
    modalType: '',
    shouldOpen: false,
    isDeleting: false,
    deleteHotelEstimate: jest.fn(),
    id: 1
  };
  const event = {
    target: {
      preventDefault: jest.fn()
    }
  };

  it('renders without crashing', () => {
    const wrapper = mount(<DeleteEstimateModal {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('it should close the modal when the cancel button is clicked', () => {
    const wrapper = mount(
      <DeleteEstimateModal
        {...props}
        shouldOpen
        modalType="Delete hotel estimate"
      />
    );

    wrapper.find('.bg-btn--inactive').simulate('click', event);
    expect(props.closeModal).toHaveBeenCalled();
  });

  it('should call delete Hotel Estimate when delete is clicked', () => {
    const wrapper = mount(
      <DeleteEstimateModal {...props} shouldOpen modalType="Delete hotel estimate" />
    );

    wrapper.find('.bg-btn--active--delete-stipend').simulate('click', event);
    expect(props.deleteHotelEstimate).toHaveBeenCalled();
  });
});

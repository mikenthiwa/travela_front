import React from 'react';
import { mount, shallow } from 'enzyme';
import ConfirmDeleteModal from '../ConfirmDeleteModal';
import ConfirmDialog from '../../ConfirmDialog/ConfirmDialog';

describe('<ConfirmDeleteModal />', () => {
  const props = {
    closeModal: jest.fn(),
    deleteTravelStipend: jest.fn(),
    selectedStipend: {},
    modalType: '',
    shouldOpen: false,
    isDeleting: false,
    id: 1
  };

  const event = {
    target: {
      preventDefault: jest.fn()
    }
  };

  it('renders without crashing', () => {
    const wrapper = mount(<ConfirmDeleteModal {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('it should close the modal when the cancel button is clicked', () => {
    const wrapper = mount(
      <ConfirmDeleteModal
        {...props}
        shouldOpen
        modalType="Delete Stipend"
      />
    );

    wrapper.find('.bg-btn--inactive').simulate('click', event);
    expect(props.closeModal).toHaveBeenCalled();
  });

  it('should call deleteTravelStipend when delete is clicked', () => {
    const wrapper = mount(
      <ConfirmDeleteModal {...props} shouldOpen modalType="Delete Stipend" />
    );

    wrapper.find('.bg-btn--active--delete-stipend').simulate('click', event);
    expect(props.deleteTravelStipend).toHaveBeenCalled();
  });
});

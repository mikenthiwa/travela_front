import React from 'react';
import TripModifications from '../index';


const modification = (overrides) => ({
  id: 1,
  status: 'Open',
  type: 'Cancel Trip',
  requestId: '123213',
  approvedBy: null,
  approverId: null,
  ...overrides
});

const props = {
  modification: modification(),
  name: 'Moses Gitau',
  updateModification: jest.fn(),
  tripModification: {
    updatingStatus: false
  }
};


const setup = (otherProps = {}) => {
  const fullProps = {...props, ...otherProps};
  return mount(<TripModifications {...fullProps} />);
};

describe('Trip Modifications', () => {

  it('should render correctly', () => {
    const wrapper = setup();
    expect(wrapper).toMatchSnapshot();
  });

  it('should display the modification text based on the initial open status for modify requests', () => {
    const wrapper = setup({ modification: modification({ type: 'Modify Dates'})});
    expect(wrapper.find('.trip-modification__title').text())
      .toEqual('Moses Gitau would like to modify this request due to the following reason');
  });

  it('should display the modification text based on the status', () => {
    const wrapper = setup({ modification: modification({ status: 'Approved'})});
    const span = wrapper.find('.trip-modification__status').find('span');
    expect(span.text()).toEqual('Trip Cancelled');
    expect(wrapper.find('.trip-modification__title').text())
      .toEqual('This trip was cancelled due to the following reason:');
  });

  it('should display the modification text based on the status for modify trips', () => {
    const wrapper = setup({ modification: modification({ status: 'Approved', type: 'Modify Dates'})});
    const span = wrapper.find('.trip-modification__status').find('span');
    expect(span.text()).toEqual('Trip Modified');
    expect(wrapper.find('.trip-modification__title').text())
      .toEqual('This trip was modified due to the following reason:');
  });

  it('should display the declined status message', () => {
    const wrapper = setup({ modification: modification({ status: 'Rejected'})});
    const span = wrapper.find('.trip-modification__status').find('span');
    expect(span.text()).toEqual('Declined');
    expect(wrapper.find('.trip-modification__title').text())
      .toEqual('This trip was submitted for cancellation due to the following reason. ' +
        'However, the cancellation request was declined.');
  });

  it('should display the declined status message for modify trips', () => {
    const wrapper = setup({ modification: modification({ status: 'Rejected', type: 'Modify Dates'})});
    const span = wrapper.find('.trip-modification__status').find('span');
    expect(span.text()).toEqual('Declined');
    expect(wrapper.find('.trip-modification__title').text())
      .toEqual('This trip was submitted for modification due to the following reason. ' +
        'However, the modification request was declined.');
  });


  it('should call the action based on the decision', () => {
    const wrapper = setup();
    const instance = wrapper.instance();

    wrapper.setState({ buttonSelected: 'Approve'});

    instance.handleDecision();
    expect(props.updateModification).toHaveBeenCalledWith(modification().id, 'Approved');
  });

  it('should call the action based on the decision for modify requests', () => {
    const wrapper = setup();
    const instance = wrapper.instance();

    wrapper.setState({ buttonSelected: 'Approve'});

    instance.handleDecision();
    expect(props.updateModification).toHaveBeenCalledWith(modification({type: 'Modify dates'}).id, 'Approved');
  });

  it('should display the loader when updating the status of the modification', () => {
    const wrapper = setup();
    wrapper.find('button.action-button--approve').simulate('click');
    wrapper.setProps({ tripModification: { updatingStatus: true }});
    expect(wrapper.find('ButtonLoadingIcon').props().isLoading).toBeTruthy();

    wrapper.setProps({ tripModification: { updatingStatus: false }});
    expect(wrapper.state().modalInvisible).toBeTruthy();
  });

  it('should select the correct button on click', () => {
    const wrapper = setup();
    wrapper.find('button.action-button--approve').simulate('click');
    expect(wrapper.state().buttonSelected).toEqual('Approve');
    wrapper.find('button.action-button--reject').simulate('click');
    expect(wrapper.state().buttonSelected).toEqual('Reject');
  });

  it('should hide the modal on close', () => {
    const wrapper = setup();

    wrapper.find('button.action-button--approve').simulate('click');
    wrapper.find('.modal-close').simulate('click');
    expect(wrapper.state().modalInvisible).toBeTruthy();
  });

});

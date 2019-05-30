import React from 'react';
import NewChecklistForm from '../index';

describe('<NewChecklistForm />', () => {
  let wrapper;
  const props = {
    createTravelChecklist: jest.fn(() => {}),
    fetchTravelChecklist: jest.fn(() => {}),
    closeModal: jest.fn(),
    updateTravelChecklist: jest.fn(),
    modalType: 'new checklist',
    checklistItem: {},
    selectedCenter: 'Nairobi',
    currentUser: {}
  };
  const defaultState = {
    values: {
      itemName: '',
      label: '',
      link: '',
      requiresFiles: ''
    },
    errors: {},
    hasBlankFields: true,
    optionalFields: ['label', 'link', 'requiresFiles']
  };

  beforeEach(() => {
    wrapper = mount(<NewChecklistForm {...props} />);
  });


  it('renders without crashing', () => {
    expect(wrapper.length).toEqual(1);
    wrapper.unmount();
  });

  it('handles handleCancel method', () => {
    wrapper = mount(<NewChecklistForm {...props} />);
    const cancelBtn = wrapper.find('#cancel');
    cancelBtn.simulate('click');
    expect(props.closeModal).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });

  it('should handle creation of a checklist', () => {
    const submitBtn = wrapper.find('#submit');
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const event = {
      preventDefault: jest.fn()
    };
    wrapper.setState({...defaultState, itemName: 'passport', hasBlankFields: false });
    submitBtn.simulate('submit', event);
    expect(spy).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });

  it('should handle edit of a checklist', () => {
    const submitBtn = wrapper.find('#submit');
    const spy = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const event = {
      preventDefault: jest.fn()
    };
    wrapper.setState({...defaultState, itemName: 'Visa card', hasBlankFields: false });
    wrapper.setProps({ modalType: 'edit cheklistItem'});
    submitBtn.simulate('submit', event);
    expect(spy).toHaveBeenCalledTimes(1);
    wrapper.unmount();
  });

  it('should not enable save button with of a checklist with no value', () => {
    wrapper.setProps({ modalType: 'edit cheklistItem'});
    wrapper.setState({ ...defaultState, itemName: '' });
    expect(wrapper.state().hasBlankFields).toBe(true);
    wrapper.unmount();
  });
});

import React from 'react';
import EditTravelReason from '../index';

const props = {
  errors: {},
  createTravelReason: jest.fn(),
  closeModal: jest.fn(),
  travelReason: {
    editReason: {
      id: 1,
      title: 'This is a title',
      description: 'This is a description'
    }
  },
  isLoading: false,
  editing: true,
  editTravelReason: jest.fn()
};

const event = {
  preventDefault: jest.fn()
};

describe('Edit TravelReasonForm', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<EditTravelReason {...props} />);
  });

  it('should populate with the edit reason values', () => {
    expect(wrapper.state().values).toEqual({
      description: 'This is a description',
      title: 'This is a title'
    });
  });

  it('should not enable the submit button if the values have not changed', () => {
    const titleInput = wrapper.find('input[name="title"]');
    titleInput.simulate('change', { target: { value: 'This is a title'}});
    titleInput.simulate('blur');

    expect(wrapper.state().hasBlankFields).toBeTruthy();
  });

  it('should enable the submit button if the values have changed', () => {
    const titleInput = wrapper.find('input[name="title"]');
    titleInput.simulate('change', { target: { value: 'This changed'}});
    titleInput.simulate('blur');

    expect(wrapper.state().hasBlankFields).toBeFalsy();
  });

  it('should edit the travel reason by id', () => {
    wrapper.find('form').simulate('submit', event);

    expect(props.editTravelReason).toHaveBeenCalledWith(props.travelReason.editReason);
  });
});

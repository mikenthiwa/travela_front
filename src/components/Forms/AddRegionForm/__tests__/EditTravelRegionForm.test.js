import React from 'react';
import AddRegionForm from '..';

const props = {
  errors: {},
  closeModal: jest.fn(),
  regionDetail: {
    id: 1,
    region: 'North Europe',
    description: 'North-Europe'
  },
  isLoading: false,
  editing: true,
  editRegion: jest.fn(),
  addRegion: jest.fn(),
  fetchRegions: jest.fn()
};

const event = {
  preventDefault: jest.fn()
};

describe('Edit TravelRegionorm', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<AddRegionForm {...props} />);
  });

  it('should populate with the edit region values', () => {
    wrapper.setState({values: {region: 'North Europe', description: 'North Europe'}});
    expect(wrapper.state().values).toEqual({
      description: 'North Europe',
      region: 'North Europe'
    });
  });

   

  it('should enable the submit button if the values have changed', () => {
    const titleInput = wrapper.find('input[name="region"]');
    titleInput.simulate('change', { target: { value: 'North Europ'}});
    titleInput.simulate('blur');

    expect(wrapper.state().hasBlankFields).toBeFalsy();
  });

  it('should edit the travel region by id', () => {
    wrapper.find('form').simulate('submit', event);

    expect(props.editRegion).toHaveBeenCalledWith({'description': 'North-Europe', 'id': 1, 'region': 'North Europe'});
  });
});

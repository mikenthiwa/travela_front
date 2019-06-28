import React from 'react';
import AddRegionForm from '..';

const propsFactory = (overrides) => ({
  addRegion: jest.fn(),
  closeModal: jest.fn(),
  addingRegion: false,
  regionDetail: {
    description: '',
    region: ''
  },
  ...overrides,
});

describe('<AddRegionForm />', () => {
  const addUpdateHelper = ( wrapper, region, regionDescription ) => {
    const addForm = wrapper.find('form#add-region-form');
    const regionInput = wrapper.find('input#add-region-name');
    const descriptionInput = wrapper.find('textarea#add-region-description');
    const handleSubmit = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const regionEvent = {
      target: {
        value: { region }
      }
    };

    regionInput.simulate('change', regionEvent);

    const descriptionEvent = {
      target: {
        value: { regionDescription }
      }
    };

    descriptionInput.simulate('change', descriptionEvent);
    addForm.simulate('submit', {
      preventDefault: jest.fn()
    });
    expect(wrapper.state().values).toEqual({
      region: { region },
      description: { regionDescription }
    });
    expect(handleSubmit).toBeCalled();
  };

  it('renders correctly', () => {
    const props = propsFactory();
    const wrapper = mount(<AddRegionForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('does not call the addRegion function if some fields have no values', () => {
    const props = propsFactory();
    const wrapper = mount(<AddRegionForm {...props} />);
    const addForm = wrapper.find('form#add-region-form');
    const regionInput = wrapper.find('input#add-region-name');
    const handleSubmit = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const event = {
      target: {
        value: 'region'
      }
    };
    regionInput.simulate('change', event);

    addForm.simulate('submit', {
      preventDefault: jest.fn()
    });
    expect(handleSubmit).toBeCalled();
    expect(props.addRegion.mock.calls.length).toBe(0);
  });
  it('it should validate values ', () => {
    const props = propsFactory();
    const wrapper = mount(<AddRegionForm {...props} />);
    const addForm = wrapper.find('form#add-region-form');
    const regionInput = wrapper.find('textarea#add-region-description');
    const handleSubmit = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const event = {
      target: {
        value: 'description'
      }
    };
    regionInput.simulate('change', event);

    addForm.simulate('submit', {
      preventDefault: jest.fn()
    });
    expect(handleSubmit).toBeCalled();
    expect(props.addRegion.mock.calls.length).toBe(0);
  });

  it('closes modal when cancel button is clicked', ()=>{
    const props = propsFactory();
    const wrapper = mount(<AddRegionForm {...props} />);
    const cancelButton = wrapper.find('button#cancel');
    cancelButton.simulate('click', {
      preventDefault: jest.fn()
    });
    expect(props.closeModal).toBeCalled();
  });

  it('displays button with loading icon when a region is added', () => {
    const props = propsFactory({ addingRegion : true });
    const wrapper = mount(<AddRegionForm {...props} />);
    expect(wrapper.find('ButtonLoadingIcon').prop('isLoading')).toEqual(true);
  });
});

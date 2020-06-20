import React from 'react';
import AddHelpResourceForm from '..';

const propsFactory = (overrides) => ({
  addResource: jest.fn(),
  closeModal: jest.fn(),
  addingHelpResource: false,
  linkDetail: {
    link: '',
    address: ''
  },
  ...overrides,
});

describe('<AddHelpResourceForm />', () => {
  const addUpdateHelper = ( wrapper, link, address ) => {
    const addForm = wrapper.find('form#add-help-resource-form');
    const linkInput = wrapper.find('input#add-link-label');
    const addressInput = wrapper.find('input#add-link-address');
    const handleSubmit = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const linkEvent = {
      target: {
        value: { link }
      }
    };

    linkInput.simulate('change', linkEvent);

    const addressEvent = {
      target: {
        value: { address }
      }
    };

    addressInput.simulate('change', addressEvent);
    addForm.simulate('submit', {
      preventDefault: jest.fn()
    }); 
    expect(wrapper.state().values).toEqual({
      link: { link },
      address: { address }
    });
    expect(handleSubmit).toBeCalled();
  };
  
  it('renders the form correctly', () => {
    const props = propsFactory();
    const wrapper = mount(<AddHelpResourceForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('does not call the addResource function if link field is missing', () => {
    const props = propsFactory();
    const wrapper = mount(<AddHelpResourceForm {...props} />);
    const addForm = wrapper.find('form#add-help-resource-form');
    const linkInput = wrapper.find('input#add-link-label');
    const handleSubmit = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const event = {
      target: {
        value: 'link'
      }
    };
    linkInput.simulate('change', event);

    addForm.simulate('submit', {
      preventDefault: jest.fn()
    });
    expect(handleSubmit).toBeCalled();
    expect(props.addResource.mock.calls.length).toBe(0);
  });

  it('does not call the addResource function if address field is missing', () => {
    const props = propsFactory();
    const wrapper = mount(<AddHelpResourceForm {...props} />);
    const addForm = wrapper.find('form#add-help-resource-form');
    const addressInput = wrapper.find('input#add-link-address');    
    const handleSubmit = jest.spyOn(wrapper.instance(), 'handleSubmit');
    const event = {
      target: {
        value: 'address'
      }
    };
    addressInput.simulate('change', event);

    addForm.simulate('submit', {
      preventDefault: jest.fn()
    });
    expect(handleSubmit).toBeCalled();
    expect(props.addResource.mock.calls.length).toBe(0);
  });

  it('closes modal when cancel button is clicked', ()=>{
    const props = propsFactory();
    const wrapper = mount(<AddHelpResourceForm {...props} />);
    const cancelButton = wrapper.find('button#cancel');
    cancelButton.simulate('click', {
      preventDefault: jest.fn()
    });
    expect(props.closeModal).toBeCalled();
  });

});

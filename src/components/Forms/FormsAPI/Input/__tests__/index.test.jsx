import React from 'react';
import Input from '..';
import context from '../../FormContext/FormContext'


jest.mock('../../FormContext/FormContext', () => {
  return {
    RealFormContext: {
      Consumer: ({ children }) => children({
        values: { name: '' },
        validatorName: 'validator',
        errors: { name: 'This field is required'},
        targetForm: {
          validate: jest.fn(),
        }
      })
    }
  };
});

describe('<Input />', () => {
  let wrapper;

  beforeEach(() => {

    wrapper = mount(
      <Input
        name="name"
        type="text"
        onChange={()=>{}}
        label="Test label"
      />
    );
  });


  it('renders as expected', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('Displays the error messge', () => {
    const errorText = wrapper.find('span.error').text();
    expect(errorText).toBe('This field is required');
  });

});

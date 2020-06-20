import React from 'react';
import { mount } from 'enzyme';
import TemplateDetailsForm from '../TemplateDetailsForm';

describe('<TemplateDetailsForm />', () => {
  const props = { 
    selectedTemplate: {}, 
    closeModal: jest.fn(),
    history: {
      push: jest.fn()
    }
  };

  const event = {
    target: {
      preventDefault: jest.fn()
    }
  };

  it('renders without crashing', () => {
    const wrapper = mount(<TemplateDetailsForm {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls onsend on clicking the submit button', () =>{
    const wrapper = mount(<TemplateDetailsForm {...props} />);
    wrapper.find('button#submit').simulate('click');
    expect(props.history.push).toHaveBeenCalled();
  });

  it('calls oncancel function', () => {
    const wrapper = mount(<TemplateDetailsForm {...props} />);
    wrapper.find('button#cancel').simulate('click');
    expect(props.closeModal).toHaveBeenCalled();
  });
  
});

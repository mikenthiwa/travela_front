import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchBar from '../SearchBar';

// describe what we are testing
describe('Render SearchBar component', () => {
  const props = {
    onChange: jest.fn(),
    onSubmit: jest.fn()
  };

  // make our assertions and what we expect to happen
  it('should match snapshot', () => {
    const wrapper = shallow(<SearchBar {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the searchbar as expected', () => {
    const wrapper = shallow(<SearchBar {...props}  />);
    expect(wrapper.length).toBe(1);
  });

  it('should call onChange props when onChange is triggered', () => {
    const wrapper = shallow(<SearchBar {...props} />);
    const event = {
      target: {
        value: 'kampala'
      }
    };
    wrapper.find('#search').simulate('change', event);
    expect(props.onChange).toHaveBeenCalled();
  });

  it('should call onSubmit props when submitForm is triggered', () => {
    const wrapper = mount(<SearchBar {...props} />);
    const event = {
      preventDefault: jest.fn(),
    };
    wrapper.find('form').simulate('submit');
    expect(props.onSubmit).toHaveBeenCalled();
  });
});

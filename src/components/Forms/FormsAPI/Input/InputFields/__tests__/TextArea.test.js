import React from 'react';
import TextArea from '../TextArea';

describe('TextArea', () => {
  const setup = (otherProps) => mount(<TextArea {...otherProps} />);
  it('should render the text counter if minLength of maxLength is passed to the props', () => {
    const wrapper = setup({ maxLength: 200});
    expect(wrapper.find('.form-input__textarea__character-counter').length).toEqual(1);
  });

  describe('text counter', () => {
    let wrapper;
    let counter;
    let textarea;
    const colors = {
      blue: '#3359db',
      red: 'red',
      orange: '#E67373'
    };

    beforeEach(() => {
      wrapper = setup({ maxLength: 50 });
      counter = wrapper.find('.form-input__textarea__character-counter');
      textarea = wrapper.find('textarea');
    });

    const input = (text) => {
      textarea.simulate('change',  { target: { value: text}});
      wrapper.setProps({ value: text });
    };

    const currentColor = () => {
      return wrapper.find('.form-input__textarea__character-counter').props().style.color;
    };

    it('should display the length with a blue color', () => {
      const { blue: color } = colors;
      expect(counter.props().style).toEqual({color});
    });

    it('should retain a blue color until there are less than 20 characters left', () => {
      const { blue: color } = colors;
      input('This is just some text');
      expect(counter.props().style).toEqual({color});
    });

    it('should change to an orange color as the user continues to type', () => {
      const { orange: color } = colors;
      input('This is a text that is exactly 44 ch');
      expect(currentColor()).toEqual(color);
    });
    it('should change to a red color as the user approaches the limit', () => {
      const { red: color } = colors;
      input('This is a text that is exactly 49 characters long');
      expect(currentColor()).toEqual(color);
    });

    it('should display message once the number of characters are exhausted', () => {
      const { red: color } = colors;
      input('This is a text that is exactly 50 characters long.');
      expect(currentColor()).toEqual(color);
      expect(counter.text()).toEqual('You have reached a maximum of 50 characters');
    });

    it('should display a message based on the minimum length', () => {
      wrapper = setup({ maxLength: 50, minLength: 10});
      const { red: color } = colors;
      input('Minimum');
      expect(currentColor()).toEqual(color);
    });
  });
});

import React from 'react';
import { shallow, mount } from 'enzyme';
import ScaleOptionBuilder from '..';

describe ('Scale option builder tests', () => {
  const props = {
    item: {
      id: 'tk2er3',
      name: 'rate',
      behaviour: {},
      configuration: {
        endsAt: 6,
      }
    },
    handleItems: jest.fn(),
  };

  it('renders <ScaleOptionBuilder />', () => {
    const wrapper = shallow(<ScaleOptionBuilder {...props} />);
    expect(wrapper).toMatchSnapshot;
  });

  it('increments value at endsAt when ^ is clicked', () => {
    const wrapper = mount(<ScaleOptionBuilder {...props} />);
    expect(wrapper.find('.scale').length).toEqual(4);
    wrapper.find('#increment').first().simulate('click');
    expect(props.handleItems).toHaveBeenCalledTimes(1);
  });

  it('decrements value at endsAt', () => {
    props.handleItems.mockClear();
    const wrapper = mount(<ScaleOptionBuilder {...props} />);
    expect(wrapper.find('.scale').length).toEqual(4);
    wrapper.find('#decrement').first().simulate('click');
    expect(props.handleItems).toHaveBeenCalledTimes(1);
  });

  it('test for maximum scale value 10', () => {
    props.handleItems.mockClear();
    const wrapper = mount(<ScaleOptionBuilder {...props} />);
    wrapper.instance().handleItem(11);
    expect(props.handleItems).toHaveBeenCalledTimes(0);
  });
});

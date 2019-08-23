import React from 'react';
import { shallow, mount } from 'enzyme';
import ScalePreview from '..';

describe('Scale preview tests', () => {
  const state = {
    clickedIndex: 0,
    clicked: false,
  };

  const props = {
    item: {
      configuration: { endsAt: 5 }
    },
    handleOnclick: jest.fn(),
    handleResponse: jest.fn(),
  };

  it('renders <ScalePreview />', () => {
    const wrapper = shallow(<ScalePreview {...props} />);
    expect(wrapper).toMatchSnapshot;
  });

  it('set state of a scale when a scale value is clicked', () => {
    const wrapper = mount(<ScalePreview {...props} />);
    wrapper.instance().handleOnclick(1);
    wrapper.find('.scale-rectangle').first().simulate('click');
    wrapper.instance().setState({ clickedIndex: 1, clicked: true });
    expect(wrapper.state('clickedIndex')).toEqual(1);
    expect(wrapper.state('clicked')).toEqual(true);
  });
});

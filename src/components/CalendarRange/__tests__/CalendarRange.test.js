import React from 'react';
import { mount } from 'enzyme';
import CalendarRange from '..';
import { format, addDays } from 'date-fns';

const props = {
  handleChange: jest.fn(),
  months: 2,
  minDate: addDays(new Date(), -300),
  maxDate: addDays(new Date(), 900),
  direction: 'horizontal',
  scroll: {enabled: true },
  ranges: [{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }]
};

describe('<ButtonGroup />', () => {
  const wrapper = mount(<CalendarRange {...props} />);

  it('should render successfully', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should handleChange correctly', () => {
    wrapper.instance().handleRangeChange(
      { selection: {
        key: 'selection',
        startDate: new Date(), //Invalid prop `ranges[0].startDate` of type `string` supplied to `Month`, expected `object`
        endDate: new Date() //Invalid prop `ranges[0].endDate` of type `string` supplied to `Month`, expected `object`
      }
      });

    expect(props.handleChange).toHaveBeenCalled();
  });
});

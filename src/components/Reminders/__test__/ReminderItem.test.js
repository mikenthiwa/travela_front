import React from 'react';
import ReminderItem from '../ReminderItem';

const props = {
  index: 1,
  reminder:  {
    frequency: '2 Months'
  },
  conditionName: 'Passport Expiry'
};

describe('<ReminderItem />', ()=> {
  it('should render correctly', () =>{
    const wrapper = mount(<ReminderItem {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should display reminder with correct reminder details', () =>{
    const wrapper = mount(<ReminderItem {...props} />);
    expect(wrapper.find('p.frequncy_count').text()).toBe('Reminder 1');
    expect(wrapper.find('.reminder__condition p').text()).toBe(
      'Passport Expiry'
    );
    expect(wrapper.find('.reminder__condition span').text()).toBe(
      'To be sent 2 Months to Expiry'
    );
  });
});

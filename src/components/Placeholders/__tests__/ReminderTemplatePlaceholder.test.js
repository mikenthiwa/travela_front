import React from 'react';
import ReminderTemplatePlaceholder from '../ReminderTemplatePlaceholder';


describe('<RequestsPlaceholder />', () => {
  const wrapper = shallow(<ReminderTemplatePlaceholder />);

  it('should render without crashing', () => {
    const wrapper = shallow(<ReminderTemplatePlaceholder />);
    expect(wrapper).toMatchSnapshot();
  });
});

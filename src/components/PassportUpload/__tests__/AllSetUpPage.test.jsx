import React from 'react';
import { shallow } from 'enzyme';
import AllSetUpPage from '../AllSetUpPage';


describe('Completed Onboarding Process', () => {
  const props = {
    history: { push: jest.fn() },
  };
  const wrapper = shallow(
    <AllSetUpPage {...props} />
  );
  it('should render correctly', () => {
    
    expect(wrapper).toMatchSnapshot();
    expect(wrapper).toHaveLength(1);
  });
  it('should find and trigger Dashboard button', () => {
    const dashboardButton = wrapper.find('button');
    dashboardButton.simulate('click');
    expect(dashboardButton.length).toEqual(1);
  });
});

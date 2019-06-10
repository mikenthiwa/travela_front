import React from 'react';
import { mount } from 'enzyme';
import Tab from '../Tab';


describe('<Tab />', () => {
  const props = {
    title: 'title', 
    subTitle: 'subtitle', 
    onClick: jest.fn(), 
    active: true
  };

  it('should render <Tab />', () => {
    const wrapper = mount(<Tab {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
  it('should render while loading is complete', () => {
    const wrapper = mount(<Tab props={props} />);
    expect(wrapper.find('Preloader')).toHaveLength(0);
  });
});


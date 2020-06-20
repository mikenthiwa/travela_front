import React from 'react';
import { mount } from 'enzyme';
import TabView from '../TabView';

describe('<TabView />', () => {
  const tab = {
    subTitle: 'subtitle',
    title: 'Title'
  };
  const props = {
    tabs: [tab, tab],
    currentTab: 0,
    handleTabChange: jest.fn()
  };
  const wrapper = mount(
    <TabView {...props}>
      <div>content 1</div>
      <div>content 2</div>
    </TabView>
  );
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should switch tab', () => {
    wrapper
      .find('.trip-header-box')
      .simulate('click', { preventDefault: jest.fn() });
    expect(wrapper.state().current).toEqual(1);
    expect(wrapper.props().children.length).toEqual(2);
  });
  it('should change tab if props change', () => {
    wrapper.setProps({
      currentTab: 1
    });
    expect(wrapper.instance().state).toEqual({
      current:1
    });
  });
});

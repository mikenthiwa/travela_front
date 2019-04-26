import React from 'react';
import { shallow, mount } from 'enzyme';
import LocationDropDown from '../index';

class MockLocalStorage {
  constructor() {
    this.data = {};
  }

  setItem(item, value) {
    this.data[item] = value.toString();
  }
}

global.localStorage = new MockLocalStorage();

const props = {
  centers: ['Togo'],
  urlLocation: {
    pathname: '/requests/my-verifications'
  },
  getCenter: jest.fn()
};

const wrapper = mount(<LocationDropDown {...props} />);

describe('Render Location DropDown component', () => {

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should render the Location DropDown as expected', () => {
    expect(wrapper.length).toBe(1);
  });

  it('should call handleDropDown when the drop down  is triggered', () => {
    const spy = jest.spyOn(wrapper.instance(), 'selectDropDown');
    wrapper.find('.dropBtn').simulate('click');
    wrapper.find('.content').simulate('click');
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

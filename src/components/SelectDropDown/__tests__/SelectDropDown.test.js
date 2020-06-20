import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import SelectDropDown from '../SelectDropDown';

const props = {
  dropDownItems: [
    {
      name: '1',
      value: 1,
    },
    {
      name: '2',
      value: 2,
    },
    {
      name: '3',
      value: 3,
    }
  ],
  onClickItem: sinon.spy(),
};

describe('<SelectDropDown>', () => {
  it('should set the correct state when the component mounts', () => {
    const wrapper = shallow(<SelectDropDown
      {...{...props, defaultSelected: '2'}}
    />);
    expect(wrapper.instance().state).toEqual({
      isDropdownOpen: false,
      selectedItem: {
        name: '2',
        value: 2
      },
      placeHolderText: '',
    });
  });

  it('should render the dropdown items when the container is clicked', () => {
    const wrapper = shallow(<SelectDropDown {...props} />);
    const spy = sinon.spy(wrapper.instance(), 'showDropdownItems');
    expect(wrapper.find('.dropdown__container').hasClass('open')).toEqual(false);
    wrapper.simulate('click');
    expect(wrapper.find('.dropdown__container').hasClass('open')).toEqual(true);
    expect(wrapper.find('.dropdown__list').length).toBe(1);
    expect(wrapper.find('.dropdown__list__item').length).toBe(3);
    expect(spy.calledOnce).toBe(true);
    expect(wrapper.instance().state).toEqual({
      isDropdownOpen: true,
      selectedItem: {
        name: '1',
        value: 1,
      },
      placeHolderText: '',
    });
  });

  it('renders the correct value of a list item when the item is selected', () => {
    const wrapper = shallow(<SelectDropDown {...props} />);
    wrapper.simulate('click');
    const selectedItem = wrapper.find('.dropdown__list__item').at(1);
    selectedItem.simulate('click');
    wrapper.setProps({
      defaultSelected: '2'
    });
    expect(wrapper.find('.dropdown__input__value').text()).toBe('2');
  });

  it('closes when there is a click outside the component', () => {
    const eventMap = {};

    document.addEventListener = jest.fn((event, cb) => {
      eventMap[event] = cb;
    });

    const wrapper = shallow(<SelectDropDown {...props} />);
    const spy = sinon.spy(wrapper.instance(), 'hideDropdownItems');
    wrapper.simulate('click');
    eventMap.click({});
    expect(spy.calledOnce).toBe(true);
    expect(wrapper.instance().state.isDropdownOpen).toEqual(false);
    expect(wrapper.find('.dropdown__container').hasClass('open')).toEqual(false);
  });

  it('should render the correct dropdown items', () => {
    const wrapper = shallow(<SelectDropDown {...props} />);
    wrapper.simulate('click');
    expect(wrapper.find('.dropdown__list__item').length).toBe(3);
    const firstItem = wrapper.find('.dropdown__list__item').at(0);
    const secondItem = wrapper.find('.dropdown__list__item').at(1);
    const thirdItem = wrapper.find('.dropdown__list__item').at(2);
    expect(firstItem.text()).toBe('1');
    expect(secondItem.text()).toBe('2');
    expect(thirdItem.text()).toBe('3');
  });
});

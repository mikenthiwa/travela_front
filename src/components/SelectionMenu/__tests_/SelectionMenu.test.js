import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import SelectionMenu from '../index';

const props = {
  handleSubmit: sinon.spy(),
  dataArray: [
    { id: 1, data: { cloudinaryUrl: 'https://gist.img.png', itemName: 'passport.png' } },
    { id: 2, data: { cloudinaryUrl: 'https://gist.img2.pntg', itemName: 'visa.png'  } },
    { id: 3, data: { cloudinaryUrl: 'https://gist.img3.png', itemName: 'yellow.png' } }
  ]
};

const wrapper = shallow(<SelectionMenu {...props} />);
describe('<SelectionMenu>', () => {
  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should set the correct state when the component mounts', () => {
    expect(wrapper.instance().state).toEqual({
      itemSelected: false, selectedId: '', itemData: {}
    });
  });
  it('should render selection items', () => {
    expect(wrapper.find('.menu').length).toBe(1);
    expect(wrapper.find('.menu-item').length).toBe(3);
  });
  it('should select and submit an item', () => {
    const spy = sinon.spy(wrapper.instance(), 'handleSelectItem');
    expect(wrapper.find('.menu-item').at(0).hasClass('selected')).toEqual(false);
    wrapper.find('.menu-item').at(0).simulate('click');
    expect(spy.calledOnce).toBe(true);
    expect(wrapper.find('.menu-item').at(0).hasClass('selected')).toEqual(true);
    expect(wrapper.instance().state).toEqual({
      itemSelected: true,
      selectedId: 1,
      itemData: { cloudinaryUrl: 'https://gist.img.png', itemName: 'passport.png' }
    });
    const spy1 = sinon.spy(wrapper.instance(), 'handleItemSubmit');
    wrapper.find('.submit-button').find('.bg-btn').simulate('click');
    expect(spy1.calledOnce).toBe(true);
    expect(props.handleSubmit.called).toEqual(true);
    wrapper.find('.menu-item').at(0).simulate('keyDown');
  });
});

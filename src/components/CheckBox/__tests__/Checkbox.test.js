import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import Checkbox from '../index';

describe('<Checkbox />', ()=> {
  let createWrapper = (status, localstorage) =>{
    const handleDisableInputs = jest.fn();
    const state = {
      checkBox:status
    };
    const props = {
      savePersonalDetails: jest.fn(),
      values: {
        name: 'name',
        gender: 'Male',
        department: 'Success',
        role: 'Technical Team Lead',
        management: 'Marcus'
      }
    };
    const localStorage = {
      getItem: (value)=>{return localstorage;},
      setItem: jest.fn()
    }
    global.localStorage = localStorage;
    return shallow(<Checkbox state={state} handleDisableInputs={handleDisableInputs} {...props} />);
  }
  it('should render correctly', () =>{
    const handleDisableInputs=jest.fn()
    const wrapper = shallow(<Checkbox handleDisableInputs={handleDisableInputs} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should change class when the checkbox is unclicked', () =>{
    const wrapper = createWrapper('clicked', 'notClicked')
    const spy = sinon.spy(wrapper.instance(), 'clickCheckbox');
    wrapper.find('.checkbox').simulate('click');
    expect(spy.calledOnce).toBe(true);
    expect(wrapper.find('.default').exists()).toBe(true);
  });

  it('should change class when the checkbox is clicked', () =>{
    const wrapper = createWrapper('notClicked', 'clicked');
    wrapper.find('.checkbox').simulate('click');
    expect(wrapper.find('.clicked').exists()).toBe(true);

  });

  it('should assign cached checkbox state to checkbox', () =>{
    const wrapper = createWrapper('clicked', 'clicked');
    expect(wrapper.find('.clicked').exists()).toBe(true);
  });

  it('should change state  when the checkbox is clicked twice', () =>{
    const wrapper = createWrapper('clicked', 'clicked');
    wrapper.find('.checkbox').simulate('click');
    expect(wrapper.find('.clicked').exists()).toBe(true);
    wrapper.find('.checkbox').simulate('click');
    expect(wrapper.find('.notClicked').exists()).toBe(false);
  });

  it('should change state on keydown', () => {
    const wrapper = createWrapper('clicked', 'clicked');
    wrapper.find('.checkbox').simulate('keyDown');
    expect(wrapper.find('.clicked').exists()).toBe(true);
  });

});

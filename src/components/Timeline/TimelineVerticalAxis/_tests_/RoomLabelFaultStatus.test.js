import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import RoomLabel from '../RoomLabel';

describe('<RoomLabel />', ()=> {
  const props = {
    updateRoomState: jest.fn(),
    openModal: jest.fn(),
    closeModal: jest.fn(),
    addmaintenanceRecord: jest.fn(),
    updateMaintenanceRecord: jest.fn(),
    name: 'qwetu',
    id: 'thjfsndj12',
    status: false,
    timelineDateRange: ['12/12/2018', '17/12/2018'],
    guestHouseId: 'fhdj212',
    shouldOpen: true,
    modalType: 'maintainance'
  };

  window.date = {
    format: jest.fn(),
  };

  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<RoomLabel {...props} />);
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should not show checkbox on mount', () => {
    const checkbox = wrapper.find('.is-visible');
    expect(checkbox.length).toBe(0);
  });

  it('should show checkbox after state changes', () => {
    wrapper.setState({showMarkUnavailable: true });
    const checkbox = wrapper.find('.is-visible');
    expect(checkbox.length).toBe(1);
  });

  it('should show unmarked checkbox', () => {
    const propsWithStatusTrue = {...props, status:true };
    const wrapper = shallow(<RoomLabel {...propsWithStatusTrue} />);
    const checkbox = wrapper.find('.container_room_fault');
    expect(checkbox.length).toBe(1);
  });

  it('should show marked checkbox', () => {
    const checkbox = wrapper.find('.container_room_fine');
    expect(checkbox.length).toBe(1);
  });

  it('changes the state of the elipses when clicked', () => {
    const elipses = wrapper.find('.ellipsis');
    elipses.simulate('click');
    expect(wrapper.state().showMarkUnavailable).toEqual(true);
  });

  it('should not open modal when room is unavailable',() =>{
    const propsWithVisibilityTrue = {...props, status: true};
    const wrapper = shallow(<RoomLabel {...propsWithVisibilityTrue} />);
    wrapper.setState({showMarkUnavailable: true });
    const ellipsis = wrapper.find('.ellipsis');
    ellipsis.simulate('focus');
    const dialogue = wrapper.find('.mark-unavailable');
    dialogue.simulate('click');
    expect(props.openModal).not.toHaveBeenCalled();
  });

  it('open modal on clicking the dialogue box', () => {
    const wrapper = shallow(<RoomLabel {...props} />);
    wrapper.setState({showMarkUnavailable: true });
    const ellipsis = wrapper.find('.ellipsis');
    ellipsis.simulate('focus');
    const dialogue = wrapper.find('.mark-unavailable');
    dialogue.simulate('click');
    expect(props.openModal).toHaveBeenCalledWith(true, 'qwetu-thjfsndj12');
  }); 
});

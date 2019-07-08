import React from 'react';
import RoomLabel from '../RoomLabel';

const props = {
  updateRoomState: jest.fn(),
  timelineDateRange: ['2018-01-01', '2018-01-31'],
  guestHouseId: 'guest-house-id-1',
  name: 'Ndovu',
  id: 'room-id-1',
  status: true,
  modalType: 'Menengai-room-id-1',
  closeModal: jest.fn(),
  openModal: jest.fn(),
  addmaintenanceRecord: jest.fn(),
  updateMaintenanceRecord: jest.fn(),
  shouldOpen: true
};

describe('<RoomLabel />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <RoomLabel {...props} />
    );
  });

  it('renders properly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('renders the ellipsis for opening mark room unavailable', () => {
    const ellipsis = wrapper.find('.ellipsis');
    expect(ellipsis).toHaveLength(1);
  });

  it('toggles mark unavailable pop up on focus and blur ellipsis', () => {
    const ellipsis = wrapper.find('.ellipsis');
    const focusListener = ellipsis.prop('onClick');
    focusListener();
    expect(wrapper.state().showMarkUnavailable).toBe(true);
    // on blur
    const blurListener = ellipsis.prop('onClick');
    blurListener();
    expect(wrapper.state().showMarkUnavailable).toBe(false);
  });
});

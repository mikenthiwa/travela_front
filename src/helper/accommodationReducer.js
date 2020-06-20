let disabledGuestHousesUpdate, guestHousesUpdate, roomsUpdate;

export const disableGuestHouseSuccessState = (state, action) => {
  roomsUpdate = state.guestHouses
    .filter(list => action.disabledGuestHouseData.id === list.id);
  disabledGuestHousesUpdate = state.disabledGuestHouses.length 
    ? [{ ...action.disabledGuestHouseData, rooms:[...roomsUpdate[0].rooms] },
      ...state.disabledGuestHouses]
    : [{ ...action.disabledGuestHouseData, rooms:[...roomsUpdate[0].rooms] }];
  guestHousesUpdate = state.guestHouses
    .filter(list => action.disabledGuestHouseData.id !== list.id);
  return { ...state, disabling: false, guestHouses: [...guestHousesUpdate],
    disabledGuestHouses: [...disabledGuestHousesUpdate] };
};

export const restoreGuestHouseSuccessState = (state, action) => {
  roomsUpdate = state.disabledGuestHouses
    .filter(list => action.restoredGuestHouseData.id === list.id);
  disabledGuestHousesUpdate = state.disabledGuestHouses
    .filter(list => action.restoredGuestHouseData.id !== list.id);
  let guestHouseLength = state.guestHouses.length;
  guestHousesUpdate = guestHouseLength 
    ? [{ ...action.restoredGuestHouseData, rooms:[...roomsUpdate[0].rooms] }, ...state.guestHouses]
    : [{ ...action.restoredGuestHouseData, rooms:[...roomsUpdate[0].rooms] }];
  return { ...state, isLoading: false, restoring: false, guestHouses: [...guestHousesUpdate],
    disabledGuestHouses: [...disabledGuestHousesUpdate] };
};

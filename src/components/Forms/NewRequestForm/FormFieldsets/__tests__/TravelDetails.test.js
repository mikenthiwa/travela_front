import React from 'react';
import moment from 'moment';
import TravelDetails from '../TravelDetails';
import beds from '../../../../../views/AvailableRooms/__mocks__/mockData/availableRooms';

const props = {
  parentIds: 1,
  selection: 'multi',
  addNewTrip: jest.fn(),
  fetchAvailableRooms: jest.fn(),
  values: {
    gender: 'Male',
    ['destination-1']: 'Lagos',
    ['departureDate-1']: moment('2019-10-20'),
    ['arrivalDate-1']: moment('2019-10-30'),
    ['bed-1']: 1
  },
  handleDate: jest.fn(),
  handlePickBed: jest.fn(() => {props.bed = 'bed-0';}),
  removeTrip: jest.fn(),
  availableRooms:{ beds },
  setCurrentOrigin: jest.fn(),
  handleRadioButtonChange: jest.fn(),
  onChangeInput: jest.fn(),
  listTravelReasons: { 
    travelReasons: [
      {id: 1, title: 'Bootcamp'}
    ]
  },
  handleReason: jest.fn(),
  modalType: 'edit request',
  requestOnEdit: {
    createdAt: '2018-12-24T18:04:30.487Z',
    deletedAt: null,
    department: 'Talent & Development',
    gender: 'Male',
    id: 'KOhl6UY8y',
    manager: 'William Sserubiri',
    name: 'william',
    picture: 'https://lh6.googleusercontent.com/-JznmEmIIMek/AAAAAAAAAAI/AAAAAAAAAAc/KBISMb5Pa1E/photo.jpg?sz=50',
    role: 'CEO',
    status: 'Open',
    travelCompletion: '0% complete',
    tripType: 'multi',
    trips: [],
    updatedAt: '2018-12-25T18:04:30.487Z',
    userId: '-LOYLrl_4orw7UDhj6mo',
    selection: 'multi',
    value: '232px'
  },
};

const setup = (props) => shallow(<TravelDetails {...props} />);

describe('<TravelDetails />', () => {
  it('should render properly', () => {
    const wrapper = setup(props);
    expect(wrapper.length).toBe(1);
  });

  it('should match snapshot', () => {
    const wrapper = setup(props);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call fetchAvailableRooms when fetchRoomsOnFocus is triggered', () => {
    const wrapper = setup(props);
    const fetchRoomsOnFocusSpy = jest.spyOn(wrapper.instance(), 'fetchRoomsOnFocus');
    wrapper.instance().fetchRoomsOnFocus(props.values, 1, props.selection);
    expect(fetchRoomsOnFocusSpy).toHaveBeenCalled();
  });

  it('should render properly if no available beds', () => {
    const newProps = {...props};
    newProps.availableRooms = {beds: []};
    const wrapper = setup(props);
    expect(wrapper.length).toBe(1);
  });
});

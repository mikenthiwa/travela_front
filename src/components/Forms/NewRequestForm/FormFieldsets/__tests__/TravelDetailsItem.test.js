import React from 'react';
import moment from 'moment';
import { mount } from 'enzyme';
import TravelDetailsItem, { reasonsWarningColor } from '../TravelDetailsItem';
import beds from '../../../../../views/AvailableRooms/__mocks__/mockData/availableRooms';


const requestOnEdit = {
  id: 'xDh20btGz',
  name: 'Amarachukwo Agbo',
  tripType: 'oneWay',
  manager: 'Ezrqn Kiptanui',
  gender: 'Male',
  trips: [
    {
      departureDate: '2018-10-20',
      returnDate: '2018-10-30',
      origin: 'Lagos',
      destination: 'Angola',
      bedId: beds[0].id,
      beds: beds[0]
    }
  ],
  department: 'TDD',
  role: 'Learning Facilitator'
};

let props = {
  itemId: 0,
  selection: 'multi',
  addNewTrip: jest.fn(),
  fetchAvailableRooms: jest.fn(),
  values: {
    gender: 'Male',
    ['destination-0']: 'Angola',
    ['origin-0']: 'Lagos',
    ['departureDate-0']: moment('2018-10-20'),
    ['arrivalDate-0']: moment('2018-10-30'),
  },
  handleDate: jest.fn(),
  onChangeInput: jest.fn(),
  handlePickBed: jest.fn(),
  removeTrip: jest.fn(),
  renderInput: jest.fn(),
  customPropsForDeparture: jest.fn(),
  customPropsForArrival: jest.fn(),
  fetchRoomsOnFocus: jest.fn(),
  availableRooms: { beds },
  modalType: 'edit request',
  requestOnEdit,
  listTravelReasons: { 
    travelReasons: [
      {id:1,title:'Bootcamp'}
    ]
  },
  handleReason : jest.fn()
};


const setup = (props) => shallow(<TravelDetailsItem {...props} />);

describe('Test Suite for <TravelDetailsItem />', () => {
  it('should match snapshot', () => {
    const wrapper = setup(props);
    expect(wrapper).toMatchSnapshot();
  });

  it('should call onChangeInput when handleChangeInput is called', () => {
    const wrapper = setup(props);
    wrapper.instance().handleChangeInput({});
    expect(props.onChangeInput).toHaveBeenCalled();
    expect(props.handlePickBed).toHaveBeenCalled();
  });

  it('should call handleDate when handleDate is called', () => {
    const wrapper = setup(props);
    wrapper.instance().handleDate({});
    expect(props.handleDate).toHaveBeenCalled();
    expect(props.handlePickBed).toHaveBeenCalled();
  });

  it('should call onChangeInput prop function when handleChangeInput is called and trip type is oneWay', () => {
    const newProps = {...props};
    newProps.selection = 'oneWay';
    const wrapper = setup(newProps);
    wrapper.instance().handleChangeInput({});
    expect(props.onChangeInput).toHaveBeenCalled();
  });

  it('should update state with bedId when accomodationType is Hotel Booking', () => {
    const wrapper = mount(<TravelDetailsItem {...props} />);
    wrapper.setState({
      accommodationType: 'Hotel Booking',
      bedOnEdit: []
    });
    wrapper.instance().setBedChoices('creat', '', []);
    expect(wrapper.state().choices[1].value).toEqual(-1);
    
  });

  it('should update state with bedId when accomodationType is not required', () => {
    const wrapper = mount(<TravelDetailsItem {...props} />);
    wrapper.setState({
      accommodationType: 'Not Required',
      bedOnEdit: []
    });
    wrapper.instance().setBedChoices('creat', '', []);
    expect(wrapper.state().choices[1].value).toEqual(-2);
    
  });
  

  it('should call handleDate prop function when handleDate is called and trip type is oneWay', () => {
    const newProps = {...props};
    newProps.selection = 'oneWay';
    const wrapper = setup(newProps);
    wrapper.instance().handleDate({});
    expect(props.handleDate).toHaveBeenCalled();
  });

  it('should render properly if selection is oneWay', () => {
    const newProps = {...props};
    newProps.selection = 'oneWay';
    const wrapper = setup(newProps);
    expect(props.renderInput).toHaveBeenCalled();
  });

  it('should render properly if selection is return', () => {
    const newProps = {...props};
    newProps.selection = 'return';
    const wrapper = setup(newProps);
    expect(props.renderInput).toHaveBeenCalled();
  });

  it('should render properly if selection is multi', () => {
    const newProps = { ...props };
    newProps.selection = 'multi';
    const wrapper = setup(newProps);
    expect(props.renderInput).toHaveBeenCalled();
  });

  it('should change reason text color to red', () => {
    expect(reasonsWarningColor(140, 140)).toEqual({ color:'red', charLeft: `You have reached a maximum of ${140} Characters`});
    expect(reasonsWarningColor(137, 140)).toEqual({ color:'red', charLeft: 3});
    expect(reasonsWarningColor(117, 140)).toEqual({charLeft: 23, color: '#3359db'});
  });
});




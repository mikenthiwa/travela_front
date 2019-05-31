import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount, shallow } from 'enzyme';
import NoHotelEstimates from '../NoHotelEstimate';
import ListHotelEstimates from '../HotelEstimate';
import mockData from '../../../mockData/hotelEstimate';

describe('<NoHotelEstimates />', () => {
  it('renders NoHotelEstimates page without crashing', () => {
    const wrapper = mount(<NoHotelEstimates />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<ListHotelEstimates />', () => {
  const { estimates } = mockData;
  const props = {
    fetchAllHoteEstimates: jest.fn(),
    hotelEstimates: { estimates },
    fetchSingleHotelEstimate: jest.fn(),
    listAllhotelEstimates: { estimates: estimates },
    openModal: jest.fn(),
    closeModal: jest.fn(),
    country: '',
    estimate: 2
  };
  const wrapper = mount(
    <MemoryRouter>
      <ListHotelEstimates {...props} />
    </MemoryRouter>
  );
  it('renders HotelEstimates page without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
});

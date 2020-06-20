import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount, shallow, dive } from 'enzyme';
import NoHotelEstimates from '../NoHotelEstimate';
import ListHotelEstimates from '../HotelEstimate';
import mockData from '../../../mockData/hotelEstimateMockData';
import { HotelEstimateCard, HotelEstimateCards } from '../HotelEstimateCard';

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
    listAllhotelEstimates: { estimates: [] },
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

  it('should open modal when delete is clicked', () => {
    const props = {
      estimates: [
        {
          id: 52,
          amount: 1000,
          createdBy: {
            id: 992,
            name: 'Sylvia Mbugua'
          },
          region: 'North Africa'
        },
        {
          id: 51,
          amount: 100,
          createdBy: {
            id: 992,
            name: 'Sylvia Mbugua'
          },
          region: 'Kenya'
        }
      ],
      openModal: jest.fn(),
      fetchSingleHotelEstimate: jest.fn()
    };
    const wrapper = mount(
      <MemoryRouter>
        <HotelEstimateCards {...props} />
      </MemoryRouter>
    );
    wrapper
      .find('i.fa')
      .at(1)
      .simulate('click');
    wrapper
      .find('.delete')
      .at(1)
      .simulate('click');
    expect(props.openModal).toHaveBeenCalledWith(true, 'Delete hotel estimate');
  });
  it('should open the edit hotel estimate open when edit is clicked', () => {
    const wrapper = mount(
      <MemoryRouter>
        <HotelEstimateCards estimates={estimates} {...props} />
      </MemoryRouter>
    );
    wrapper
      .find('.fa-ellipsis-v')
      .at(0)
      .simulate('click');
    wrapper
      .find('.edit')
      .at(0)
      .simulate('click');
    expect(props.openModal).toHaveBeenCalledWith(true, 'edit hotel estimate');
  });
});

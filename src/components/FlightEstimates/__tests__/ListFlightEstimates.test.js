import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount, shallow, dive } from 'enzyme';
import NoFlightEstimates from '../NoFlightEstimates';
import ListFlightEstimates from '../FlightEstimates';
import mockData from '../../../mockData/flightEstimateMockData';
import { FlightEstimateCard, FlightEstimateCards } from '../FlightEstimatesCard';

describe('<NoFlightEstimates  />', () => {
  it('should render NoFlightEstimates page without crashing', () => {
    const wrapper = mount(<NoFlightEstimates  />);
    expect(wrapper).toMatchSnapshot();
  });
});

describe('<ListFlightEstimates />', () => {
  const { flightEstimates } = mockData;
  const props = {
    fetchAllFlightEstimates: jest.fn(),
    fetchSingleFlightEstimate: jest.fn(),
    listAllFlightEstimates: { flightEstimates: [] },
    openModal: jest.fn(),
    closeModal: jest.fn()
  };
  const wrapper = mount(
    <MemoryRouter>
      <ListFlightEstimates {...props} />
    </MemoryRouter>
  );
  
  it('should render FlightEstimates page without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should open modal when delete is clicked', () => {
    const props = {
      flightEstimates: [
        {
          id: 1,
          originRegion: null,
          destinationRegion: null,
          originCountry: "Kenya",
          destinationCountry: "Nigeria",
          createdBy: "2190",
          amount: 100,
          creator: {
              fullName: "Peace Acio",
              id: 43
          }
        },
        {
          id: 2,
          originRegion: null,
          destinationRegion: null,
          originCountry: "France",
          destinationCountry: "Germany",
          createdBy: "2190",
          amount: 100,
          creator: {
              fullName: "Peace Acio",
              id: 43
          }
        },
      ],
      openModal: jest.fn(),
      fetchSingleFlightEstimate: jest.fn()
    };
    const wrapper = mount(
      <MemoryRouter>
        <FlightEstimateCards {...props} />
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
    expect(props.openModal).toHaveBeenCalledWith(true, 'Delete flight estimate');
  });

  it('should open the edit modal when clicked', () => {
    const wrapper = mount(
      <MemoryRouter>
        <FlightEstimateCards flightEstimates={flightEstimates} {...props} />
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
    expect(props.openModal).toHaveBeenCalledWith(true, 'edit flight estimate');
  });
});

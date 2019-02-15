import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import mockData from '../../../views/TravelReasons/__mocks__';
import ListTravelReasons from '../ListTravelReasons';

describe('<ListTravelReasons />',() => {
  const { metaData3: {travelReasons, pagination}} = mockData;
  const props = {
    fetchAllTravelReasonsAction: jest.fn(),
    listTravelReasons: {
      pagination,
      travelReasons
    },
    location: {
      search: '?search=bootcamp'
    }
  };
  const wrapper = mount(
    <MemoryRouter>
      <ListTravelReasons {...props} />
    </MemoryRouter>
  );
  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('handles pagination', () => {
    wrapper.find('#next-button').simulate('click');
    expect(wrapper.find('#next-button').length).toEqual(1);
    expect(props.fetchAllTravelReasonsAction).toHaveBeenCalled();
  });
});
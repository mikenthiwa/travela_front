import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import mockData from '../../../views/TravelReasons/__mocks__/TravelReasons';
import ListTravelReasons from '../ListTravelReasons';

describe('<ListTravelReasons />',() => {
  const { metaData3: {travelReasons, pagination}} = mockData;
  const props = {
    fetchAllTravelReasonsAction: jest.fn(),
    renderDisplayTravelReasonDetails: jest.fn(),
    openModal: jest.fn(),
    listTravelReasons: {
      pagination,
      travelReasons
    },
    location: {
      search: '?search=bootcamp'
    },
    shouldOpen: false,
    closeModal: jest.fn(),
    modalType: '',
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

  it('simulates click to open travel reason details', () => {
    wrapper.find('.document-name').simulate('click');
    expect(wrapper.find('.document-name').length).toEqual(1);
    expect(props.renderDisplayTravelReasonDetails).toHaveBeenCalled();
  });
  it('handles delete travel reason', () => {
    wrapper.find('.delete').simulate('click');
    expect(props.openModal).toHaveBeenCalled();
  });

  it('should simulate deletion of a travel Reason', () => {
    const event = { preventDefault: jest.fn() };
    wrapper.find('.delete-document-button');
    wrapper.simulate('click', event);
  });
});

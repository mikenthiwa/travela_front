import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import ListTravelStipends from '../TravelStipends';
import mockData from '../../../mockData/travelStipend';
import { TravelStipendsCard, TravelStipendsCards } from '../TravelStipendsCards';

describe('<ListTravelStipends />',() => {
  const { stipends }  = mockData;
  const props = {
    fetchAllTravelStipends: jest.fn(),
    travelStipends: {stipends: stipends.map(stipend => ({
      ...stipend, country: 'Kenya'
    }))},
    deleteTravelStipend: jest.fn(),
    fetchSingleTravelStipend: jest.fn(),
    openModal: jest.fn(),
    closeModal: jest.fn(),
    location: 'Nairobi',
    stipend: 2
  };
  const props2 = {
    listAllTravelStipends: {
      stipends: []
    },
    openModal: jest.fn(),
    closeModal: jest.fn(),
    fetchAllTravelStipends: jest.fn(),
    travelStipends: {stipends},
    deleteTravelStipend: jest.fn(),
    fetchSingleTravelStipend: jest.fn(),
  };
  const wrapper = mount(
    <MemoryRouter>
      <ListTravelStipends {...props} />
    </MemoryRouter>
  );
  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('should open modal when delete is clicked', ()=>{
    const props = {
      stipends: [
        {
          id: 94,
          amount: 123,
          center: {
            location: 'Nairobi, Kenya'
          },
          country: 'Kenya',
          createdBy: '-LWBka6hN3UcNgL5WQs2',
          updatedAt: '2019-02-26T09:56:29.246Z',
          createdAt: '2019-02-26T09:56:29.246Z',
          deletedAt: null
        }
      ],
      openModal: jest.fn(),
      fetchSingleTravelStipend: jest.fn(),
    };
    const wrapper = mount(<TravelStipendsCards {...props} />);
    wrapper.find('i.fa').simulate('click');
    wrapper.find('.delete').simulate('click');

    expect(props.openModal).toHaveBeenCalledWith(true, 'Delete Stipend');
  });

  it('should open the edit stipend modal when edit is clicked', () => {
    const wrapper = mount(<TravelStipendsCard {...props} />);

    wrapper.find('.fa-ellipsis-v').first().simulate('click');
    wrapper.find('.edit').first().simulate('click');

    expect(props.openModal).toHaveBeenCalledWith(true, 'edit travel stipend');
  });
});



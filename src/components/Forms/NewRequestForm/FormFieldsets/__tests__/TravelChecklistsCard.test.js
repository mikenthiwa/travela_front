import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import TravelChecklistsCard from '../TravelChecklistsCard';

const props = {
  fetchTravelChecklist: jest.fn(),
  trips: [
    {
      departureDate: '2018-09-20',
      origin: 'Lagos',
      destination: 'Kigali, Rwanda',
    }
  ],
  checklistItems: [
    {
      destinationName: 'Kampala, Uganda',
      checklist: [
        {
          id: 'sCldWOedv',
          name: 'kamp Green card',
          requiresFiles: false,
          destinationName: 'Kampala, Uganda',
          deleteReason: null,
          resources: []
        },
        {
          id: 'h43l4o5Iy',
          name: 'kam Visa',
          requiresFiles: true,
          destinationName: 'Kampala, Uganda',
          deleteReason: null,
          resources: []
        },
        {
          id: '1y-xh1HaB',
          name: 'kam passport',
          requiresFiles: true,
          destinationName: 'Kampala, Uganda',
          deleteReason: null,
          resources: []
        },
        {
          id: 'qkYkwgkT-',
          name: 'kam Yellow Card',
          requiresFiles: false,
          destinationName: 'Kampala, Uganda',
          deleteReason: null,
          resources: []
        },
        {
          id: '1',
          name: 'Travel Ticket Details',
          requiresFiles: false,
          destinationName: 'Default',
          deleteReason: null,
          resources: [
            {
              id: '1',
              label: 'Flight Application Guide',
              link: 'https://docs.google.com/document/d/17vOCjPE3sgG2OSYV_3ZcpzCg1IbD7dCO8cVa8aBDN_M/edit?usp=drivesdk',
              checklistItemId: '1'
            }
          ]
        }
      ]
    },
    {
      destinationName: 'Nairobi, Kenya',
      checklist: [
        {
          id: 'XJtQjQ7Du',
          name: 'nair visa',
          requiresFiles: true,
          destinationName: 'Nairobi, Kenya',
          deleteReason: null,
          resources: []
        },
        {
          id: 'XovqH4rSl',
          name: 'nair passport',
          requiresFiles: true,
          destinationName: 'Nairobi, Kenya',
          deleteReason: null,
          resources: []
        },
        {
          id: '1NDjDXCx8',
          name: 'nair yellow card',
          requiresFiles: false,
          destinationName: 'Nairobi, Kenya',
          deleteReason: null,
          resources: []
        },
        {
          id: 'H5vn0XjVm',
          name: 'nair green card',
          requiresFiles: false,
          destinationName: 'Nairobi, Kenya',
          deleteReason: null,
          resources: []
        },
        {
          id: '1',
          name: 'Travel Ticket Details',
          requiresFiles: false,
          destinationName: 'Default',
          deleteReason: null,
          resources: [
            {
              id: '1',
              label: 'Flight Application Guide',
              link: 'https://docs.google.com/document/d/17vOCjPE3sgG2OSYV_3ZcpzCg1IbD7dCO8cVa8aBDN_M/edit?usp=drivesdk',
              checklistItemId: '1'
            }
          ]
        }
      ]
    }
  ],
  userData:{
    id: '2',
    fullName: 'Collins Muru',
    name: 'Collins',
    email: 'collins.muru@andela.com',
    userId: '-LJNw1BsT0LP_E4l2peP',
    passportName: 'Collins',
    department: 'Talent & Development',
    occupation: 'Software Developer',
    manager: 'Collins',
    gender: 'Male',
    createdAt: '2018-09-14T12:48:11.266Z',
    updatedAt: '2018-09-16T07:53:48.835Z',
    roleId: 401938,
    location: 'New'
  },
  trimmedCheckLists: [{
    trip: {
      destinationName: 'Lagos, Nigeria'
    }
  }],
  isLoading: false,
};
describe('<TravelChecklistsCard />',() => {
  const wrapper = mount(
    <MemoryRouter>
      <TravelChecklistsCard {...props} />
    </MemoryRouter>
  );
  it('renders without crashing', () => {
    expect(wrapper).toMatchSnapshot();
  });
  it('should show the loader, while checklist is being fetched', () => {
    const newProps = {
      ...props,
      isLoading: true
    };
    const wrapper = mount(<TravelChecklistsCard {...newProps} />);
    expect(wrapper.find('Preloader')).toHaveLength(1);
  });

  it('should stop showing the loader when checklist is fetched', () =>{
    const wrapper = mount(<TravelChecklistsCard {...props} />);
    expect(wrapper.find('Preloader')).toHaveLength(0);
  });

  it('should render all checkists', () =>{
    const wrapper = mount(<TravelChecklistsCard {...props} />);
    const approvalList = wrapper.find('.approval-list-items');
    expect(approvalList).toHaveLength(2);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import RenderChecklists from '../RenderChecklists';
import ChecklistTabs from '../ChecklistTabs';

describe ('RenderChecklist Test Suite', () => {
  const props = {
    checklists: [
      {
        id: 2,
        createdBy: '2414',
        name: 'Nigeria-Angola',
        config: [
          {
            id: 'W8rf1uoGJ',
            type: 'image',
            order: 1,
            prompt: 'Do you have a passport',
            behaviour: {},
            configuration: {
              options: [
                {
                  id: 'KGCe-ZmzYG',
                  name: '',
                  behaviour: {}
                }
              ]
            }
          }
        ],
        createdAt: '2019-07-30T20:46:23.771Z',
        updatedAt: '2019-07-30T20:46:23.771Z',
        destinations: [
          {
            id: 2,
            checklistId: 2,
            countryId: 3,
            regionId: null,
            createdAt: '2019-07-30T20:46:23.863Z',
            updatedAt: '2019-07-30T20:46:23.863Z',
            country: {
              id: 3,
              country: 'Angola',
              createdAt: '2019-07-30T20:46:23.797Z',
              updatedAt: '2019-07-30T20:46:23.797Z',
              regionId: 9999
            },
            region: null
          }
        ]
      },
    ]   
  };

  const wrapper = shallow(<RenderChecklists {...props} />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  });
  it('should render correctly when tabIndex exists', () => {
    wrapper.setState({tabIndex: 1});
    expect(wrapper).toMatchSnapshot();
  });
  it('should render correctly when showFlightdetails is true', () => {
    wrapper.setState({showFlightDetails: true});
    expect(wrapper).toMatchSnapshot();
  });
  it('should handle tab changes when tab is hit', () => {
    const mockHandleTabClick = jest.fn();
    wrapper.setState({tabIndex: 1, showFlightDetails: false});
    wrapper.instance().onTabClick = mockHandleTabClick;
    wrapper.find(ChecklistTabs).simulate('click');
    expect(mockHandleTabClick).toHaveBeenCalledTimes(0);
  });
  it('should render flight details panel when flight details button is clicked', () => {
    wrapper.setState({showFlightDetails: true});
    const mockFlightDetailsTabClick = jest.fn();
    wrapper.instance().onFlightDetailsTabClick = mockFlightDetailsTabClick;
    const flightDetailsButton = wrapper.find('button');
    flightDetailsButton.simulate('click');
    expect(flightDetailsButton).toHaveLength(1);
    expect(mockFlightDetailsTabClick).toHaveBeenCalledTimes(0);

        
  });
});

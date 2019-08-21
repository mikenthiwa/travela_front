import React from 'react';
import { shallow } from 'enzyme';
import { UserChecklist } from '../index';

describe ('UserChecklist Test Suite', () => {
  const props = {
    getOneChecklist: jest.fn(),
    isLoading: false,
    location: { pathname: '' },
    fullName: '',
    response: {
      id: 'hhsui98',
      selectedValue: 1,
    },
    checklist: [{
      config: [{
        behaviour: {},
        configuration: {endsAt: 6},
        id: 'qawvzipM5',
        order: 1,
        prompt: 'How well do you know burundi?',
        response: {id: 'qawvzipM5', selectedValue: 5},
        type: 'scale',
      }],
      createdAt: '2019-08-15T12:43:39.411Z',
      createdBy: '2614',
      destinations: [{
        checklistId: 4,
        country: {id: 5, country: 'Liberia', createdAt: '2019-08-15T12:43:39.466Z', updatedAt: '2019-08-15T12:43:39.466Z', regionId: 9999},
        countryId: 5,
        createdAt: '2019-08-15T12:43:39.550Z',
        id: 6,
        region: null,
        regionId: null,
        updatedAt: '2019-08-15T12:43:39.550Z'
      }],
      id: 4,
      name: 'Kenya-Liberia',
      origin: [{
        checklistId: 4,
        country: {id: 100, country: 'Kenya', createdAt: '2019-10-05T08:36:11.170Z', updatedAt: '2019-10-05T08:36:11.170Z', regionId: 1001},
        countryId: 100,
        createdAt: '2019-08-15T12:43:39.454Z',
        id: 4,
        region: null,
        regionId: null,
        updatedAt: '2019-08-15T12:43:39.454Z',
      }],
      tripId: 'XCl0etYBdl',
      updatedAt: '2019-08-15T12:43:39.411Z',
    }],
  };

  const wrapper = shallow(<UserChecklist {...props} />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  });

  it('should handle updating checklist responses', () => {
    wrapper.instance().setState({ checklistWithResponse: props.checklist});
    wrapper.instance().handleResponse(props.response);
    expect(wrapper.state('checklistWithResponse')).toEqual(props.checklist);
  });
});

import React from 'react';
import { shallow } from 'enzyme';
import { UserChecklist } from '../index';

describe ('UserChecklist Test Suite', () => {
  const props = {
    getOneChecklist: jest.fn(),
    isLoading: false,
    checklist: [{}],
    location: { pathname: '' },
    fullName: '',
  };

  const wrapper = shallow(<UserChecklist {...props} />);
  it('should render correctly', () => {
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.length).toBe(1);
  });

});

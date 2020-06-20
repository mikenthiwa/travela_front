import React from 'react';
import { shallow } from 'enzyme';
import { TableHead, TableBody, UserReadiness } from '../TravelReadinessDocumentsTable';
import users from '../__mocks__/users';

describe('TravelReadinessDocumentsTable', () => {
  it('renders TableHead', () => {
    const wrapper = shallow(<TableHead />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders TableBody', () => {
    const wrapper = shallow(<TableBody users={users} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders UserReadiness', () => {
    const props = {
      name: 'John Doe',
      department: 'TDD',
      passportsCount: 4,
      visasCount: 2,
      othersCount:3,
      userId: 'xlkdsf'
    };
    const wrapper = shallow(<UserReadiness {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});

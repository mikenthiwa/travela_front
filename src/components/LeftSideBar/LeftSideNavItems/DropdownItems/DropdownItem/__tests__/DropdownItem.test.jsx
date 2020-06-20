import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import DropdownItem from '../../../../LeftSideNavItems/DropdownItems/DropdownItem/DropdownItem';

describe('<DropdownItem />', () => {
  it('renders correctly', () => {
    const wrapper = mount(
      <MemoryRouter>
        <DropdownItem link_to="/test-link/test-endpoint">
          Test Link
        </DropdownItem>
      </MemoryRouter>
    );

    expect(wrapper).toMatchSnapshot();
  });
});

import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { LeftSideNavItem } from '../LeftSideNavItem';
import DropdownItem from '../../DropdownItems/DropdownItem/DropdownItem';

describe('<LeftSideNavItem />', () => {

  let location, wrapper, onClick;

  beforeEach(() => {
    location = {pathname: '/test-link'};
    onClick = jest.fn();

    const full_context = {
      context: {
        setActiveNavItem: jest.fn,
        activeNavItem: {},
      },
      childContextTypes: {
        setActiveNavItem: PropTypes.func.isRequired,
        activeNavItem: PropTypes.object.isRequired
      }
    };

    wrapper = mount(
      <MemoryRouter>
        <LeftSideNavItem
          text="Test link"
          isDropdown
          linkIcons={{active: 'test.svg', inactive: 'test.svg'}}
          location={location}
          link_to="/test-link"
          onClick={onClick}
        >
          <DropdownItem link_to="/home">
            us
          </DropdownItem>
          <DropdownItem link_to="/home">
            us
          </DropdownItem>
        </LeftSideNavItem>
      </MemoryRouter>,
      full_context
    );
  });

  it('renders the LeftSideNavItem', () => {
    expect(wrapper).toMatchSnapshot();
  });


  describe('<LeftSideNavItem /> with dropdown', () => {

    it('renders as dropdown', () => {
      expect(wrapper).toMatchSnapshot();
    });

    it('toggles dropdown', () => {
      const expectedStateOnClick = { dropdownOpen: false };

      wrapper.find('.nav-link').first().simulate('click');
      const stateOnClick = wrapper
        .find(LeftSideNavItem)
        .instance()
        .state;
      expect(stateOnClick).toEqual(expectedStateOnClick);
    });

    it('closes dropdown its when it is not the active item', () => {
      const expectedStateOnClick = { dropdownOpen: false };
      wrapper
        .setContext({activeNavItem: {}});
      const stateOnNewProps = wrapper
        .find(LeftSideNavItem)
        .instance()
        .state;
      expect(stateOnNewProps).toEqual(expectedStateOnClick);
    });
  });
});

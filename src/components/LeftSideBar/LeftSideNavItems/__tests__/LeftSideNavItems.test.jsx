import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import LeftSideNavItems from '../LeftSideNavItems';
import metadata from '../../Metadata';

describe('<LeftSideNavItems />', () => {
  let wrapper;

  beforeEach(() => {
    const navIconsSource = {
      requestsIcon: {
        active: 'test.svg',
        inactive: 'test.svg'
      },
      settingsIcon: {
        active: 'test.svg',
        inactive: 'test.svg'
      },
    };

    wrapper = mount(
      <MemoryRouter>
        <LeftSideNavItems
          activeNavItem={{}}
          metadata={metadata}
          setActiveNavItem={jest.fn}
        />
      </MemoryRouter>
    );
  });
  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('it renders dropdown items', () => {
    const dropDownItems = wrapper
      .find('LeftSideNavItem');
    expect(dropDownItems.length).toBeGreaterThan(0);
  });

  describe('None dropdown', () => {
    let meta = [
      {
        text: 'Requests',
        link_to: '/requests',
        activateOnLogin: true,
        isDropdown: false,
        icons: {}
      }
    ];

    it('renders none dropdwown items', () => {
      wrapper = mount (
        <MemoryRouter>
          <LeftSideNavItems
            activeNavItem={{}}
            metadata={meta}
            setActiveNavItem={jest.fn}
          />
        </MemoryRouter>
      );
    });
    expect(wrapper).toMatchSnapshot();
  });
});

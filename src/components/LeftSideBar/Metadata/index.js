import activeBookmarkIcon from '../../../images/icons/bookmark_active.svg';
import inactiveBookmarkIcon from '../../../images/icons/bookmark_inactive.svg';
import activeSettingsIcon from '../../../images/icons/settings_active.svg';
import inactiveSettingsIcon from '../../../images/icons/settings_inactive.svg';
import inactiveLogoutIcon from '../../../images/icons/logout_inactive.svg';
import activeAccommodationIcon from '../../../images/icons/accommodation-blue.svg';
import inactiveAccommodationIcon from '../../../images/icons/accomodation-grey.svg';
import activeChecklistIcon from '../../../images/icons/checklist-active.svg';
import inactiveChecklistIcon from '../../../images/icons/checklist-inactive.svg';
import activeDashboardIcon from '../../../images/icons/dashboard.svg';
import inactiveDashboardIcon  from '../../../images/icons/dashboard_inactive.svg';
import activeDocumentsIcon from '../../../images/icons/documents-blue.svg';
import inactiveDocumentsIcon from '../../../images/icons/documents-grey.svg';
import activeHome from '../../../images/icons/home.svg';
import inactiveHome from '../../../images/icons/home_grey.svg';
import activeTravelCostIcon from '../../../images/icons/travelCost_active.svg';
import inactiveTravelCostIcon from '../../../images/icons/travelCost_inactive.svg';


const NavItemsMetadata = [
  // Home`
  {
    text: 'Home',
    link_to: '/home',
    activateOnLogin: true,
    exact: true,
    icons: {
      active: activeHome,
      inactive: inactiveHome
    }
  },
  // Dashboard`
  {
    text: 'Dashboard',
    link_to: '/dashboard',
    exact: true,
    onlyVisibleTo: ['Travel Administrator', 'Super Administrator', 'Travel Team Member'],
    icons: {
      active: activeDashboardIcon,
      inactive: inactiveDashboardIcon
    }
  },
  // Requests
  {
    text: 'Requests',
    link_to: '/requests',
    isDropdown: true,
    dropdownItems: [
      {
        link_to: '/requests',
        text: 'My Requests',
        exact: true
      },
      {
        onlyVisibleTo: ['Super Administrator', 'Manager'],
        link_to: '/requests/my-approvals',
        text: 'My Approvals'
      },
      {
        onlyVisibleTo: ['Budget Checker'],
        link_to: '/requests/budgets/',
        text: 'Budget Checks'
      },
      {
        onlyVisibleTo: ['Travel Administrator', 'Super Administrator', 'Travel Team Member'],
        link_to: '/requests/my-verifications',
        text: 'My Verifications'
      },
      {
        onlyVisibleTo: ['Travel Administrator', 'Super Administrator', 'Travel Team Member'],
        link_to: '/requests/modifications',
        text: 'Trip Modifications'
      }
    ],
    icons: {
      active: activeBookmarkIcon,
      inactive: inactiveBookmarkIcon
    }
  },
  // Accommodation
  {
    text: 'Residence',
    link_to: '/residence',
    activateOnLogin: false,
    isDropdown: true,
    dropdownItems: [
      {
        link_to: '/residence/manage',
        text: 'Manage',
        onlyVisibleTo: ['Travel Administrator', 'Super Administrator', 'Travel Team Member'],
        exact: false
      },
      {
        link_to: '/residence/checkin',
        text: 'Check-in',
        exact: false
      }
    ],
    icons: {
      active: activeAccommodationIcon,
      inactive: inactiveAccommodationIcon
    }
  },
  // Travel Cost
  {
    text: 'Travel Cost',
    link_to: '/travel-cost',
    activateOnLogin: false,
    isDropdown: true,
    dropdownItems: [
      {
        link_to: '/travel-cost/travel-stipends',
        text: 'Travel Stipend',
        onlyVisibleTo: ['Travel Administrator', 'Super Administrator', 'Travel Team Member'],
        exact: true
      },
      {
        link_to: '/travel-cost/hotel-estimates',
        text: 'Hotel Estimate',
        onlyVisibleTo: ['Travel Administrator', 'Super Administrator', 'Travel Team Member'],
        exact: true
      }
    ],
    icons: {
      active: activeTravelCostIcon,
      inactive: inactiveTravelCostIcon
    },
    onlyVisibleTo: ['Travel Administrator', 'Super Administrator', 'Travel Team Member']
  },
  // Travel Readiness
  {
    text: 'Documents',
    link_to: '/travel_readiness',
    activateOnLogin: true,
    isDropdown: false,
    icons: {
      active: activeDocumentsIcon,
      inactive: inactiveDocumentsIcon
    }
  },
  // Trip planner
  {
    text: 'Trip Planner',
    link_to: '/trip-planner',
    activateOnLogin: false,
    isDropdown: true,
    dropdownItems: [
      {
        link_to: '/trip-planner/travel-readiness',
        exact: true,
        text: 'Travel Readiness',
        onlyVisibleTo: ['Super Administrator', 'Travel Administrator', 'Travel Team Member']
      },
      {
        link_to: '/trip-planner/checklists',
        exact: true,
        text: 'Travel Checklist',
        onlyVisibleTo: ['Super Administrator', 'Travel Administrator', 'Travel Team Member']
      }
    ],
    icons: {
      active: activeChecklistIcon,
      inactive: inactiveChecklistIcon
    },
    onlyVisibleTo: ['Super Administrator', 'Travel Administrator','Travel Team Member']
  },
  // Settings
  {
    text: 'Settings',
    link_to: '/settings',
    activateOnLogin: false,
    isDropdown: true,
    dropdownItems: [
      {
        link_to: '/settings/roles',
        exact: true,
        text: 'User Roles',
        onlyVisibleTo: ['Super Administrator']
      },
      {
        link_to: '/settings/profile',
        text: 'User Profile',
      },
      {
        link_to: '/settings/roles/339458',
        exact: true,
        text: 'Travel team',
        onlyVisibleTo: ['Travel Administrator', 'Travel Team Member']
      },
      {
        link_to: '/settings/reminders?document=passport',
        exact: true,
        text: 'Reminder Condition',
        onlyVisibleTo: ['Travel Administrator', 'Super Administrator', 'Travel Team Member']
      },
      {
        link_to: '/settings/reminder-setup',
        exact: true,
        text: 'Reminder Setup',
        onlyVisibleTo: ['Travel Administrator', 'Super Administrator', 'Travel Team Member']
      },
      {
        link_to: '/settings/travel-reason',
        exact: true,
        text: 'Travel Reason',
        onlyVisibleTo: ['Travel Administrator', 'Super Administrator', 'Travel Team Member']
      },
      {
        link_to: '/settings/travel-region',
        exact: true,
        text: 'Travel Region',
        onlyVisibleTo: ['Travel Administrator', 'Super Administrator', 'Travel Team Member']
      },
    ],
    icons: {
      active: activeSettingsIcon,
      inactive: inactiveSettingsIcon
    }
  },

  // Logout
  {
    text: 'Logout',
    link_to: '/logout',
    activateOnLogin: false,
    isDropdown: false,
    onClick: 'signout', // define a handler with this name in 'LeftSideNavItems'
    variantClassName: 'logout-button', // variant styling class
    icons: {
      inactive: inactiveLogoutIcon
    }
  },
];

export default NavItemsMetadata;

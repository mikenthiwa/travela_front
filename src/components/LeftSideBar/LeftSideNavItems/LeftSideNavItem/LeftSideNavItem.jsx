import React, { PureComponent, Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import DropdownHelper from '../DropdownItems/utils/dropdownHelper';
import './_leftSideNavItem.scss';

export class LeftSideNavItem extends PureComponent {
  constructor(props) {
    super(props);
    this.dropdownHelper = new DropdownHelper();
    this.state = {
      dropdownOpen: true,
    };
  }

  componentDidMount() {
    const {activateOnLogin} = this.props;
    const {setActiveNavItem} = this.context;
    if(this.isActive())
      setActiveNavItem(this);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    // clicking on the navigation items will cause the items to receive new context and
    // this will be is fired to determine
    if(nextContext.activeNavItem !== this)
      this.setState({dropdownOpen: false});
  }

  getType = () => {
    const { isDropdown } = this.props;
    return isDropdown? DropdownNavLink: NavLink;
  }

  getDropdownElements = () => {
    const { dropdownOpen } = this.state;
    const  linkIsActive = this.isActive();

    const { children } = this.props;
    const options = { linkIsActive, dropdownOpen };
    return this.dropdownHelper.getElements(options, children);
  }

  isActive = () => {
    const { location, link_to } = this.props;
    return location.pathname.startsWith(link_to);
  }

  handleClicked = () => {
    const {onClick, isDropdown} = this.props;
    const {setActiveNavItem} = this.context;
    setActiveNavItem(this);
    const {dropdownOpen} = this.state;
    this.setState({dropdownOpen: !dropdownOpen});
    onClick ? onClick() : null;
  }

  render() {
    const {text, link_to, linkIcons, isDropdown, className } = this.props;
    const status = this.isActive()? 'active': 'inactive';
    // switch between rendering a NavLink and a DropdownNavLink
    const NavLinkItem = this.getType();

    return (
      <Fragment>
        <li className={`left-side-nav-item ${className || ''} ${status}`}>
          <NavLinkItem
            className="nav-link" role="button" onClick={this.handleClicked}
            to={link_to} onKeyPress={() => {}} tabIndex="0">
            <div className="left-side-nav-item__left-icon">
              <img src={this.isActive()? linkIcons.active: linkIcons.inactive} alt="icon" />
            </div>
            <div className="left-side-nav-item__nav-text">
              {text}
            </div>
            { isDropdown? this.getDropdownElements().icon: null }
          </NavLinkItem>
        </li>
        { isDropdown? this.getDropdownElements().items: null }
      </Fragment>
    );
  }
}

const DropdownNavLink = (props) => {
  const { children, onClick } = props;
  return (
    <div
      {...props}
      role="presentation"
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {children}
    </div>
  );
};

LeftSideNavItem.propTypes = {
  text: PropTypes.string.isRequired,
  link_to: PropTypes.string.isRequired,
  linkIcons: PropTypes.object.isRequired,
  activateOnLogin: PropTypes.bool,
  isDropdown: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.array.isRequired,
    PropTypes.arrayOf(PropTypes.object.isRequired).isRequired
  ]),
  location: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string
};

LeftSideNavItem.contextTypes = {
  activeNavItem: PropTypes.object.isRequired,
  setActiveNavItem: PropTypes.func.isRequired
};

LeftSideNavItem.defaultProps = {
  children: {},
  isDropdown: false,
  activateOnLogin: false,
  onClick: () => {},
  className: ''
};

DropdownNavLink.propTypes = {
  children: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired
};

export default withRouter(LeftSideNavItem);

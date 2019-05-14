import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavLink, Link} from 'react-router-dom';
import SideBarMetadata from './Metadata';
import LeftSideNavItems from './LeftSideNavItems/LeftSideNavItems';
import './_leftSideBar.scss';
import inactiveHelpIcon from '../../images/icons/helpIcon_inactive.svg';


export class LeftSideBar extends Component {

  state = {
    activeNavItem: {} // helps achieve the accordion effect
  };

  setActiveNavItem = (clickedNavItem) => {
    this.setState({activeNavItem: clickedNavItem});
  }

  renderHelpLink(){
    return(
      <div className="helpIcon">
        <Link to="/help">
          <span>
            <p>Click to access Help Page</p>
          </span>
          <img alt="HelpIcon" src={inactiveHelpIcon} />
        </Link>
      </div>
    );
  }

  render() {
    const {activeNavItem} = this.state;
    const {getCurrentUserRole} = this.props;
    const body = getCurrentUserRole.length ? (
      <LeftSideNavItems
        activeNavItem={activeNavItem}
        metadata={SideBarMetadata}
        setActiveNavItem={this.setActiveNavItem}
        userRole={getCurrentUserRole}
      />
    ): '';
    return (
      <div className="left-sidebar">
        <div className="left-sidebar__fixed_wrapper">
          <div className="left-sidebar__scrollable_wrapper">
            {body}
            {this.renderHelpLink()}
          </div>  
        </div>
      </div>
    );
  }
}

export const mapStateToProps = ({ user }) => ({
  ...user
});

LeftSideBar.propTypes = {
  getCurrentUserRole: PropTypes.array
};

LeftSideBar.defaultProps = {
  getCurrentUserRole: []
};

export default connect(mapStateToProps)(LeftSideBar);

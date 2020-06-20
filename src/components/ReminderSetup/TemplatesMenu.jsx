import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';

class TemplatesMenu extends Component {
  state = {
    openClose: ''
  };

  componentDidMount() {
    document.addEventListener('mousedown', this.clickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.clickOutside);
  }

  toggleMenu = (e) => {
    e.preventDefault();
    const { openClose } = this.state;
    this.setState({
      openClose: openClose === ''? 'open': '',
    });
  };

  setRef = (node) => this.wrapperRef = node;

  clickOutside = (e) => {
    if (!this.wrapperRef.contains(e.target)) {
      this.setState({
        openClose: ''
      });
    }
  };


  renderMenuContainer = ({ disableEnable, openClose, data, id }) => {
    const { conditionId, setItemToDisable, reminder   } = this.props;
    const editReminderLink = '/settings/reminders/edit';
    return (
      <div ref={this.setRef} className={`table__menu-container ${openClose}`}>
        <ul className="table__menu-list">
          {!disableEnable && (
            <li>
              <Link 
                to={
                  !isEmpty(reminder) 
                    ? `${editReminderLink}/${conditionId}`
                    : `/settings/reminder-setup/update/${id}`
                }
                className="table__menu-list-item top"
              >
                <span className="edit">Edit</span>
              </Link>
            </li>
          )
          }
          <li
            onClick={(event) => {setItemToDisable(disableEnable, data, null, event);}} role="presentation"
            className="table__menu-list-item bottom" id="setItem">
            {disableEnable? <span className="enable">Enable</span> : <span className="disable">Disable</span>}
          </li>
        </ul>
      </div>
    );
  }


  render() {
    const { openClose } = this.state;
    const { 
      disableEnable,
      template, 
      reminder,
      id
    } = this.props;
    return (
      <span>
        <i
          className="fa fa-ellipsis-v on"
          id="toggleIcon"
          role="presentation"
          onClick={this.toggleMenu}
        />
        {!isEmpty(template) && this.renderMenuContainer({ 
          disableEnable, 
          openClose, 
          data: template, 
          id 
        })}
        {!isEmpty(reminder) && this.renderMenuContainer({ 
          disableEnable, 
          openClose,
          data: reminder,
        })}
      </span>
    );
  }
}

TemplatesMenu.propTypes = {
  disableEnable: PropTypes.bool,
  template: PropTypes.object,
  reminder: PropTypes.object,
  setItemToDisable: PropTypes.func,
  id: PropTypes.number,
  conditionId: PropTypes.number,
};

TemplatesMenu.defaultProps = {
  conditionId: 0,
  id: 0,
  disableEnable: false,
  reminder: {},
  template: {},
  setItemToDisable: () => {},
};


export default TemplatesMenu;

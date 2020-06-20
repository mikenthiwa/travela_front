import React, { Component, Fragment } from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import './Reminder.scss';
import withLoading from '../../components/Hoc/withLoading';
import ReminderPlaceHolder from '../../components/Placeholders/ReminderPlaceHolder';
import AlertIcon from '../../components/Reminders/AlertIcon';
import TemplatesMenu from '../../components/ReminderSetup/TemplatesMenu';
import SingleReminderDetails from '../../components/Reminders/SingleReminderDetails';
import NoEmailReminder from '../../components/EmailReminderSetup/NoEmailReminder';

const headClassName = 'table__head mdl-data-table__cell--non-numeric';
const className = 'mdl-data-table__cell--non-numeric table__data';

class ReminderTable  extends Component{
  state = {
    shouldOpen: false,
    currentReminder: null,
  }

  handleViewReminderClick = (id) => {
    const { getSingleReminder } = this.props;
    getSingleReminder(id);
    this.setState({
      shouldOpen: true,
      currentReminder: id,
    });
  }

  handleCloseModal = () => {
    this.setState({
      shouldOpen: false,
      currentReminder: null
    });
  }

  renderReminderDetailsRow({ reminder, disabled, id }) {
    const {  
      setItemToDisable,
      singleReminder,
      activeDocument,
      history
    } = this.props;
    const { shouldOpen, currentReminder } = this.state;
    return (
      <Fragment>
        <TemplatesMenu
          disableEnable={disabled}
          reminder={reminder}
          setItemToDisable={setItemToDisable}
          conditionId={id}
          id={reminder.id}
        />
        <SingleReminderDetails
          singleReminder={singleReminder}
          shouldOpen={shouldOpen}
          modalType={`reminder details${id}`}
          activeDocument={activeDocument}
          history={history}
          closeModal={() => this.handleCloseModal()}
          conditionId={currentReminder}
        />
      </Fragment>
    );
  }

  renderTableDetails({ 
    disabled, 
    user, 
    createdAt, 
    conditionName, 
    documentType, 
    reminder,
    id,
    key
  }) {
    
    const { 
      setItemToDisable, 
    }  = this.props;

    return (
      <tr className={`table__rows ${disabled ? 'off' : ''}`} key={key}>
        <td 
          className={`${className} 
          ${disabled ? '' : 'readiness__cell-name'}`}
        >
          <span
            className="reminder__condition-name" 
            onClick={() => this.handleViewReminderClick(id)}
            role="presentation">
            {conditionName}
          </span>
          {AlertIcon(disabled, reminder, setItemToDisable)}
        </td>
        <td className={className}>{documentType}</td>
        <td className={className}>{user.fullName}</td>
        <td className={className}>{moment(new Date(createdAt)).format('DD-MM-YYYY')}</td>
        <td className="table__data">
          {this.renderReminderDetailsRow({...reminder, reminder})}
        </td>
      </tr>
    );
  }

  render() {
    const { reminders } = this.props;
    return (
      <Fragment>
        {     
          !reminders.length 
            ? <NoEmailReminder />
            : (
              <div className="list-templates list-conditions">
                <div className="table__container">
                  <table className="mdl-data-table mdl-js-data-table readiness-table">
                    <thead>
                      <tr>
                        <th className={headClassName}>Condition Name</th>
                        <th className={headClassName}>Document Type</th>
                        <th className={headClassName}>Created By</th>
                        <th className={headClassName}>Created on</th>
                      </tr>
                    </thead>
                    <tbody className="table__body">
                      {
                        reminders && reminders.map(
                          reminder => (
                            this.renderTableDetails({ ...reminder, reminder, key: reminder.id })
                          ))
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            )
        }
      </Fragment>
    );
  }
}

ReminderTable.propTypes = {
  reminders: PropTypes.array.isRequired,
  setItemToDisable: PropTypes.func,
  getSingleReminder: PropTypes.func.isRequired,
  singleReminder: PropTypes.object.isRequired,
  activeDocument: PropTypes.string.isRequired,
  history: PropTypes.object.isRequired
};

ReminderTable.defaultProps = {
  setItemToDisable: () => { }
};



export default withLoading(ReminderTable, ReminderPlaceHolder);

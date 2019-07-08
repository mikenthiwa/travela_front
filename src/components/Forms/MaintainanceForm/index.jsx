import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import moment from 'moment';
import _ from 'lodash';
import { FormContext } from '../FormsAPI';
import MaintainanceFieldSets from './FormFieldsets/maintaince';
import './maintainance.scss';

class MaintainceForm extends PureComponent {
  constructor(props) {
    super(props);

    this.defaultState = {
      values: {
        reason: '',
        maintainanceStart: '',
        maintainanceEnd: ''
      },
      errors: {},
      hasBlankFields: true,
      hideNotificationPane: true,
      hideSideBar: false,
      openSearch: false,
      selectedLink: 'settings page',
      hideOverlay: false
    };
    this.state = { ...this.defaultState };
  }

  componentDidMount() {
    this.handleMaintenanceValues();
  }

  handleMaintenanceValues = () => {
    const { maintenance: { departureDate, returnDate, reason }, 
      editMaintenance : { maintenance } }  = this.props;
    
    const notEdit = _.isEmpty(maintenance);
    const startValue  = !notEdit ? maintenance.start:
      (departureDate ? moment(departureDate, 'YYYY-MM-DD').format('MM/DD/YYYY') : '');
    const endValue = !notEdit ? maintenance.end: 
      (returnDate ?moment(returnDate, 'YYYY-MM-DD').format('MM/DD/YYYY'): '');
    const reasonValue = !notEdit ? maintenance.reason: (reason ? reason: '');
    this.handleSetState(startValue, endValue, reasonValue);
  }

  handleSetState = (departureDate, returnDate, reason) => {
    const startDate = departureDate ? departureDate : '';
    const endDate = returnDate ? returnDate : '';
    const disableReason = reason ? reason : '';
    
    this.setState(prevState => ({ ...prevState, 
      values: { maintainanceStart: startDate, 
        maintainanceEnd: endDate, 
        reason: disableReason } 
    }));
  }

  submitMaintainanceData = event => {
    event.preventDefault();
    const { values } = this.state;
    const {addmaintenanceRecord, id, closeModal, timelineDateRange, guestHouseId} = this.props;
    const [startDateString, endDateString] = timelineDateRange;
    if (this.validate) {
      let data = { ...values };
      data.start = data.maintainanceStart;
      data.end = data.maintainanceEnd;
      addmaintenanceRecord(data, id, startDateString, endDateString, guestHouseId);
      closeModal(true, 'new model');
    }
  };

  submitEditedMaintenanceData = event => {
    event.preventDefault();
    const { values } = this.state;
    const record = {
      reason: values.reason,
      start: values.maintainanceStart,
      end: values.maintainanceEnd
    };
    const { maintenance, updateMaintenanceRecord } = this.props;
    updateMaintenanceRecord(record, maintenance.roomId);
  };

  handleClearForm = () => {
    this.setState({ ...this.defaultState });
  };

  validate = field => {
    let { values, errors } = this.state;
    [errors, values] = [{ ...errors }, { ...values }];
    let hasBlankFields = false;
    !values[field]
      ? (errors[field] = 'This field is required')
      : (errors[field] = '');
    hasBlankFields = Object.keys(values).some(key => !values[key]);
    this.setState(prevState => {
      return { ...prevState, errors, hasBlankFields };
    });
    return !hasBlankFields;
  };

  render() {
    const { values, errors, hasBlankFields } = this.state;
    const { modalType, editMaintenance, closeModal } = this.props;
    const onSubmit = (modalType === 'edit-maintenance')
      ? this.submitEditedMaintenanceData
      : this.submitMaintainanceData;
    return (
      <FormContext targetForm={this} validatorName="validate" values={values} errors={errors}>
        <form onSubmit={onSubmit} className="maintainance-form">
          <MaintainanceFieldSets
            values={values} hasBlankFields={hasBlankFields} editMaintenance={editMaintenance} />
          <div className="maintainence-line" />
          <div className="maintainence-submit-area">
            <button
              type="button" className="bg-btn bg-btn--inactive btn-cancel"
              onClick={closeModal}>
              Cancel
            </button>
            <button
              type="submit" className="bg-btn bg-btn--active" id="submit" disabled={hasBlankFields}>
              Save Changes
            </button>
          </div>
        </form>
      </FormContext>
    );
  }
}

MaintainceForm.propTypes = {
  modalType: PropTypes.string,
  editMaintenance: PropTypes.object,
  maintenance: PropTypes.object,
  addmaintenanceRecord: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  updateMaintenanceRecord: PropTypes.func.isRequired,
  timelineDateRange: PropTypes.array,
  guestHouseId: PropTypes.string
};

MaintainceForm.defaultProps = {
  modalType: '',
  maintenance: {},
  editMaintenance: {},
  timelineDateRange: [],
  guestHouseId: ''
};

export default MaintainceForm;

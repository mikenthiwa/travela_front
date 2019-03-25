import React, { Component } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import InputRenderer from '../../FormsAPI';
import error from '../../../../images/error.svg';
import * as MaintanceFormMetadata from '../../FormsMetadata/MaintanceFormMetadata';

class MaintainanceFieldSets extends Component {
  render() {
    this.inputRenderer = new InputRenderer(MaintanceFormMetadata);
    const { renderInput } = this.inputRenderer;
    const { values: { maintainanceStart, maintainanceEnd, reason } } = this.props;
    return (
      <fieldset className="maintainance-details">
        <div className="input-group">
          {renderInput('maintainanceStart', 'date',
            {
              value: maintainanceStart,
              minDate: moment(new Date())
            })}
          {renderInput('maintainanceEnd', 'date',
            {
              value: maintainanceEnd,
              minDate: moment(new Date(maintainanceStart))
            })}
          {renderInput('reason', 'text', {value: reason })}
        </div>
        <span className="msg-maintainence">
          <img src={error} alt="error" className="img_error" />
          This room will be unavailable for booking by guests
        </span>
      </fieldset>
    );
  }
}

MaintainanceFieldSets.propTypes = {
  values: PropTypes.object,
};

MaintainanceFieldSets.defaultProps = {
  values: {},
};

export default MaintainanceFieldSets;

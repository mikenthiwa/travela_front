import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './RadioButton.scss';
import RadioButton from './RadioButton';

const choices = {
  yes: false,
  no: false,
  notApplicable: false
};

class RadioButtonField extends Component {
  state = {
    values: choices
  };

  componentDidMount = () => {
    const {
      checklistItem: {
        submissions: [item]
      },
      handleDuoField
    } = this.props;
    const choice = item && item.userResponse;
    choice === 'yes' ? handleDuoField(false) : handleDuoField(true);
    choice && this.setState({ values: { ...choices, [choice]: true } });
  };

  handleRadioSubmit = value => {
    const {
      tripId,
      checklistItem: { id },
      postSubmission,
      checkId,
      requestId,
      handleDuoField
    } = this.props;
    const formData = { tripId, file: value };
    value === 'yes' ? handleDuoField(false) : handleDuoField(true);
    value && this.setState({ values: { ...choices, [value]: true } });
    value &&
      postSubmission({ formData, checklistItemId: id }, checkId, requestId);
  };

  onChange = e => {
    const {
      target: { checked, name }
    } = e;
    this.setState({ values: { ...choices, [name]: checked } });
    this.handleRadioSubmit(name);
  };

  renderButton = (name, label, value, checked) => {
    const ref = React.createRef();
    return (
      <div
        role="presentation"
        onClick={() => {
          ref.current.handleClick();
        }}
        className={`radio-button ${checked ? 'checked' : ''}`}
      >
        <RadioButton
          value={value}
          name={name}
          ref={ref}
          checked={checked}
          onChange={this.onChange}
        />
        <label htmlFor={name}>{label}</label>
      </div>
    );
  };

  render() {
    const {
      values: { yes, no, notApplicable }
    } = this.state;
    return (
      <div className="radio-buttons">
        {this.renderButton('yes', 'Yes', 'yes', yes)}
        {this.renderButton('no', 'No', 'no', no)}
        {this.renderButton(
          'notApplicable',
          'Not Applicable',
          'notApplicable',
          notApplicable
        )}
      </div>
    );
  }
}

RadioButtonField.propTypes = {
  postSubmission: PropTypes.func.isRequired,
  requestId: PropTypes.string.isRequired,
  checklistItem: PropTypes.object.isRequired,
  tripId: PropTypes.string.isRequired,
  checkId: PropTypes.string.isRequired,
  handleDuoField: PropTypes.func.isRequired
};

export default RadioButtonField;

import React, { PureComponent } from 'react';
import { PropTypes } from 'prop-types';
import { FormContext, getDefaultBlanksValidatorFor } from '../FormsAPI';
import TravelStipendFieldset from './FormFieldsets/TravelStipendDetails';
import SubmitArea from './FormFieldsets/SubmitArea';
import './NewTravelStipendForm.scss';

class NewTravelStipendForm extends PureComponent {
  constructor(props) {
    super(props);
    this.defaultState = {
      values: {
        center: '',
        stipend: '',
      },
      errors: {},
      hasBlankFields: true,
      isValidAmount: true
    };
    this.state = { ...this.defaultState };
    this.validate = getDefaultBlanksValidatorFor(this);
  }

  componentDidMount() {
    this.updateStateData(this.props);
  }

  componentWillReceiveProps(nextProps, nextContext) {
    const { updatedStipend : { isSaving }} = nextProps;
    this.setState({errors: nextProps.editing
      ? nextProps.travelStipends.updatedStipend.errors
      : nextProps.travelStipends.error });
    if (!isSaving) {
      this.updateStateData(nextProps);
    }
  }

  updateStateData = ({ editing, travelStipends: { selectedStipend } }) => {
    if(editing && selectedStipend ){
      const { amount:  stipend, center: { location } } = selectedStipend;
      this.setState({
        values: {
          center: location,
          stipend
        }
      });
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    let { values, hasBlankFields } = this.state;
    if (!hasBlankFields) {
      const {
        handleCreateTravelStipend,
        history,
        updateTravelStipend,
        editing,
        travelStipends: { selectedStipend: { id } }
      } = this.props;

      if (editing) {
        updateTravelStipend(id, values, history);
      } else {
        handleCreateTravelStipend(values, history);
      }
    }
  };

  handleShowEventError = (event) => {
    event.preventDefault();
    this.setState({ isValidAmount: false });
  }

  handleOnchange = (event) => {
    const { target: { value: amount } } = event;  
    this.setState(prevSate => {
      return {
        values: {
          ...prevSate.values,
          stipend: amount
        },
        errors: {},
        isValidAmount: (amount ? (amount > 0 && amount <= 1000)  : true),
      };
    }, () => this.validate());
  }

  renderTravelStipendFieldset = (isEmpty) => {
    const { values, isValidAmount,  } = this.state;
    const { centers, editing, travelStipends } = this.props;
    return (
      <TravelStipendFieldset
        centers={centers}
        values={values}
        isEmpty={isEmpty}
        handleShowEventError={this.handleShowEventError}
        onChangeAmountInput={this.handleOnchange}
        isValidAmount={isValidAmount}
        value="245px"
        editing={editing}
        stipends={travelStipends.stipends}
      />
    );
  };

  renderForm = () => {
    const { errors, values, 
      hasBlankFields, 
      selection, 
      errors: { 
        stipend 
      }, 
      isValidAmount 
    } = this.state;
    const {
      closeModal,
      travelStipends,
      editing,
      updatedStipend: { isSaving }
    } = this.props;
    const isEmpty = stipend === 'This field is required';
    return (
      <FormContext
        targetForm={this}
        values={values}
        errors={errors}
        validatorName="validate">
        <form onSubmit={this.handleSubmit} className="new-request">
          {this.renderTravelStipendFieldset(isEmpty)}
          <SubmitArea
            onCancel={closeModal}
            travelStipends={travelStipends} 
            hasBlankFields={hasBlankFields || !isValidAmount}
            selection={selection}
            loading={isSaving}
            send={editing ? 'Save Stipend' : 'Add Stipend'} />
        </form>
      </FormContext>
    );
  };

  render() {
    return <div>{this.renderForm()}</div>;
  }
}

NewTravelStipendForm.propTypes = {
  closeModal: PropTypes.func,
  centers: PropTypes.array,
  travelStipends: PropTypes.object,
  handleCreateTravelStipend: PropTypes.func.isRequired,
  history: PropTypes.object,
  editing: PropTypes.bool,
  updateTravelStipend: PropTypes.func,
  updatedStipend: PropTypes.object
};

NewTravelStipendForm.defaultProps = {
  centers: [],
  closeModal: null,
  travelStipends: {},
  history: {
    push : () => {}
  },
  editing: false,
  updateTravelStipend: () => {},
  updatedStipend: {
    isSaving: false
  }
};

export default NewTravelStipendForm;

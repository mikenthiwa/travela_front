import React, { PureComponent } from 'react';
import toast from 'toastr';
import { PropTypes } from 'prop-types';
import countries  from 'world-countries';
import { FormContext } from '../FormsAPI';
import AddCountryFields from './FormFieldSets/CountriesDetails';
import SubmitArea from '../NewRequestForm/FormFieldsets/SubmitArea';

const allCountries = countries.map(eachCountry => eachCountry.name.common);

class AddCountryForm extends PureComponent {
  constructor(props) {
    super(props);
    const { regionId } = this.props;
    let defaultValues = {
      item: '',
      regionId,
      countries: []
    };
    this.defaultState = {
      values: defaultValues,
      errors: {},
      hasBlankFields: true
    };
    this.state = { ...this.defaultState };
  }
  
  componentWillUnmount() {
    const { fetchCountries } = this.props;
    this.handleCancel();
    fetchCountries();
  }

  handleSubmit = event => {
    event.preventDefault();
    const { handleAddCountries, regionId } = this.props;
    const { values } = this.state;
    const data = {
      countries: values.countries
    };
    if (this.validate()) {
      handleAddCountries(regionId, data);
    }
  };

  addItem = () => {
    const { values } = this.state;
    const testPattern = new RegExp(`^${values.item.trim()}$`, 'i');
    if (!(allCountries.find(oneCountry => oneCountry === values.item))) {
      return toast.error('Enter a valid country from the dropdown');
    }
    if (values.countries.find(value => testPattern.test(value))) {
      return toast.error('You have added that country already');
    }

    this.setState(
      {
        values: {
          ...values,
          countries: values.countries.concat([values.item.trim()]),
          item: ''
        }
      },
      this.validate
    );
  };

  removeItem = i => {
    const { values } = this.state;
    const array = values.countries;
    array.splice(i, 1);
    this.setState(
      {
        values: {
          ...values,
          countries: array
        }
      },
      this.validate
    );
  };

  handleCancel = () => {
    const { closeModal } = this.props;
    this.setState({ ...this.defaultState });
    closeModal();
  };

  validate = field => {
    let { values, errors } = this.state;
    [errors, values] = [{ ...errors }, { ...values }];
    let hasBlankFields = false;
    delete values.item;
    if (!values[field]) {
      errors[field] = 'This field is required';
      delete errors.item;
    } else {
      errors[field] = '';
    }

    hasBlankFields = Object.keys(values).some(key => !values[key]);
    this.setState(prevState => {
      return { ...prevState, errors, hasBlankFields };
    });

    if (values.countries.length < 1) {
      this.setState({
        hasBlankFields: true
      });
    }
    return !hasBlankFields;
  };

  render() {
    const { values, errors, hasBlankFields } = this.state;
    const { addingCountries } = this.props;
    
    return (
      <FormContext
        targetForm={this}
        values={values}
        errors={errors}
        validatorName="validate"
      >
        <form onSubmit={this.handleSubmit} className="new-request">
          <AddCountryFields
            allCountries={allCountries}
            values={values}
            addItem={this.addItem}
            hasBlankFields={hasBlankFields}
            removeItem={this.removeItem}
          />
          <SubmitArea
            onCancel={this.handleCancel}
            loading={addingCountries}
            hasBlankFields={hasBlankFields}
            send="Submit"
          />
        </form>
      </FormContext>
    );
  }
}

AddCountryForm.propTypes = {
  handleAddCountries: PropTypes.func.isRequired,
  regionId: PropTypes.string.isRequired,
  addingCountries: PropTypes.bool,
  fetchCountries: PropTypes.func.isRequired,
  closeModal: PropTypes.func.isRequired
};

AddCountryForm.defaultProps = {
  addingCountries: false
};

export default AddCountryForm;

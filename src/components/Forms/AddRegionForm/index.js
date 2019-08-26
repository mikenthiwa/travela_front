import React, { PureComponent } from 'react';
import _ from 'lodash';
import { PropTypes } from 'prop-types';
import { FormContext } from '../FormsAPI';
import SubmitArea from '../NewRequestForm/FormFieldsets/SubmitArea';
import AddRegionFields from './FormFieldSets/AddRegionFields';

class AddRegionForm extends PureComponent {
  constructor(props) {
    super(props);
    const { regionDetail } = this.props;
    let defaultValues = {
      region: regionDetail ? regionDetail.region: '',
      description: regionDetail ? regionDetail.description : ''
    };
    this.defaultState = {
      values: defaultValues,
      errors: {},
      hasBlankFields: true
    };
    this.state = { ...this.defaultState };
  }

  componentDidMount() {
    this.setEditValues(this.props);
  }
  componentDidUpdate(){
    const{fetchRegions} = this.props;
    fetchRegions();
  }
setEditValues = ({ editing, regionDetail }) => {
  if (editing) {
    const { region, description } = regionDetail;
    const descriptionLength = description.length;
    this.setState(
      {
        values: { region, description },
        ofMinLength: descriptionLength < 10
      });
  }
};

  handleCancel = () => {
    const { closeModal } = this.props;
    this.setState({ ...this.defaultState });
    closeModal();
  };

  validLengthHelper = (field, fieldLength) => {
    return fieldLength ? field.trim().length >= fieldLength :
      field.trim().length === fieldLength;
  }
  validate = field => {
    let { values} = this.state;
    const { editing, regionDetail} = this.props;
    let tempErrorsObject = {
      region: '',
      description: ''
    };
    let hasBlankFields = false;
    switch (field) {
    case 'region':
      this.validLengthHelper(values[field], 0) ?
        (tempErrorsObject.region = 'This field is required')
        : null;
      this.validLengthHelper(values[field], 50)? (
        tempErrorsObject.region = 'Region can only be 50 characters long')
        : null;
      values.region = values.region.slice(0,50);
      break;
    case 'description':
      this.validLengthHelper(values[field], 0)?
        (tempErrorsObject.description = 'This field is required')
        : null;
      values[field].trim().length > 140 || values[field].trim().length < 10 ?
        (tempErrorsObject.description = 'Description can only be between 10 and 140 characters')
        : null;
      this.setState({ofMinLength: values[field].trim().length < 10});
      values.description = values.description.slice(0, 140);
      break;
    default:
      break;
    }

    hasBlankFields = Object.keys(values).some(
      key => !values[key].trim()
    );
    this.setState(prevState => {
      return { ...prevState, errors: { ...tempErrorsObject }, hasBlankFields };
    });

    if (editing && !hasBlankFields && regionDetail.region && regionDetail.description) {
      const region = values.region? values.region.toLowerCase() : '';
      const description = values.description ? values.description.toLowerCase() : '';
      hasBlankFields = region === regionDetail.region.toLowerCase() &&
        description === regionDetail.description.toLowerCase();
    }

    return !hasBlankFields;
  };

  handleSubmit = event => {
    event.preventDefault();
    const {
      values
    } = this.state;
    const {
      addRegion,
      myTitle,
      regionDetail,
      editing,
      editRegion,
    } = this.props;
    if (editing) {
      myTitle === editRegion({
        id: regionDetail.id,
        ...values
      });
    }
    if (this.validate() && !editing) {
      let data = values;
      myTitle === addRegion(data);
    }

  };
  render() {
    const { values, errors, hasBlankFields } = this.state;
    const { addingRegion, myTitle, editRegion, editing, addRegion, fetchRegions } = this.props;
    return (
      <FormContext targetForm={this} values={values} errors={errors} validatorName="validate">
        <form onSubmit={this.handleSubmit} className="new-request" id="add-region-form">
          <AddRegionFields
            values={values}
          />
          <hr />
          <SubmitArea
            isCreating={addingRegion}
            fetchRegions={fetchRegions}
            editing={editing}
            editRegion={editRegion}
            addRegion={addRegion}
            onCancel={this.handleCancel}
            hasBlankFields={hasBlankFields}
            send={myTitle}
          />
        </form>
      </FormContext>
    );
  }
}

AddRegionForm.propTypes = {
  addRegion: PropTypes.func.isRequired,
  fetchRegions: PropTypes.func.isRequired,
  addingRegion: PropTypes.bool,
  myTitle: PropTypes.string,
  regionDetail: PropTypes.object,
  closeModal: PropTypes.func.isRequired,
  editing: PropTypes.bool,
  editRegion: PropTypes.func,
};

AddRegionForm.defaultProps = {
  addingRegion: false,
  myTitle: '',
  regionDetail: {},
  editing: false,
  editRegion: null,
};

export default AddRegionForm;

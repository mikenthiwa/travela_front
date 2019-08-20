import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchDocumentTypes } from '../../../../redux/actionCreator/documentTypesActions';
import Dropdown from '../../Shared/Dropdown';

class DocumentUpload extends Component {

  componentDidMount() {
    const { fetchDocumentTypes } = this.props;
    fetchDocumentTypes();
  }

  generateDocumentTypes = () => {
    const { documentTypes } = this.props;
    const options = documentTypes.map(({ name }) => ({ value: name, displayValue: name }));
    return {
      options,
      placeHolder: 'select a document type',
      selectAreaSyle: 'behaviour-input upload-document-builder',
      selectStyle: 'behaviour-selected upload-document-builder',
    };
  }

  handleDropdownChange = selectedType => {
    const { behaviour, handleBehaviour } = this.props; 
    handleBehaviour({ ...behaviour, payload: selectedType });
  };

  render() {
    const dropDownOptions = this.generateDocumentTypes();
    const { behaviour } = this.props;
    return (
      <div className="upload-document-behaviour builder">
        <Dropdown dropdownOptions={dropDownOptions} value={behaviour.payload || ''} changeFunc={this.handleDropdownChange} />
      </div>
    );
  }
}

DocumentUpload.propTypes = {
  behaviour: PropTypes.object.isRequired,
  handleBehaviour: PropTypes.func.isRequired,
  documentTypes: PropTypes.array.isRequired,
  fetchDocumentTypes: PropTypes.func.isRequired,
};

const mapDispactchToProps = {
  fetchDocumentTypes
};

const mapStateToProps = ({ documentTypes: { documentTypes } }) => ({
  documentTypes,
});

export default connect(mapStateToProps, mapDispactchToProps)(DocumentUpload);

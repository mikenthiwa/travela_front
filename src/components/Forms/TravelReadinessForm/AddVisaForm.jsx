import React from 'react';
import './TravelDocument.scss';
import withTravelReadinessForm from '../../Hoc/withTravelReadinessForm';
import VisaFormFieldSet from './FormFieldsets/VisaFormFieldset';

export default withTravelReadinessForm(VisaFormFieldSet,'visa',
  {
    values: {
      country: '',
      entryType: '',
      dateOfIssue: '',
      expiryDate: '',
      visaType:''
    },
    image: '',
    imageChanged: false,
    documentUploaded: false,
    uploadingDocument: false,
    errors: {},
    hasBlankFields: true,
  });


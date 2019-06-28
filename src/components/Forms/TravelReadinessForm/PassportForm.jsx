import React from 'react';
import './TravelReadiness.scss';
import withTravelReadinessForm from '../../Hoc/withTravelReadinessForm';
import PassportDetailsFieldSet from './FormFieldsets/passportDetails';

export default withTravelReadinessForm(PassportDetailsFieldSet,'passport',
  {
    values: {
      name: '',
      passportNumber: '',
      nationality:'',
      dateOfBirth: '',
      dateOfIssue: '',
      placeOfIssue: '',
      expiryDate: '',
    },
   
    image: '',
    imageChanged: false,
    documentUploaded: false,
    uploadingDocument: false,
    errors: {},
    hasBlankFields: true
  });


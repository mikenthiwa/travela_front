import React from 'react';
import withTravelReadinessForm from '../../Hoc/withTravelReadinessForm';
import OtherDocumentFieldSet from './FormFieldsets/OtherDocumentFieldSet';

export default withTravelReadinessForm(OtherDocumentFieldSet,'other',
  {
    values: {
      name: '',
      dateOfIssue: '',
      expiryDate: '',
      documentId: ''
    },
    image: '',
    imageChanged: false,
    documentUploaded: false,
    uploadingDocument: false,
    errors: {},
    hasBlankFields: true,
    optionalFields: [
      'documentId',
      'dateOfIssue'
    ]
  });



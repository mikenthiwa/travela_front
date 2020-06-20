import OtherDocumentInputLabel from '../index';

describe('OtherDocumentMetaData', () => {
  const inputLables = {
    name: {
      label: 'Document Type'
    },
    documentId: {
      label: 'Document Id'
    },
    dateOfIssue: {
      label: 'Date of Issue (MM/DD/YYYY)'
    },
    expiryDate: {
      label: 'Expiry Date (MM/DD/YYYY)'
    },
  };
  it('renders returns other document input lable', () => {
    expect(OtherDocumentInputLabel.inputLabels).toMatchObject(inputLables);
  });
});

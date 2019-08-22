const checkUploadedDocument = (document) => {
  if (!document.passport) {
    return 'your passport document';
  } else if(!document.visa) {
    return 'your visa document';
  } else {
    return 'your yellow fever card';
  }
};

export default checkUploadedDocument;

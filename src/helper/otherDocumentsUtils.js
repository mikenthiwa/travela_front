
let showDocumentName;
export const documentName = (value) =>{
  value = `${value.lines[0].text} ${value.lines[1].text}`;
  showDocumentName =  value && (value.includes('INTERNATIONAL CERTIFICATE') || value.includes('VACCINATION') || value.includes('PROPHYLAXIS') )
    ? 'Yellow Fever': 'Other Document';
  return showDocumentName;
};

export const documentId = () =>{
  return showDocumentName === 'Yellow Fever' ? 'Not Applicable' : '';
};

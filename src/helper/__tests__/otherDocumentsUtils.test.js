import * as otherDocumentUtils from '../otherDocumentsUtils';

const yellowFeverDoc = { lines:[{text: 'INTERNATIONAL CERTIFICATE OF VACCINATION OR PROPHYLAXIS'}, {text: ''}] };
const otherDoc = { lines:[{text: 'IMMIGRATION PASS'}, {text: 'ACROSS BORDERS'}] };
let showDocumentName;
describe('other Documents util file', ()=>{
  it('should return Yellow Fever document name', ()=>{
    expect(otherDocumentUtils.documentName(yellowFeverDoc)).toEqual('Yellow Fever');
  });

  it('should return appropriate yellow fever document ID', ()=>{
    expect(otherDocumentUtils.documentId( showDocumentName = 'Yellow Fever')).toEqual('Not Applicable');
  });

  it('should return other document name', ()=>{
    expect(otherDocumentUtils.documentName(otherDoc)).toEqual('Other Document');
  });

  it('should return appropriate yellow fever document ID', ()=>{
    expect(otherDocumentUtils.documentId( showDocumentName = 'Other Document')).toEqual('');
  });

});


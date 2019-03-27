const baseAPI = Cypress.env('REACT_APP_API_URL');
describe('user can add visas', () => {
  before(() => {
    cy.server();
    cy.authenticateUser();
    cy.visit('/travel_readiness');
    cy.route('POST', `${baseAPI}/travelreadiness`).as('createVisa');
    cy.get('#visaButton').click();
  });

  const createTestVisa = (expiryDate) => {
    cy
      .get('#actionButton').click()
      .get('.occupationInput').type('Uganda')
      .get('[name=entryType] ').click()
      .get('div[name=entryType] > ul > li#choice:first').click()
      .get('[name=visaType]').click()
      .get('div[name=visaType] > ul > li#choice:first').click()
      .get('input[name="dateOfIssue"]').type('12/12/2018')
      .get('input[name="expiryDate"]').type(expiryDate)
      .get('.document-input__input-container').click()
      .uploadFile('../fixtures/images/guesthouse.jpg','image/jpeg')
      .get('#submit').click().wait(9000)
      .get('.modal-close').click({multiple: true});
  };

  const deleteTestVisa = () => {
    cy
      .get('#toggleIcon2').click()
      .get('#deleteRequest').click()
      .get('.bg-btn.bg-btn--active.delete-document-button').contains('Delete').click();
  };

  const createOtherVisaType = (expiryDate) => {
    cy
      .get('#actionButton').click()
      .get('.modal-title-bar').contains('Add Visa Details')
      .get('.document-input__input-container__prompts__text > :nth-child(1)')
      .contains('Choose from computer')
      .get('.travel-document-select-file > :nth-child(1)')
      .contains('Attach the image or PDF of your visa document')
      .get('.maximum-file-size').contains('Maximum file size - 10MB')
      .get('.occupationInput').type('Uganda')
      .get('[name=entryType] ').click()
      .get('div[name=entryType] > ul > li#choice:first').click()
      .get('[name=visaType]').click()
      .get('div[name=visaType] > ul > li#choice').eq(2).click()
      .get('.character__conditions__visa').contains('140')
      .get('.textarea-box').type('Two days Visa')
      .get('input[name="dateOfIssue"]').type('12/25/2018')
      .get('input[name="expiryDate"]').type(expiryDate)
      .get('.document-input__input-container').click()
      .uploadFile('../fixtures/images/guesthouse.jpg','image/jpeg')
      .get('#submit').click().wait(9000)
      .get('.modal-close').click({multiple: true});
  };

  const uploadLargeFile = () => {
    cy
      .get('#actionButton').click()
      .uploadFile('../fixtures/images/largefile.jpg','image/jpeg')
      .wait(2000).get('.toast-message').should('be.visible')
      .contains('This upload has exceeded the 10 MB limit that is allowed')
      .get('#cancel').click();
  };

  const uploadPdfDocument = () => {
    cy
      .get('#actionButton').click()
      .upload_pdf('images/pdfImage.pdf', 'application/pdf', 'input[type=file]')
      .wait(2000)
      .get('.document-input__input-container__prompts__text > :nth-child(1)')
      .contains('images/pdfImage.pdf')
      .get('#cancel').click();
  };

  beforeEach(() => {
    cy.authenticateUser();
  });

  it('find Add visa button', () => {
    cy
      .get('#actionButton')
      .contains('Add visa');
  });

  it('adds visa details with visaType Other', () => {
    createOtherVisaType ('12/25/2020');
    deleteTestVisa();
  });

  it('Should upload pdf document', () => {
    uploadPdfDocument();
  });

  it('Upload file with size greater than 10MB', () => {
    uploadLargeFile ('12/25/2020');
  });

  it('adds a visa', () => {
    createTestVisa('12/12/2019');
    deleteTestVisa();
  });

  it('see modal displaying details of the visa and comment', () => {
    createTestVisa('12/12/2020');
    cy
      .get('.document-name').first().click()
      .get('.ql-editor').type('this is a demo comment')
      .get('#post-submit').click()
      .wait(3000)
      .get('.modal-close').click();
    deleteTestVisa();
  });

  it('should edit unverified visa', () => {
    createTestVisa('12/12/2021');
    cy
      .get('#toggleIcon2').click()
      .get('#iconBtn2').click()
      .get('input[name="dateOfIssue"]').clear().type('12/12/2010')
      .get('.occupationInput').clear().type('Nigeria')
      .get('#submit').click().wait(9000);
    deleteTestVisa();
  });

  it('should delete unverified visa', () => {
    createTestVisa('12/12/2019');
    deleteTestVisa();
  });
});

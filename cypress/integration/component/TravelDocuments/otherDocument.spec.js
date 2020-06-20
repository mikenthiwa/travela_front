const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Add other document form', () => {
  before(() => {
    cy.authenticateUser();
    cy.visit('/travel_readiness');
    cy.server();
    cy.route('POST', `${baseAPI}/travel_readiness`);
  });

  describe('Display other document form', () => {
    before(() => {
      cy.get('#otherButton').should(
        'have.class',
        'documents-button-group__button--inactive'
      );
      cy.get('#otherButton').click();
    });
    it(`should display a modal when 
        'Add other is clicked`, () => {
      cy.get('#actionButton').click();
      cy.get('.modal').as('otherDocument-modal');
      cy.get('@otherDocument-modal').contains('Add Document');
      cy.get('@otherDocument-modal')
        .find('form.travel-document-form')
        .as('add-otherDocument-form')
        .should('be.visible');
      cy.get('@add-otherDocument-form')
        .contains('Name')
        .get('@add-otherDocument-form')
        .contains('Date of Issue')
        .get('@add-otherDocument-form')
        .contains('Document Id')
        .get('@add-otherDocument-form')
        .contains('Expiry Date')
        .get('@add-otherDocument-form')
        .contains('Attach File')
        .get('div.document-input__input-container')
        .contains('Maximum file size - 20MB');
    });
  });

  describe('Add other documents', () => {
    it('should succesfully add a document', () => {
      cy.get('input[name=name]')
        .wait(2000)
        .type('Sammy Njau');
      cy.get('input[name=documentId]')
        .wait(2000)
        .type('324403456');
      cy.get('input[name=dateOfIssue]')
        .type('01/05/2017')
        .type('{downarrow}{enter}');
      cy.get('input[name=expiryDate]')
        .wait(2000)
        .type('01/01/2030')
        .type('{downarrow}{enter}');

      cy.uploadFile('images/guesthouse.jpg', 'image/jpeg');
      cy.get('button#submit')
        .should('not.be.disabled')
        .click();
      cy.authenticateUser().wait(3000);
      cy.get('.toast-message')
        .should('be.visible')
        .wait(3000)
        .contains('Document created successfully!');
      cy.get('button#yes')
        .should('be.visible')
        .click();
    });

    it('should succesfully add another  document', () => {
      cy.get('input[name=name]')
        .wait(2000)
        .type('Sammy  Njau mbugua');
      cy.get('input[name=documentId]')
        .wait(2000)
        .type('YF44848');
      cy.get('input[name=dateOfIssue]')
        .type('06/06/2019')
        .type('{downarrow}{enter}');
      cy.get('input[name=expiryDate]')
        .wait(2000)
        .type('04/05/2050')
        .type('{downarrow}{enter}');
      cy.uploadFile('images/guesthouse.jpg', 'image/jpeg');
      cy.get('button#submit')
        .should('not.be.disabled')
        .click();
      cy.authenticateUser().wait(3000);
      cy.get('.toast-message')
        .should('be.visible')
        .wait(3000)
        .contains('Document created successfully!');
      cy.get('button#yes')
        .should('be.visible')
        .click();
    });

    it('should toast an error message for large file', () => {
      cy.get('input[name=name]')
        .wait(2000)
        .type('Sylvia Wanjiku');
      cy.get('input[name=documentId]')
        .wait(2000)
        .type('YF44848');
      cy.get('input[name=dateOfIssue]')
        .type('06/06/2019')
        .type('{downarrow}{enter}');
      cy.get('input[name=expiryDate]')
        .wait(2000)
        .type('{downarrow}{enter}');
      cy.uploadFile('images/largefile.jpg', 'image/jpeg');
      cy.get('.toast-message')
        .wait(3000)
        .should('be.visible')
        .contains('File is too large')
        .wait(2000);
      cy.get('button#cancel').click();
    });
  });

  describe('Edit a document', () => {
    it('should edit a document', () => {
      cy.get('#toggleIcon2')
        .click()
        .get('#iconBtn2')
        .click();
      cy.get('input[name=name]')
        .wait(2000)
        .should('have.value', 'Sammy Njau')
        .clear()
        .type('Andrew Hinga');
      cy.get('input[name=documentId]')
        .wait(2000)
        .clear()
        .type('ZT393848');
      cy.get('button#submit')
        .should('not.be.disabled')
        .click();
    });
  });

  describe('Comment on a document', () => {
    it('should add a comment', () => {
      cy.get('.document-name')
        .first()
        .click();
      cy.get('.modal')
        .as('comment-modal')
        .should('be.visible')
        .contains('Other Details');
      cy.get('@comment-modal')
        .find('.ql-editor')
        .as('comment-editor')
        .should('be.visible');
      cy.get('@comment-editor').type('comment');
      cy.get('#post-submit')
        .contains('Post')
        .click()
        .wait(2000);
      cy.get('.modal__status-update > p')
        .should('be.visible')
        .contains('comment');
      cy.get('.modal-close > img')
        .should('be.visible')
        .click();
    });
  });

  describe('Delete a document', () => {
    it('user should be able to delete a document', () => {
      cy.get('#toggleIcon2').click();
      cy.get('.table__menu-list').contains('Delete');
      cy.get('#deleteRequest').click();
      cy.get('.modal')
        .as('delete-modal')
        .should('be.visible');
      cy.get('@delete-modal')
        .find('button.bg-btn')
        .contains('Delete')
        .click()
        .wait(3000);
      cy.get('.toast-message')
        .contains('Document successfully deleted')
        .wait(2000);
  });
  
  it('user should be able to delete second document', () => {
    cy.get('#toggleIcon2').click();
    cy.get('.table__menu-list').contains('Delete');
    cy.get('#deleteRequest').click();
    cy.get('.modal')
      .as('delete-modal')
      .should('be.visible');
    cy.get('@delete-modal')
      .find('button.bg-btn')
      .contains('Delete')
      .click()
      .wait(3000);
  });
  });
});

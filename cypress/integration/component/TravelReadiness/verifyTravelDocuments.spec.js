const baseAPI = Cypress.env('REACT_APP_API_URL');

const navigateToModal = () => {
  cy.server();
  cy.authenticateUser();
  cy.visit('/trip-planner/travel-readiness');
  cy.get(':nth-child(1) > .readiness__cell-name > .table__data--link')
    .click();
  cy.get('.document-name')
    .click();
};

describe('Travel admin can view and verify travel documents', () => {
  describe('Travel readiness page with data', () => {
    before(() => {
      cy.server();
      cy.authenticateUser();
      cy.visit('/trip-planner/travel-readiness');
    });

    it('should show the list of developers who have uploaded the travel documents', () => {
      cy.get('.title')
        .contains('TRAVEL READINESS');
      cy.get('.readiness__cell-name')
        .contains( 'Travela Test');
    });
  });

  describe('Travel readiness page without data', () => {
    before(() => {
      cy.server();
      cy.authenticateUser();
      cy.route('GET', `${baseAPI}/travelreadiness/users?searchQuery=&page=1`,
        'fixture:travelReadiness/document').wait(3000);
      cy.visit('/trip-planner/travel-readiness');
    });

    it('should show a friendly message if no item exists', () => {
      cy.get('.title')
        .contains('TRAVEL READINESS');
      cy.get('#no-results')
        .contains( 'No results');
    });
  });

  describe('Travel document details', () => {
    before(() => navigateToModal());
    it('should show the document details', () => {
      cy.get('.modal-title').contains('Passport Details');
      cy.get(':nth-child(1) > .modal__travel-doc-item > .modal__travel-doc-text')
        .contains('qw357etrty');
      cy.get(':nth-child(2) > .modal__travel-doc-item > .modal__travel-doc-text')
        .contains('kenyan');
      cy.get(':nth-child(3) > .modal__travel-doc-item > .modal__travel-doc-text')
        .contains('1970-01-01');
      cy.get(':nth-child(4) > .modal__travel-doc-item > .modal__travel-doc-text')
        .contains('Kenya');
      cy.get(':nth-child(5) > .modal__travel-doc-item > .modal__travel-doc-text')
        .contains('2018-11-01');
      cy.get(':nth-child(6) > .modal__travel-doc-item > .modal__travel-doc-text')
        .contains('2029-11-01');
      cy.get('.document-name > a')
        .contains('kenyan Passport');
      cy.get('.status__verify')
        .contains('Pending');
    });

    it('should display the status of the uploaded document', () => {
      cy.get('.modal-close > img').click();
      cy.get('.table__rows > :nth-child(7)')
        .contains('Pending');
    });
  });

  describe('Comment actions', () => {
    before(() => navigateToModal());
    it('should enable a travel admin post a comment', () => {
      cy.get('.ql-editor')
        .type('Comment');
      cy.get('#post-submit')
        .click();
      cy.get('.toast-message')
        .should('be.visible')
        .contains('Travela Test posted a comment');
    });
    it('should enable a travel admin edit a comment', () => {
      cy.get(':nth-child(1) > .modal__mdl-icons > .modal__dialog > .edit-button')
        .click().wait(5000);
      cy.get(':nth-child(1) > .modal__mdl-icons > .comment-box > .editor__editor-form > .quill > .ql-container > .ql-editor')
        .clear()
        .type('Commenter');
    });
    it('should enable a travel admin delete a comment', () => {
      cy.get(':nth-child(1) > .modal__mdl-icons > .comment-box > .editor__editor-form > .editor__btn-size > .editor__btn-wrap > div > .editor__post-btn')
        .click();
      cy.get(':nth-child(1) > .modal__mdl-icons > .modal__dialog > .modal__delete-btn')
        .click();
      cy.get(' .delete-comment-modal__btn')
        .click();
    });
  });
  describe('Document Verification', () => {
    before(() => navigateToModal());
    it('travel admin should be unable to verify his/her own document', () => {
      cy.get('.status__verify')
        .contains('Pending');
    });
    it('travel admin should be able to verify a user\'s document', () => {
      cy.authenticateUser();
      cy.server();
      cy.route('PUT', `${baseAPI}/travelreadiness/documents/vbhg4567h/verify`, 'fixtures:travelReadiness/documentVerify');
      cy.visit('/trip-planner/travel-readiness');
      cy.get(':nth-child(2) > .readiness__cell-name > .table__data--link')
        .click();
      cy.get('.document-name')
        .click();
      cy.get('#verify_button').click();
      cy.get('#Verify').click();
      cy.get('.toast-message')
        .should('be.visible')
        .contains('Document successfully verified');
    });
  });
});

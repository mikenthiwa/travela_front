const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Verification page(Verification of requests by Travel Admin)', () => {
  describe('Verification of requests', () => {
    before(() => {
      cy.server();
      cy.route(
        'GET',
        `${baseAPI}/requests/*`,
        'fixture:requests/ApprovedRequest'
      );
      cy.route(
        'GET',
        `${baseAPI}/checklists/*/submissions`,
        'fixture:requests/RequestSubmissions'
      );
      cy.route(
        'PUT',
        `${baseAPI}/requests/*/verify`,
        'fixture:requests/VerifiedRequest'
      );
      cy.authenticateUser();
      cy.visit('/requests/my-verifications/AWQqIucjm');
    });


    it('should verify a request and toast success message', () => {
      cy.get('.action-button--verify').click();
      cy.get('#verify').click();
      cy.get('.toast-message')
        .wait(3000)
        .should('be.visible')
        .contains('Verification Successful');
    });
  });

  describe('Comment on requests', () => {
    before(() => {
      cy.server();
      cy.route('GET',`${baseAPI}/requests/*`,
        'fixture:requests/ApprovedRequest'
      );
      cy.authenticateUser();
      cy.visit('/requests/my-verifications/AWQqIucjm');
    });

    it('displays the Hide comment button', () => {
      cy.get('.comment-button-text').contains('Hide Comments');
    });

    it('displays and hides comment editor', () => {
      cy.get('.comment-button-text').click();
      cy.get('.ql-editor').should('not.be.visible');
      cy.get('.comment-button-text').click();
      cy.get('.ql-editor').should('be.visible');
    });

    it('displays Comment box Toolbar and Editor', () => {
      cy.get('.ql-toolbar');
      cy.get('.ql-editor');
    });


    describe('Travel Admin Posts a Comment', () => {
      before(() => {
        cy.server();
        cy.route('POST', `${baseAPI}/comments`, 'fixture:requests/NewComment');
      });

      it('should type in comment box', () => {
        cy.get('.ql-editor').type('Admin testing comments');
        cy.get('#post-submit').click();
      });

      it('should verify that a comment has been posted', () => {
        cy.get('.modal__status-update').contains('Admin testing comments');
      });


    });
  });
});

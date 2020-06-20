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
        'PUT',
        `${baseAPI}/requests/*/verify`,
        'fixture:requests/VerifiedRequest'
      );
      cy.authenticateUser();
      cy.visit('/requests/my-verifications/AWQqIucjm');
    });


    it('should verify a request and toast success message', () => {
      cy.get('.row > .btn-group > .action-button--disabled').should('be.disabled');
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
      cy.get('.comment-button-text').click({multiple: true, force: true});
      cy.get('.ql-editor').should('not.be.visible');
      cy.get('.comment-button-text').click({multiple: true, force: true});
      cy.get('.ql-editor').should('not.be.visible');
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
        cy.get('.ql-editor');
        cy.get('#post-submit');
      });

    });
  });
});

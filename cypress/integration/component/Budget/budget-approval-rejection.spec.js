const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Approval page for budget checks(Approval or rejection of request)', () => {
  describe('Rejection of a request', () => {
    before(() => {
      cy.server();
      cy.route(
        'GET',
        `${baseAPI}/requests/*`,
        'fixture:budgetChecks/budgetOpenRequest'
      );
      cy.route(
        'PUT',
        `${baseAPI}/approvals/budgetStatus/*`,
        'fixture:budgetChecks/budgetRejectedRequest'
      );
      cy.authenticateUser();
      cy.visit('/requests/budgets/aYzohHxie');
    });

    it('should reject a request ', () => {
      cy.route(
        'PUT',
        `${baseAPI}/approvals/budgetStatus/aYzohHxie`,
        'fixture:budgetChecks/budgetRejectedRequest'
      ).as('budgets');
      cy.get('.action-button--reject').click();
      cy.get('#reject').click();
      cy.wait('@budgets').then(xhr => {
        assert.isTrue(xhr.response.body.success);
        assert.equal(xhr.response.body.updatedRequest.budgetStatus, 'Rejected');
      });
    });
  });

  describe('Rejected request', () => {
    before(() => {
      cy.server();
      cy.route(
        'GET',
        `${baseAPI}/requests/*`,
        'fixture:budgetChecks/rejectedRequest'
      );
      cy.authenticateUser();
      cy.visit('/requests/budgets/aYzohHxie');
    });
    it('should certify that reject button is updated to rejected', () => {
      cy.get('.action-button--rejected').contains('rejected');
    });
  });

  describe('Details page for a request ', () => {
    before(() => {
      cy.server();
      cy.route(
        'GET',
        `${baseAPI}/requests/*`,
        'fixture:budgetChecks/budgetOpenRequest'
      );
      cy.route(
        'PUT',
        `${baseAPI}/approvals/budgetStatus/*`,
        'fixture:budgetChecks/budgetRejectedRequest'
      );
      cy.authenticateUser();
      cy.visit('/requests/budgets/aYzohHxie');
    });

    it('should display manager\'s approval header', () => {
      cy.get('.header > :nth-child(2)').contains('Manager\'s Approval');
    });

    it('should display Budget Check header', () => {
      cy.get('.header > :nth-child(3)').contains('Budget Check');
    });

    it('should display approval card ', () => {
      cy.get('.right-pane > :nth-child(1)').contains(
        'Do you want to approve Travela Test\'s travel request?'
      );
    });

    it('should display Travel Reason Card', () => {
      cy.get('.right-pane > :nth-child(2)').contains('Travel Reason');
    });

    it('should display Flight Route Card', () => {
      cy.get('.left-pane > :nth-child(2) > :nth-child(1)').contains(
        'Flight Route'
      );
    });

    it('should display Travel Dates Card', () => {
      cy.get('.left-pane > :nth-child(2) > :nth-child(2)').contains(
        'Travel Dates'
      );
    });

    it('should display Accomodation Card', () => {
      cy.get('.left-pane > :nth-child(2) > :nth-child(3)').contains(
        'Accommodation'
      );
    });

    it('should display Requested By Card', () => {
      cy.get('.left-pane > :nth-child(1) > :nth-child(1)').contains(
        'Requested By'
      );
    });

    it('should display Request Type Card', () => {
      cy.get('.left-pane > :nth-child(1) > :nth-child(2)').contains(
        'Request Type'
      );
    });

    it('should display Total Stipend Card', () => {
      cy.get('.left-pane > :nth-child(1) > :nth-child(3)').contains(
        'Total Stipend'
      );
    });

    it('should display the left sidebar on the page', () => {
      cy.get(
        '.sidebar > .left-sidebar > .left-sidebar__fixed_wrapper'
      ).contains('Home');
    });
  });

  describe('should post a comment ', () => {
    before(() => {
      cy.server();
      cy.route(
        'GET',
        `${baseAPI}/requests/*`,
        'fixture:budgetChecks/budgetOpenRequest'
      );
      cy.route(
        'PUT',
        `${baseAPI}/approvals/budgetStatus/*`,
        'fixture:budgetChecks/budgetApprovedRequest'
      );
      cy.route('POST', `${baseAPI}/comments`, 'fixture:budgetChecks/comments');
      cy.authenticateUser();
      cy.visit('/requests/budgets/aYzohHxie');
    });

    it('should type in comment box', () => {
      cy.get('.ql-editor').type('testing you');
      cy.get('#post-submit').click();
    });

    it('should certify that a comment has been posted', () => {
      cy.get(
        ':nth-child(2) > .modal__mdl-icons > .modal__modal2 > .modal__status-update'
      ).contains('chgcfbcvb');
    });
  });

  describe('Approval of a request', () => {
    before(() => {
      cy.server();
      cy.route(
        'GET',
        `${baseAPI}/requests/*`,
        'fixture:budgetChecks/budgetOpenRequest'
      );
      cy.route(
        'PUT',
        `${baseAPI}/approvals/budgetStatus/*`,
        'fixture:budgetChecks/budgetApprovedRequest'
      );
      cy.authenticateUser();
      cy.visit('/requests/budgets/aYzohHxie');
    });

    it('should approve a request ', () => {
      cy.route(
        'PUT',
        `${baseAPI}/approvals/budgetStatus/aYzohHxie`,
        'fixture:budgetChecks/budgetApprovedRequest'
      ).as('budgets');
      cy.get('.action-button--approve').click();
      cy.get('#approve').click();
      cy.wait('@budgets').then(xhr => {
        assert.isTrue(xhr.response.body.success);
        assert.equal(xhr.response.body.updatedRequest.budgetStatus, 'Approved');
      });
    });

    it('should check existence of header', () => {
      cy.get('.header').contains('REQUEST');
    });
  });

  describe('Approved request', () => {
    before(() => {
      cy.server();
      cy.route(
        'GET',
        `${baseAPI}/requests/*`,
        'fixture:budgetChecks/approvedRequest'
      );
      cy.authenticateUser();
      cy.visit('/requests/budgets/aYzohHxie');
    });
    it('should certify that approve button is updated to approved', () => {
      cy.get('.action-button--approved').contains('approved');
    });
  });
});

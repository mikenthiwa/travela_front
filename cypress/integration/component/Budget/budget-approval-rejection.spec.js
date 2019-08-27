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
      cy.get('.action-button--reject').click({
        multiple: true,
        force: true
      });
      cy.get('#reject').click({
        multiple: true,
        force: true
      });
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
      cy.get('.header > :nth-child(1)').find('img');
    });

    it('should display Managers Approval header', () => {
      cy.get('.stage-container > :nth-child(1)').contains('Managers Approval');
    });
    it('should display Budget Check header', () => {
      cy.get('.stage-container > :nth-child(2)').contains('Budget Check');
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
        'Cost Breakdown'
      );
    });

    it('should display the left sidebar on the page', () => {
      cy.get(
        '.sidebar > .left-sidebar > .left-sidebar__fixed_wrapper'
      ).contains('Home');
    });
    it('should display the travel reason card', () => {
      cy.get(
        '.desktop > .text--grey'
      ).contains('Travel Reason');
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
        cy.get('.action-button--approve').click({
          multiple: true,
          force: true
        });
        cy.get('#approve').click({
          multiple: true,
          force: true
        });
        cy.wait('@budgets').then(xhr => {
          assert.isTrue(xhr.response.body.success);
          assert.equal(xhr.response.body.updatedRequest.budgetStatus, 'Approved');
        });
      });

      it('should check existence of header', () => {
        cy.get('.progress-tags').contains('REQUEST');
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
});

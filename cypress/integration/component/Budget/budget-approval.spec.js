const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Budget check approvals', () => {
  before(() => {
    cy.server();
    cy.route(
      'GET',
      `${baseAPI}/approvals/budget?page=2`,
      'fixture:budgetChecks/budgetapproval'
    );
  });

  describe('Budget checkers approval page', () => {
    before(() => {
      cy.authenticateUser();
      cy.visit('/requests/budgets?page=2');
    });

    it('should go back to page two when the back button is clicked', () => {
      cy.server();
      cy.route('GET', `${baseAPI}/requests/*`,
        'fixture:approvals/OpenRequest');
      cy.authenticateUser();
      cy.visit('/requests/budgets/AWQqIucjm').wait(3000);
      cy.get('.header__link').click({
        multiple: true,
        force: true
      });
      cy.url().should('include', '/budgets?page=2');
    });

    it('should display the Budget checkers approvals header', () => {
      cy.get('.PageHeader span.title').contains('APPROVALS');
    });

    it('should display the left sidebar on the page', () => {
      cy.get(
        '.sidebar > .left-sidebar > .left-sidebar__fixed_wrapper'
      ).contains('Home');
    });

    it('should display the All button', () => {
      cy.get('#all-button').contains('All');
    });

    it('displays the Pending request Approvals button', () => {
      cy.get('#open-button').contains('Pending Approvals');
    });

    it('displays the Past request Approvals button', () => {
      cy.get('#past-button').contains('Past Approvals');
    });

    it('displays the Items per page text', () => {
      cy.get('.cell-items-per-page-text').contains('Items per page');
    });

    it('displays pre-populated value of 10 on select drop down', () => {
      cy.get('.dropdown__input').contains('10');
    });

    it('displays a component that shows travel request waiting for the budget checker approval', () => {
      cy.get('.table__row > .pl-sm-100').contains('Travela Test');
    });
  });
});
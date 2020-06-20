const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Approvals', () => {
  before(() => {
    cy.server();
    cy.route('GET', `${baseAPI}/approvals?page=2`,
      'fixture:approvals/approval');
  });

  describe('Managers approval page', () => {
    before(() => {
      cy.authenticateUser();
      cy.visit('/requests/my-approvals?page=2');
    });

    it('should go back to page two when the back button is clicked', ()=>{
      cy.server();
      cy.route('GET', `${baseAPI}/requests/*`,
        'fixture:approvals/OpenRequest');
      cy.authenticateUser();
      cy.visit('/requests/my-approvals/CVEgPxX1q').wait(3000);
      cy.get('.header__link').click({force: true});
      cy.get('.pagination__current-page').contains('2');
      cy.url().should('include', '/my-approvals?page=2');
    });

    it('displays the approvals header', () => {
      cy
        .get('.PageHeader span.title')
        .contains('APPROVALS');
    });

    it('displays the All button', () => {
      cy
        .get('#all-button')
        .contains('All');
    });

    it('displays the Pending Approvals button', () => {
      cy
        .get('#open-button')
        .contains('Pending Approvals');
    });

    it('displays the Past Approvals button', () => {
      cy
        .get('#past-button')
        .contains('Past Approvals');
    });

    it('displays the Items per page text', () => {
      cy
        .get('.cell-items-per-page-text')
        .contains('Items per page');
    });

    it('displays pre-populated value of 10 on select drop down', () => {
      cy
        .get('.dropdown__input')
        .contains('10');
    });

    it('displays a component that shows travel request for the manager\'s approval', () => {
      cy
        .get('.table__row > .pl-sm-100')
        .contains('Ronald Ndirangu');
    });
  });
});

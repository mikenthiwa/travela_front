const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Trip Planner', () => {

  describe('Travel Readiness Page', () => {
    before(() => {
      cy.server();
      cy.authenticateUser();
      cy.visit('/trip-planner/travel-readiness');
    });

    it('should filter the list of travel ready users based on documents', () => {
      cy.get('.table__body')
        .children()
        .should('have.length', 4);
      cy.get('.btn--')
        .contains('With Documents')
        .click();
      cy.get('.table__body')
        .children()
        .should('have.length', 2);        
    });
  }); 
});

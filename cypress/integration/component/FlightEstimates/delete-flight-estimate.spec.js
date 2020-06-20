const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Delete Flight Estimate', () => {
  before(() => {
    cy.server();
    cy.route(
      'GET',
      `${baseAPI}/flightEstimate`,
      'fixture:flightEstimates/flightEstimates'
      );
    cy.route(
      'DELETE',
      `${baseAPI}/flightEstimate/43`,
      'fixture:flightEstimates/deleteFlightEstimate'
    );
    cy.authenticateUser();
    cy.visit('/travel-cost/flight-estimates');
  });

  it('should delete a flight estimate', () => {
    cy.get('.stipend-list > :nth-child(1)').should('be.visible');
    cy.get(':nth-child(1) > .travel_stipend_menu > :nth-child(1) > .fa')
      .should('be.visible').click();
    cy.get(':nth-child(1) > .travel_stipend_menu > :nth-child(1) > .context-menu > .table__menu-list')
      .should('be.visible').contains('Delete');
    cy.get(':nth-child(1) > .travel_stipend_menu > :nth-child(1) > .context-menu > .table__menu-list > .delete > span')
      .should('be.visible').click();
    cy.get('.modal-title-bar').should('be.visible').contains('Confirm Delete');
    cy.get('.modal-content').should('be.visible').get('.content > p')
      .contains('Are you sure you want to delete flight estimate for North Africa to Sudan?');
    cy.get('#cancel').should('be.visible').contains('Cancel');
    cy.get('#submit').should('be.visible').contains('Delete');
    cy.get('#submit').click();
    cy.get('.toast-message')
      .wait(3000)
      .should('be.visible')
      .contains('Flight Estimate deleted successfully');
  });
});

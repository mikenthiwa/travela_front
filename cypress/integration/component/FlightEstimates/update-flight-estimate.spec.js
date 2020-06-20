const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Update Flight Estimates', () => {
  before(() => {
    cy.server();
    cy.route(
      'GET',
      `${baseAPI}/flightEstimate`,
      'fixture:flightEstimates/flightEstimates'
    );
    cy.route(
      'PUT',
      `${baseAPI}/flightEstimate/43`,
      'fixture:flightEstimates/updateFlightEstimate'
    );
    cy.authenticateUser();
    cy.visit('/travel-cost/flight-estimates');
  });

  after(() => {
    cy.server();
    cy.route(
      'GET',
      `${baseAPI}/flightEstimate`,
      'fixture:flightEstimates/updatedFlightEstimates'
    );
    cy.authenticateUser();
    cy.visit('/travel-cost/flight-estimates');
  });

  it('should edit a flight esimate', () => {
    cy.get('.stipend-list > :nth-child(1)').should('be.visible');
    cy.get(':nth-child(1) > .travel_stipend_menu > :nth-child(1) > .fa').should('be.visible').click();
    cy.get(':nth-child(1) > .travel_stipend_menu > :nth-child(1) > .context-menu > .table__menu-list').contains('Edit');
    cy.get(':nth-child(1) > .travel_stipend_menu > :nth-child(1) > .context-menu > .table__menu-list > .edit > span')
      .should('be.visible').click();
    cy.get('.modal-title-bar').should('be.visible')
      .contains('Edit Flight Estimate');
    cy.get('.modal-content').should('be.visible');
    cy.get('.modal-content').contains('Origin');
    cy.get('.modal-content').contains('Destination');
    cy.get('.modal-content').contains('Enter Amount in Dollars ($)');
    cy.get('#cancel').should('be.visible').contains('Cancel');
    cy.get('#submit').should('be.visible').contains('Save Estimate');
    cy.get('#your-manager').click().clear().type(400);
    cy.get('#submit').click();
    cy.get('.toast-message')
      .wait(3000)
      .should('be.visible')
      .contains('Flight Estimate Successfully updated');
  });
});

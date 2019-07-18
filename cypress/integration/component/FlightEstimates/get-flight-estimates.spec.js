const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Flight Estimates display page', () => {
  before(() => {
    cy.server();
    cy.authenticateUser();
    cy.route(
      'GET',
      `${baseAPI}/flightEstimate`,
      'fixture:flightEstimates/flightEstimates'
    );
    cy.visit('/travel-cost/flight-estimates');
  });

  it('should display the flights estimates page', () => {
    cy.get('body').should('be.visible');
    cy.get('.PageHeader').should('be.visible').get('.title')
      .contains('FLIGHT ESTIMATES');
    cy.get('.stipend-list > :nth-child(1)').should('be.visible')
      .contains('North Africa to Sudan');
    cy.get(':nth-child(2) > .card_title').should('be.visible')
      .contains('France to Germany');
  })
});

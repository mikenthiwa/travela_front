const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Add Flight Estimates', () => {
  before(() => {
    cy.server();
    cy.route(
      'POST',
      `${baseAPI}/flightEstimate`,
      'fixture:flightEstimates/addFlightEstimate'
    );
    cy.authenticateUser();
    cy.visit('/travel-cost/flight-estimates');
  });

  it('should create a flight estimate successfully', () => {
    cy.get('body').should('be.visible');
    cy.get('.title').contains('FLIGHT ESTIMATES');
    cy.get('#actionButton').should('be.visible').click();
    cy.get(':nth-child(1) > .form-input > .multichoice-dropdown > .style-dropdown > #flight-input').should('be.visible').click();
    cy.get(':nth-child(1) > .form-input > .multichoice-dropdown > .multichoice-dropdown__dropdown > .multichoice-dropdown__dropdown__menu > .active')
      .should('be.visible');
    cy.get(':nth-child(1) > .form-input > .multichoice-dropdown > .multichoice-dropdown__dropdown > .multichoice-dropdown__dropdown__list')
      .should('be.visible');
    cy.get(':nth-child(1) > .form-input > .multichoice-dropdown > .multichoice-dropdown__dropdown > .multichoice-dropdown__dropdown__list > :nth-child(1)')
      .should('be.visible').contains('Aruba').click();
    cy.get(':nth-child(2) > .form-input > .multichoice-dropdown > .style-dropdown > #flight-input').should('be.visible').click();
    cy.get(':nth-child(2) > .form-input > .multichoice-dropdown > .multichoice-dropdown__dropdown > .multichoice-dropdown__dropdown__menu > .active')
      .should('be.visible');
    cy.get(':nth-child(2) > .form-input > .multichoice-dropdown > .multichoice-dropdown__dropdown > .multichoice-dropdown__dropdown__list > :nth-child(3)')
    .should('be.visible').contains('Angola').click();
    cy.get('#your-manager').type(100);
    cy.get('#submit').should('be.visible').should('not.be.disabled').click();
    cy.get('.toast-message').should('be.visible').wait(1000)
      .contains('Successfully created a new flight estimate for the given location');
  });

  it('should display add estimate modal', () => {
    cy.get('#actionButton').should('be.visible').click();
    cy.get('.modal-title-bar').contains('Add Flight Estimate');
    cy.get('.modal-content').contains('Origin');
    cy.get('.modal-content').contains('Destination');
    cy.get('.modal-content').contains('Enter Amount in Dollars ($)');
    cy.get('#cancel').should('be.visible');
    cy.get('#submit').should('be.visible').should('be.disabled');
  })
});

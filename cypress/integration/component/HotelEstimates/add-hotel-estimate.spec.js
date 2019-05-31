const baseAPI = Cypress.env('REACT_APP_API_URL');
describe('Add Estimate', () => {
  before(() => {
    cy.server();
    cy.route(
      'POST',
      `${baseAPI}/hotelEstimate`,
      'fixture:hotelEstimates/createRegionEstimate'
    );
    cy.authenticateUser();
    cy.visit('/travel-cost/hotel-estimates');
  });
  it('should add estimate successfully', () => {
    cy.get('.create-new').click();
    cy.get(':nth-child(1) > .form-input').click();
    cy.get('.show-error').contains(
      'Amount should be a positive integer and not more than 1000'
    );
    cy.get('input[name=estimate]').type('1000');
    cy.get('input[name=travelRegion]').type('West Africa');
    cy.get('#submit')
      .contains('Add Estimate')
      .should('not.be.disabled')
      .click();
    cy.authenticateUser().wait(3000);
    cy.get('.toast-message')
      .should('be.visible')
      .wait(1000)
      .contains('Successfully created a new hotel estimate');
  });
  it('should display add estimate modal', () => {
    cy.get('.document_header_group_button > div');
    cy.get('.create-new').click();
    cy.get('.modal').as('estimate-model');
    cy.get('@estimate-model').contains('Add Hotel Estimate');
    cy.get('@estimate-model').contains('Enter Amount in Dollars ($)');
    cy.get('#cancel').click();
    cy.get('.modal').should('not.be.visible');
  });
});

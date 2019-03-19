const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Home Page', () => {

  beforeEach(() => {
    cy.authenticateUser();
    cy.visit('/home');
  });
  it('tests if the skeleton loader exists in the home page', () => {
    cy.get('.rp-requests').as('home-holder');
    cy.get('@home-holder')
      .find('.getStarted')
      .should('be.visible');
    cy.get('@home-holder')
      .find('.teammates')
      .should('be.visible');
    cy.get('@home-holder')
      .find('.homeRequests')
      .should('be.visible');
  });
});


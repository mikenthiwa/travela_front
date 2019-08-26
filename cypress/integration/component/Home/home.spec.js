const base_url = Cypress.env('BASE_URL');

describe('Contents of the Homepage', () => {

  before('should set token in cookie', () => {
    cy.server();
    cy.authenticateUser();
  });

  it('should visit home page', () => {
    cy.visit('/home');
  });

  it('should have a card that displays a welcome message', () => {
    cy.get('.details p').as('paragraph');
    cy.get('@paragraph').should('have.length', 2);
    cy.get('.details p.confirm')
      .should('have.class', 'confirm')
      .and('contain', 'Upload details of your travel documents today and avoid last minute hassle.');
  });

  it('should display travelling team members card', () => {
    cy.get('.card-layout--team').should('have.length', 1);
    cy.get('.card-layout--team > p').contains('Travelling team Members');
  });

  it('should display requests card', () => {
    cy.get('.card-layout--requests').should('have.length', 1);
    cy.get('.card-layout--requests__header > p').contains('Your Requests');
  });

  it('should navigate to the travel readiness page onClick Get Started', () => {
    cy.authenticateUser();
    cy.get('.details > a').click({ force: true });
    cy.url().should('include', '/travel_readiness');
    cy.url().should('eq', base_url + '/travel_readiness');
  });

  it('should display a Passports button', () => {
    cy.get('#passportButton').contains('Passports');
  });

  it('should display a visas button', () => {
    cy.get('#visaButton').contains('Visas');
  });

  it('should display other documents button', () => {
    cy.get('#visaButton').contains('Visas');
  });

  it('should display add passport button', () => {
    cy.get('#actionButton').contains('Add passport');
  });
});

describe('Contents of the Homepage', () => {

  before('should set token in cookie', () => {
    cy.authenticateUser();
    cy.visit('/home');
  });

  it('should have a card that displays a welcome message', () => {
    cy.get('.details p')
      .as('paragraph');

    cy.get('@paragraph')
      .should('have.length', 2);

    cy.get('.details p.confirm')
      .should('have.class', 'confirm')
      .and('contain', 'Upload details of your travel documents today and avoid last minute hassle.');
  });

  it('should display appropraite message when no team member has trip scheduled', () => {
    cy.get('.centered-flex div')
      .should('have.length', 1);
  });

  it('should have a request card', () => {
    cy.get('.card-layout.card-layout--requests')
      .should('have.length', 1);
  });
  

  it('should navigate to the request page', () => {
    cy.authenticateUser();
    cy.get('.card-layout--requests__header a')
      .click();
    cy.url().should('eq', 'http://localhost:3000/requests');
  });

  it('should navigate to the travel readiness page', () => {
    cy.authenticateUser();
    cy.visit('/home');
    cy.get('.details a')
      .click();
    cy.url().should('eq', 'http://localhost:3000/travel_readiness');
  });
});

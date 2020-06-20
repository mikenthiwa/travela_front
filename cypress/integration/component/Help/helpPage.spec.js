describe('Visit Help Page', () => {
  before(() => {
    cy.authenticateUser();
    cy.visit('/help');
  });
  it('should display items on the page', () => {
    cy.get('.help-panel-header').contains('TRAVEL POLICY DOCUMENTS');
    cy.get('.rp-requests > :nth-child(1) > :nth-child(2) > :nth-child(1)').contains('Travel Intranet')
    cy.get('.rp-requests > :nth-child(1) > :nth-child(2) > :nth-child(2)').contains('Andela Policy')
  });
});

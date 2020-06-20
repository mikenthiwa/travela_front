const baseAPI = Cypress.env('REACT_APP_API_URL');
describe('Checklist Wizard', () => {
  before(() => {
    cy.server();
    cy.authenticateUser();
    cy.route(
      'GET',
      `${baseAPI}/dynamic/checklist`,
      'fixture:checklistWizard/foundChecklists'
    );
  });

  it('should visit checklist wizard page', () => {
    cy.visit('/trip-planner/checklist-wizard-interface');
  });

  it('should display the checklist header title', () => {
    cy.get('.title').contains('TRAVEL CHECKLISTS');
  });

  it('should have 10 checklists on the page', () => {
    cy.get('.checklist-card').should('have.length', 10);
  });

  it('should open the next page', () => {
    cy.get('#next-button > :nth-child(1)').click();
    cy.get('.checklist-card').should('have.length', 2);
  });

  it('should go back to the previous page', () => {
    cy.get('#previous-button > :nth-child(1)').click();
    cy.get('.checklist-card').should('have.length', 10);
  });

  it('should search for a country and display checklists', () => {
    cy.get('.input-field').type('ug');
    cy.get('.card-title').contains('poland-Uganda');
  });

});

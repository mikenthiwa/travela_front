const baseAPI = Cypress.env('REACT_APP_API_URL');
describe('Checklist Wizard', () => {
  before(() => {
    cy.server();
    cy.authenticateUser();
    cy.route(
      'GET',
      `${baseAPI}/dynamic/checklist`,
      'fixture:checklistWizard/noChecklists'
    );
  });

  it('should visit checklist wizard page', () => {
    cy.visit('/trip-planner/checklist-wizard-interface');
  });

  it('should display the checklist header title', () => {
    cy.get('.title').contains('TRAVEL CHECKLIST BUILDER');
  });
});

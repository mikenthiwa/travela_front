const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Checklist Wizard', () => {
  before(() => {
    cy.server();
    cy.authenticateUser();
  });

  it('should visit checklist wizard page', () => {
    cy.visit('/trip-planner/checklist-wizard');
  });

  it('should display the checklist header title', () => {
    cy.get('.title').contains('TRAVEL CHECKLIST BUILDER');
  });

  it('should get the scale option', () => {
    cy.get('.selected-area').get('.drop-icon').click({ force: true});
    cy.get('.select-option-container').contains('Scale(e.g. On a scale of 1-5)').click({ force: true });
  });

  it('should increment and select a scale', () => {
    cy.get('#increment').click({ force: true });
    cy.get('.scale-box').get('[tabindex="1"]').contains(2);
    cy.get('.scale-box > [tabindex="0"]').click({ force: true });
    cy.get('.blue-bg-color').should('have.css', 'background-color', 'rgb(51, 89, 219)');
  });
});

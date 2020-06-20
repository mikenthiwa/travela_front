const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Checklist Builder Dropdown Item type', () => {
  before(() => {
    cy.server();
    cy.authenticateUser();
    cy.visit('/trip-planner/checklist-wizard');
  });

  it('should include dropdown in the item type drop down', () => {
    cy.get('body').should('be.visible');
    cy.get('.item-type-container').get('.item-type-container > :nth-child(1)').contains('Item Type');
    cy.get('.item-type-container').get('.selected-area').get('.selected-placeholder')
      .contains('Select an item type');
    cy.get('.drop-icon').click({ force: true });
    cy.get('.select-option-container').contains('Dropdown');
  });

  it('should add an option to the dropdown', () => {
    cy.get('.select-option-container').contains('Dropdown').click({ force: true });
    cy.get(':nth-child(2) > :nth-child(1) > :nth-child(1) > :nth-child(1) > p').contains('Enter Option 1');
    cy.get('#option-name-input').type('Apple', { force: true })
  });

  it('should set preview document behaviour for the added option', () => {
    cy.get('.set-behaviour-btn').click({ force: true });
    cy.get('.behaviour-dropdown-container > .dropdown-container > .selected-area').click({ force: true });
    cy.get('.behaviour-dropdown-container > .dropdown-container > .select-option-container')
      .contains('Preview Document').click({ force: true });
  });

  it('should preview dropdown on the preview side with no uploaded file', () => {
    cy.get('.input').click({ force: true });
    cy.get('.dropdown > ul > li').contains('Apple').click({ force: true });
    cy.get('.react-pdf__message').contains('You have not yet uploaded any PDF file.')
  });
});

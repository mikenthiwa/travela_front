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

  it('should type in the prompt', () => {
    cy.get('#prompt-input')
      .type('Select any options that applies; Which Andela center will you love to visit?');
  });
  
  it('should select to get the input type dropdowns', () => {
    cy.get('.drop-icon').click();
    cy.contains('Checkboxes').click();
  });

  it('should display the prompt on the layout', () => {
    cy.get('.preview-prompt')
      .contains('Select any options that applies; Which Andela center will you love to visit?');
  });


  it('should add text for checkbox input type', () => {
    cy.get('#option-name-input').type('Nairobi, Kenya');
    cy.get(':nth-child(1) > .checkbox-option').contains('Nairobi, Kenya');
  });
  
  it('should add second question', () => {
    cy.get('.anoter-question-btn').click();
  });

  it('should add text for second checkbox input type', () => {
    cy.get(':nth-child(2) > :nth-child(2) > .prompt-item > #option-name-input').type('Kampala, Uganda');
    cy.get(':nth-child(2) > .checkbox-option').contains('Kampala, Uganda');
  });

  it('should add a third question', () => {
    cy.get('.anoter-question-btn').click();
  });

  it('should add text for third checkbox input type', () => {
    cy.get(':nth-child(3) > :nth-child(2) > .prompt-item > #option-name-input').type('Lagos, Nigeria');
    cy.get(':nth-child(3) > .checkbox-option > label').contains('Lagos, Nigeria');
  });

  it('should set behaviour for the checkbox options', () => {
    cy.get('.set-behaviour-btn').click();
  });

  it('should select an option from the list of behaviours', () => {
    cy.get('.behaviour-dropdown-container > .dropdown-container > .selected-area > .drop-icon').click();
    cy.contains('Skip to another question').click();
    cy.get('#numberToSkipTo').type(2);
  });

  it('should display the predefined behaviour when one of the checkboxes is clicked', () => {
    cy.get(':nth-child(1) > .checkbox-option > label').click();
  });

  it('should not display behaviour if no checkbox is checked', () => {
    cy.get(':nth-child(1) > .checkbox-option > label').click();
  });

  it('should display when a minimum of one checkbox is cliced', () => {
    cy.get(':nth-child(1) > .checkbox-option > label').click();
    cy.get(':nth-child(2) > .checkbox-option > label').click();
    cy.get(':nth-child(3) > .checkbox-option > label').click();
  });

  it('should throw an error if question does not exist yet', () => {
    cy.get('.skipQuestion').click();
    cy.get('.toast-message').contains('Question 2 does not exist yet');
  });

  it('should skip to question 2 if it exists', () => {
    cy.get('.wiz-btn').click();
    cy.get('.skipQuestion').click();
  });
});

describe('Travel Stipends Page', () => {
  before(() => {
    cy.authenticateUser();
    cy.visit('/settings/travel-stipends');
  });
  
  it('Should edit a Travel Stipend', () => {

    cy.get(':nth-child(1) > .travel_stipend_menu > :nth-child(1) > .fa')
      .click();
    
    cy.get(':nth-child(1) > .travel_stipend_menu > :nth-child(1) > .context-menu > .table__menu-list')
      .contains('Edit');
    cy.get(':nth-child(1) > .travel_stipend_menu > :nth-child(1) > .context-menu > .table__menu-list > .edit > span')
      .click();
    cy.get('.modal-title-bar')
      .should('be.visible')
      .contains('Edit Travel Stipend');
  
    cy.get(':nth-child(1) > .form-input > label')
      .contains('Location');
    cy.get(':nth-child(2) > .form-input > label')
      .contains('Enter Amount in Dollars ($)');   
  
    cy.get('#cancel')
      .should('be.visible')
      .contains('Cancel');

    cy.get('#submit')
      .should('be.disabled')
      .contains('Save Stipend');
  
    cy.get('.value')
      .click();
    cy.contains('Austin, United States')
      .click();
    cy.get('#your-manager')
      .click().clear().type('150');
    cy.get('#submit')
      .click();   
    cy.get('.toast-message')
      .wait(3000)
      .should('be.visible')
      .contains('Travel stipend successfully updated');
  });
});
  

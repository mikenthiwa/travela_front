describe('Travel Stipends Page', () => {
  before(() => {
    cy.authenticateUser();
    cy.visit('/settings/travel-stipends');
  });
  it('should display add-stipend modal', () => {
    cy.get('.action-btn').click();
    cy.get('.modal').as('stipend-model');
    cy.get('@stipend-model').contains('Add Travel Stipend');
    cy.get('@stipend-model').contains('Select Location');
    cy.get('@stipend-model').contains('Enter Amount in Dollars ($)');
  });
  it('should display validation errors', () => {
    cy.get('div.select-dropdown')
      .click()
      .get('li#choice')
      .first()
      .click();
    cy.get('input[name=stipend]')
      .wait(1000)
      .type('-1000');
    cy.get('.show-error').contains(
      'Amount should be a positive integer and not more than 100'
    );
    cy.focused().clear();
  });
  it('should add stipend successfully', () => {
    cy.get('div.select-dropdown').click();
    cy.get('ul.select-menu')
      .contains('li', 'Austin, United States')
      .as('austin');
    cy.get('@austin').click();
    cy.get('button#submit').should('be.disabled');
    cy.get('input[name=stipend]')
      .wait(1000)
      .type('1000');
    cy.get('button#submit')
      .should('be.enabled')
      .click()
      .wait(3000);
    cy.get('[aria-live="polite"][style=""] > .toast-message').contains(
      'Successfully created a new travel stipend'
    );
  });
  describe('Add Stipend that Exists', () => {
    before(() => {
      cy.authenticateUser();
      cy.visit('/settings/travel-stipends');
    });
    it('should not add a stipend that already exists', () => {
      cy.get('.action-btn').click();
      cy.get('.modal').as('stipend-model');
      cy.get('@stipend-model').contains('Add Travel Stipend');
      cy.get('@stipend-model').contains('Select Location');
      cy.get('@stipend-model').contains('Enter Amount in Dollars ($)');
      cy.get('div.select-dropdown').click();
      cy.get('ul.select-menu')
        .contains('li', 'Austin, United States')
        .as('austin');
      cy.get('@austin').click();
      cy.get('input[name=stipend]')
        .wait(1000)
        .type('1000');
      cy.get('button#submit')
        .click()
        .wait(1000);
      cy.get('.toast-message').contains(
        'A travel stipend already exists for this center'
      );
    });
  });
  describe('Delete Stipend', () => {
    before(() => {
      cy.authenticateUser();
      cy.visit('/settings/travel-stipends');
    });
    it('should delete a stipend successfully', () => {
      cy.get('.card')
        .contains('div.card', 'Austin, United States')
        .as('austin');
      cy.get('@austin')
        .find('div.travel_stipend_menu')
        .as('menu');
      cy.get('@menu')
        .find('span')
        .as('span');
      cy.get('@span')
        .find('i.fa-ellipsis-v')
        .click({ force: true })
        .wait(1000);
      cy.get('@menu')
        .find('.context-menu > .table__menu-list > .delete > span')
        .click({ force: true });
      cy.get('button#submit')
        .click()
        .wait(3000);
      cy.get('div.toast-message').contains(
        'Travel Stipend deleted successfully'
      );
    });
  });
});

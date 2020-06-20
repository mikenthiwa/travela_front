const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Travel Stipends Page', () => {
  before(() => {
    cy.authenticateUser();
    cy.visit('/travel-cost/travel-stipends');
  });
  it('should display add-stipend modal', () => {
    cy.get('.rp-requests ').as('home-page');
    cy.get('@home-page')
      .find('.title')
      .should('contain', 'TRAVEL STIPEND');
    cy.get('@home-page').find('#actionButton')
      .click({ multiple: true, force: true });
    cy.get('.modal').as('stipend-model');
    cy.get('@stipend-model').contains('Add Travel Stipend');
    cy.get('@stipend-model').contains('Type the country');
    cy.get('@stipend-model').contains('Enter Amount in Dollars ($)');
  });
  it('should display validation errors', () => {
    cy.get('input[name=stipend]')
      .wait(1000)
      .type('-1000');
    cy.get('.show-error').contains(
      'Amount should be a positive integer and not more than 100'
    );
    cy.focused().clear();
  });
  it('should add stipend successfully', () => {
    cy.get('input[name=role]').should('have.value', '').type('Rwanda');
    cy.get('button#submit').should('be.disabled');
    cy.get('input[name=stipend]')
      .wait(1000)
      .type('1000');
    cy.get('button#submit')
      .should('be.enabled')
      .click()
      .wait(3000);
    cy.get('[aria-live="polite"][style=""] > .toast-message')
      .contains(
        'Successfully created a new travel stipend'
      );
  });
});

describe('Edit travel stippend', () => {
  before(() => {
    cy.authenticateUser();
    cy.visit('/travel-cost/travel-stipends');
  });

  it('Should edit a Travel Stipend', () => {

    cy.get(':nth-child(2) > .travel_stipend_menu > :nth-child(1) > .fa')
      .click({force: true });
    cy.get(':nth-child(2) > .travel_stipend_menu > :nth-child(1) > .context-menu > .table__menu-list')
      .contains('Edit');
    cy.get(':nth-child(2) > .travel_stipend_menu > :nth-child(1) > .context-menu > .table__menu-list > .edit > span')
      .click({force: true });
    cy.get('.modal-title-bar')
      .should('be.visible')
      .contains('Edit Travel Stipend');
    cy.get(':nth-child(1) > .form-input > label')
      .contains('Location');
    cy.get(':nth-child(2) > .form-input > label')
      .contains('Enter Amount in Dollars ($)');   
    cy.get('#cancel')
      .should('be.enabled')
      .contains('Cancel');
    cy.get('#submit')
      .should('be.disabled')
      .contains('Save Stipend');
    cy.get('.value')
      .click({force: true });
    cy.contains('Rwanda')
      .click({force: true });
    cy.get('#your-manager')
      .click({force: true }).clear().type('210');
    cy.get('#submit')
      .click({force: true });   
    cy.get('.toast-message')
      .wait(3000)
      .should('be.visible')
      .contains('Travel stipend successfully updated');
  });
});

describe('Add Stipend that Exists', () => {
  before(() => {
    cy.authenticateUser();
    cy.visit('/travel-cost/travel-stipends');
  });
  it('should not add a stipend that already exists', () => {
    cy.get('.rp-requests ').as('home-page');
    cy.get('@home-page')
      .find('.title')
      .should('contain', 'TRAVEL STIPEND');
    cy.get('@home-page').find('#actionButton').click({ multiple: true, force: true });
    cy.get('.modal').as('stipend-model');
    cy.get('@stipend-model').contains('Add Travel Stipend');
    cy.get('@stipend-model').contains('Type the country');
    cy.get('@stipend-model').contains('Enter Amount in Dollars ($)');
    cy.get('input[name=role]').should('have.value', '').type('Rwanda');
    cy.get('input[name=stipend]')
      .wait(1000)
      .type('1000');
    cy.get('button#submit').should('be.disabled');
    cy.get('.error').contains(
      'A travel stipend already exists for Rwanda'
    );
  });
  it('deletes a country allocation stipend', () => {
    cy.get('.card')
      .contains('div.card', 'Rwanda')
      .as('rwanda');
    cy.get('@rwanda')
      .find('div.travel_stipend_menu')
      .as('menu');
    cy.get('@menu')
      .find('span')
      .as('span');
    cy.get('@span')
      .find('i.fa-ellipsis-v')
      .click({ multiple: true, force: true })
      .wait(1000);
    cy.get('@menu')
      .find('.context-menu > .table__menu-list > .delete > span')
      .click({ multiple: true, force: true });
    cy.get('button#submit').click({ multiple: true, force: true });
    cy.get('div.toast-message').contains('Travel Stipend deleted successfully');
  });
});

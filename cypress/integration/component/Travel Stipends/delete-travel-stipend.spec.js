const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Delete Travel Stipend', () => {
  before(() => {
    cy.authenticateUser();
    cy.server();
    cy.visit('/settings/travel-stipends').wait(3000);
  });

  it('creates a country allocation stipend', () => {
    cy.get('button.action-btn').click();
    cy.get('div.select-dropdown').click();
    cy.get('ul.select-menu')
      .contains('li', 'Austin, United States')
      .as('austin');
    cy.get('@austin').click();
    cy.get('input#your-manager').type(200);
    cy.get('button#submit')
      .click()
      .wait(3000);
    cy.get('div.toast-message').contains(
      'Successfully created a new travel stipend'
    );
  });

  it('displays the travel title', () => {
    cy.get('span.title')
      .first()
      .contains('TRAVEL STIPEND');
    cy.get('p.card_p')
      .first()
      .contains('Daily Stipend');
    cy.get('button.action-btn').contains('Add Stipend');
  });

  it('checks delete modal is properly rendered', () => {
    cy.get('i.fa-ellipsis-v')
      .first()
      .click()
      .wait(1000);
    cy.get('li.edit').contains('Edit');
    cy.get('li.delete').contains('Delete');
    cy.get('span')
      .contains('Delete')
      .click()
      .wait(2000);
    cy.get('li.edit').should('not.be.visible');
    cy.get('li.delete').should('not.be.visible');
    cy.get('div.modal-title-bar').should('be.visible');
    cy.get('div.modal-title').contains('Confirm Delete');
    cy.get('button#submit').contains('Delete');
    cy.get('.content > p').contains('Are you sure you want to delete stipend');
    cy.get('button.modal-close').click();
    cy.get('button.modal-close').should('not.be.visible');
  });

  it('deletes a country allocation stipend', () => {
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
      .click()
      .wait(1000);
    cy.get('@menu')
      .find('.context-menu > .table__menu-list > .delete > span')
      .click();
    cy.get('button#submit').click();
    cy.get('div.toast-message').contains('Travel Stipend deleted successfully');
  });
});

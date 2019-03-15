describe('Travel Reasons Page', () => {
  before(() => {
    cy.authenticateUser();
    cy.visit('/settings/travel-reason');
  });

  it('Should add a Travel Reason', () => {
    cy.get('.action-btn.btn-new-request')
      .click();

    cy.get('.modal.visible.modal--add-user')
      .should('be.visible');

    cy.get('input[name=title]')
      .type('My title');

    cy.get('textarea')
      .type('My TextArea');

    cy.get('button.bg-btn.bg-btn--active')
      .click();

    cy.get('.table__body')
      .should('have.length', 1);
  });

  it('Should delete a Travel Reason', () => {
    cy.get('i.fa.fa-ellipsis-v.on')
      .click();

    cy.get('.table__menu-list')
      .should('be.visible');

    cy.get('li.edit')
      .first()
      .click();

    cy.get('.modal.visible.modal--add-user')
      .should('be.visible');

    cy.get('input[name=title]')
      .type('New title');

    cy.get('textarea')
      .type('New TextArea');

    cy.get('button.bg-btn.bg-btn--active')
      .click();

    cy.get('.table__body')
      .should('have.length', 1);
  });

  it('Should edit a Travel Reason', () => {
    cy.get('i.fa.fa-ellipsis-v.on')
      .click();

    cy.get('.table__menu-list')
      .should('be.visible');

    cy.get('li.delete.edit')
      .first()
      .click();

    cy.get('.modal-title-bar')
      .should('be.visible')
      .and('contain', 'Delete Travel Reason');

    cy.get('.bg-btn.bg-btn--active.delete-document-button')
      .click();
  });
});

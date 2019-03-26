const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Travel Member Page', () => {
  before(() => {
    cy.server();
    cy.authenticateUser();
    cy.visit('/settings/roles/339458');
  });

  describe('Add Travel Member', () => {
    it('displays add user button', () => {
      cy.get('.action-btn').contains('Add User');
    });

    it('displays existing travel member', () => {
      cy.get('.table__rows')
        .should('be.visible')
        .contains('Travela Test');
    });

    it('should display add a travel member modal', () => {
      cy.get('.action-btn')
        .contains('Add User')
        .click();
      cy.get('.modal').should('be.visible');
      cy.get('.modal-title-bar .modal-title').contains('Add User');
      cy.get('label').contains('Andela Email Address');
    });

    it('should display error for invalid email', () => {
      cy.get('.occupationInput')
        .wait(1000)
        .type('bolton.opondo.com');
      cy.get('#submit').click();
      cy.get('.toast-message')
        .should('be.visible')
        .contains('Please provide a valid email');
    });

    it('should display error for non Andela email', () => {
      cy.get('.occupationInput')
        .clear()
        .wait(2000)
        .type('bolton.opondo@gmail.com');
      cy.get('#submit')
        .click()
        .wait(2000);
      cy.get('.toast-message')
        .should('be.visible')
        .contains('Only Andela Email address allowed');
    });

    it('should display error for non existing Andela email', () => {
      cy.get('.occupationInput')
        .clear()
        .wait(2000)
        .type('bolton@andela.com');
      cy.get('#submit')
        .click()
        .wait(2000);
      cy.get('.toast-message')
        .should('be.visible')
        .contains('Email does not exist');
    });

    it('should add a travel member and toast  success message', () => {
      cy.get('.occupationInput')
        .clear()
        .wait(2000)
        .type('bolton.opondo@andela.com');
      cy.get('#submit')
        .click()
        .wait(2000);
      cy.get('.table__rows')
        .should('be.visible')
        .contains('Bolton Opondo');
    });

    it('should display error for adding user with existing role', () => {
      cy.get('.action-btn')
        .contains('Add User')
        .click();
      cy.get('.occupationInput')
        .clear()
        .wait(2000)
        .type('bolton.opondo@andela.com');
      cy.get('#submit')
        .click()
        .wait(2000);
      cy.get('.toast-message')
        .should('be.visible')
        .contains('User already has this role');
    });
  });

  describe('Delete Travel Member', () => {
    it('should delete a user travel member role', () => {
      cy.authenticateUser();
      cy.visit('/settings/roles/339458');
      cy.get(':nth-child(1) > .table__requests__status > #deleteButton').as(
        'deleteButton'
      );
      cy.get('@deleteButton').click();
      cy.get('.modal').should('be.visible');
      cy.get('.modal-title-bar .modal-title').contains('Remove Member ?');
      cy.get('.delete-comment-modal__text').contains(
        'This action cannot be undone!'
      );
      cy.get('.delete-comment-modal__btn')
        .contains('Delete')
        .as('delete');
      cy.get('@delete')
        .click()
        .wait(2000);
      cy.get('.toast-message')
        .wait(2000)
        .should('be.visible')
        .contains('Bolton Opondo removed successfully!');
      cy.get('.table__rows')
        .contains('Bolton Opondo')
        .should('not.be.visible');
    });
  });
});

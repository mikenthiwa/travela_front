const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Super admin should be able to add and delete users on roles', () => {
  before(() => {
    cy.server();
    cy.authenticateUser();
    cy.visit('/').wait(20000);
    cy.get(`.sidebar >
        .left-sidebar >
        .left-sidebar__fixed_wrapper >
        .left-sidebar__scrollable_wrapper > ul > :nth-child(10) >
        .nav-link`).click();
    cy.get('.left-side-nav-item__dropdown-content.active > [href="/settings/roles"]')
      .click({force:true});
    cy.get(':nth-child(6) > .table__requests__destination > .table__data--link')
      .click();
  });

  it('should show a user friendly message if no item exists', () => {
    cy.get('.table__requests--empty')
      .contains('No budgetchecker at the moment');
  });

  it('should be able to add a user', () => {
    cy.get('.action-btn')
      .should('be.visible')
      .click({force:true});
    cy.get('.modal--add-user').should('be.visible');
    cy.get('.occupationInput').type('john.doe@andela.com');
    cy.get('#submit').click();
    cy.get('.toast-message')
      .contains('User has been added as a\n' + '      budgetchecker');
  });

  it('should show a list of added users', () => {
    cy.get('.title')
      .should('be.visible')
      .contains('budgetCheckers');
    cy.get('.bb-md-0').contains('Name');
    cy.get('.role-user__name').contains('John Doe');
    cy.get('.pl-sm-100d').contains('Center');
    cy.get('.pl-sm-120').contains('Lagos');
  });

  it('should not add a user with a non-andela email', () => {
    cy.get('.action-btn')
      .should('be.visible')
      .click({force:true});
    cy.get('.modal--add-user').should('be.visible');
    cy.get('.occupationInput').type('john.doe@gmail.com');
    cy.get('#submit').click().wait(1000);
    cy.get('.toast-message')
      .contains('Only Andela Email address allowed');
  });

  it('should delete a user from the list', () => {
    cy.get('.modal-close > img').click();
    cy.get('#deleteButton')
      .should('be.visible')
      .click();
    cy.get('.delete-role-modal')
      .should('be.visible');
    cy.get('.delete-comment-modal__btn').click().wait(2000);
    cy.get('.toast-message')
      .should('be.visible')
      .contains('John Doe removed successfully!');
  });

  it('should not allow a non-super admin to access the user roles page', () => {
    cy.authenticateUser();
    cy.get('.header__link').click();
    cy.get(':nth-child(1) > .table__requests__destination > .table__data--link')
      .click();
    cy.get('#deleteButton').click();
    cy.get('.delete-comment-modal__btn').click();
    cy.visit('/settings/roles').wait(2000);
    cy.location().should((location) => {
      expect(location.pathname).to.eq('/home');
    });
  });
});

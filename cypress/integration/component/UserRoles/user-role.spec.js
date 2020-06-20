describe('User Role', () => {
  before(() => {
    cy.authenticateUser();
    cy.visit('/settings/roles');
  });

  it('displays the user roles header', () => {
    cy.get('.PageHeader span.title').contains('USER ROLES');
    cy.get('.mdl-data-table').should('exist');
  });
});

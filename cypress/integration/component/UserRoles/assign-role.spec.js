describe('User Roles(assign role to user)', () => {
  beforeEach(() => {
    cy.authenticateUser();
  });

  describe('Assign user', () => {
    beforeEach(() => {
      cy.server();
      cy.visit('settings/roles/10948');
    });

    it('shows the add user form', () => {
      cy.get('.action-btn').click();
      cy.get('.modal').should('exist');
    });

    it('shows error toast if email is not an andela email', () => {
      cy.openAndFillRoleForm('hans@gmail.com');
      cy.get('.toast').should('be.visible');
      cy.get('.toast').should('contain', 'Only Andela Email address allowed');
    });

    it('shows error toast if user has already been assigned role', () => {
      cy.openAndFillRoleForm('travela-test@andela.com');
      cy.get('.toast').should('be.visible');
      cy.get('.toast').should('contain', 'User already has this role');
    });

    it('shows error toast if user email does not exist', () => {
      cy.openAndFillRoleForm('nonexistent.email@andela.com');
      cy.get('.toast').should('be.visible');
      cy.get('.toast').should('contain', 'Email does not exist');
    });

    it('shows success toast if user is successfully assigned role', () => {
      cy.openAndFillRoleForm('john.doe@andela.com');
      cy.get('.toast').should('be.visible');
      cy.get('.toast').should('contain', 'User has been added');
      cy.url().should('include', '/settings/roles/10948')
    });
  });

});

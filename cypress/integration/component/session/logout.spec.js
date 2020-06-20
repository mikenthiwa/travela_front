describe('Logout a user when token expires', () => {
  it('should set token in cookies',  () =>  {
    cy.authenticateUser();
    cy.visit('/requests');
  });

  xit('should check the url', () => {
    cy.clearCookie('jwt-token');
    cy.visit('/requests');
    cy.get('.toast-message').should('be.visible')
      .contains('Session Expired. Login to continue');
    cy.url().should('eq', 'http://localhost:3000/');
  });
});

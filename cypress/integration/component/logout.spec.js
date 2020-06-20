describe('Logout User', () => {

  it('should set token in cookie', () => {
    cy.authenticateUser();
    cy.visit('/requests').wait(3000);
  });


  it('should have a Navbar', () => {
    cy.get('header')
      .should('be.visible');
  });

  it('should click the Logout button', () => {
    cy.get('#demo-menu-lower-right')
      .click();
    cy.get('#logout').click();
  });

  it('should check the Url', () => {
    cy.url().should('eq', 'http://localhost:3000/');
    cy.get('.toast-message').should('be.visible');
  });

});


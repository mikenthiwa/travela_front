describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Load the andela logo on the Login page', () => {
    cy.get('img')
      .should('have.class', 'login-page__andela-logo')
      .should('be.visible');
  });

  it('Check if the button exist the Login page', () => {
    cy.get('button').should(
      'have.class',
      'mdl-button mdl-js-button mdl-button--raised mdl-button--colored login-page__login-btn'
    )
      .should('be.visible');
  });

  it('Load the Landing page image', () => {
    cy.get('.mdl-cell').find('img');
  });

  it('Click the Links on the Login page', () => {
    cy.get('.login-page__link')
      .find('a')
      .click( { multiple: true } );
  });

  it('Successfully logs in after 20 second delay', () => {
    cy.get('button')
      .click();
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(21000);
    cy.contains('Get Started');    
  });
});

const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Admin can search user roles', () => {
  before(() => {
    cy.authenticateUser();
    cy.server();
    cy.route('GET', /api\/v1\/user\/roles/,
      'fixture:roles/exists' ).as('userRoles');
    cy.visit('/settings/roles');
    cy.wait('@userRoles');
  });

  context('Admin can access user roles pages', ()=>{
    it('should display all existing user roles', ()=>{
      cy.contains('.title', 'USER ROLES');
      cy.get('.mdl-data-table').should('be.visible');
      cy.get('.bb-md-0').should('be.visible');
      cy.contains('#actionButton', 'Add Role');
    });
  });


  context('Navigate to Travel Team Members', ()=>{
    before(()=>{
      cy.authenticateUser();
      cy.get(':nth-child(3) > .freeze > .table__data--link').click();
      cy.server();
      cy.route('GET', /api\/v1\/user\/roles\/339458/);
      cy.visit('/settings/roles/401938');
    });
    beforeEach(()=>{
      cy.authenticateUser();
    });
    afterEach(()=>{
      cy.get('.navbar__search-size > .mdl-search > #searchForm > #search').clear();
    });
    it('should return search found', ()=>{
      cy.get('.navbar__search-size > .mdl-search > #searchForm > #search').type('benn');
      cy.get('.navbar__search-size > .mdl-search > #searchForm > #search').type('{enter}', {force: true});
      cy.get('.table__row > .freeze').should('be.visible');
      cy.get('.mdl-data-table').contains('Benny Ogidan');
    });
    it('should return search not found', ()=>{
      cy.get('.navbar__search-size > .mdl-search > #searchForm > #search').type('bennqxz');
      cy.get('.navbar__search-size > .mdl-search > #searchForm > #search').type('{enter}', {force: true});
      cy.get('.header__link').should('be.visible');
      cy.get('.title').contains('Requesters');
      cy.get('#actionButton').should('be.visible');
      cy.get('#actionButton').contains('Add User');
      cy.get('.table__row > .freeze').should('not.be.visible');
      cy.get('.table__requests--empty').should('be.visible');
      cy.get('.table__requests--empty').contains('No Record found');
    });
  });

});

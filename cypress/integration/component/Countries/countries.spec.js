const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Create a new region', () => {
  before(() => {
    cy.server();
    cy.route('GET', `${baseAPI}/regions`);
    cy.route('POST', `${baseAPI}/regions`);
    cy.authenticateUser();
    cy.visit('/settings/travel-region');
  });

  it('should open countries page when a region name is clicked', () => {
    cy.get(':nth-child(1) > .freeze > .table__data--link').click();
    cy.get('#actionButton').click();
    cy.get('label').contains('Country *');
    cy.get('.occupationInput').type('Afghanistan');
    cy.get('.add_button').click();
    cy.get('#submit').click();
    cy.get('.toast').should('be.visible');
    cy.get('.toast').should('contain', 'Countries added successfully').wait(2000);;
  });

  it('should display a  list of countries', () => {
    cy.get('.mdl-data-table').contains('Afghanistan');
  });
  
  it('should display title of country column', () => {
    cy.get('.bb-md-0').contains('Country Name');
  });

  describe('Shows validation errors', () => {
    before(() => {
      cy.server();
      cy.route('POST', `${baseAPI}/regions/1002/countries`);
      cy.authenticateUser();
      cy.visit('/settings/travel-region/1002');
    });

    it('show error message if country is already on the list to be submitted ', () => {
      cy.get('#actionButton').click();
      cy.get('.occupationInput').type('Afghanistan');
      cy.get('.add_button').click();
      cy.get('.occupationInput').type('Afghanistan');
      cy.get('.add_button').click();
      cy.get('.toast').should('be.visible');
      cy.get('.toast').should('contain', 'You have added that country already').wait(2000);
      cy.get('#cancel')
        .should('be.visible').wait(3000)
        .click();
    });

    it('show error message if the country inputted is not a valid country', () => {
      cy.get('#actionButton').click();
      cy.get('.occupationInput').type('shaghalabaghala');
      cy.get('.add_button').click();
      cy.get('.toast').should('be.visible');
      cy.get('.toast').should('contain', 'Enter a valid country from the dropdown').wait(2000);
      cy.get('#cancel')
        .should('be.visible').wait(3000)
        .click();
    });

    it('show error message if country is already existing ', () => {
      cy.get('#actionButton').click();
      cy.get('.occupationInput').type('Afghanistan');
      cy.get('.add_button').click();
      cy.get('#submit').click();
      cy.get('.toast').should('be.visible');
      cy.get('.toast').should('contain', 'Afghanistan has already been added to West Africa').wait(2000);
      cy.get('#cancel')
        .should('be.visible').wait(3000)
        .click();
    });

    it('contain disabled add button when the input is empty or with spaces alone', () => {
      cy.get('#actionButton').click();
      cy.get('.occupationInput').type('  ');
      cy.get('.disable_button').should('be.visible');
      cy.get('#cancel')
        .should('be.visible').wait(3000)
        .click();
    });

    it('should allow searching of countries', () => {
      cy.authenticateUser();
      cy.get('.navbar__search-size > .mdl-search > #searchForm > #search').clear().type('Afgha');
      cy.get('.navbar__search-size > .mdl-search > #searchForm > #search').type('{enter}', {force: true});
      cy.get('.table__row > .freeze').should('be.visible');
      cy.get('.mdl-data-table').contains('Afghanistan');
    });
  });
});

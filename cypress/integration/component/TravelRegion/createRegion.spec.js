const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Create a new region', () => {
  before(() => {
    cy.server();
    cy.route('GET', `${baseAPI}/regions`);
    cy.route('POST', `${baseAPI}/regions`);
    cy.authenticateUser();
    cy.visit('/settings/travel-region');
  });

  it('should create a new region', () => {
    cy.get('.action-btn').click();
    cy.get('[style="padding-top: 14px;"] > .form-input > label').contains(
      'Region *'
    );
    cy.get('#add-region-name').type('South Africa');
    cy.get(':nth-child(2) > .form-input > label').contains('Description *');
    cy.get('#add-region-description').type('contans Lesotho');
    cy.get('#submit').click();
    cy.get('.toast').should('be.visible');
    cy.get('.toast').should('contain', 'Region created successfully');
  });

  it('should display a  list of the existing regions', () => {
    cy.get('.mdl-data-table').contains('East Africa');
    cy.get('.mdl-data-table').contains('West Africa');
  });
  it('should display the title of the page', () => {
    cy.get('.title').contains('TRAVEL REGION');
  });

  it('should display title of region column', () => {
    cy.get('.bb-md-0').contains('Region Name');
  });

  it('should display title of description column', () => {
    cy.get('.pl-sm-100d').contains('Description');
  });

  describe('Shows error if existing  user region', () => {
    before(() => {
      cy.server();
      cy.route('POST', `${baseAPI}/regions`);
      cy.authenticateUser();
      cy.visit('/settings/travel-region');
    });

    it('show error message if region is already existing ', () => {
      cy.get('.action-btn').click();
      cy.get('#add-region-name').type('East Africa');
      cy.get('#add-region-description').type('Kenya, Uganda and Rwanda');
      cy.get('#submit').click();
      cy.get('.toast').should('be.visible');
      cy.get('.toast').should('contain', 'A travel region already exists').wait(2000);
      cy.get('#cancel').should('be.visible').click();
    });
  });
});

const baseAPI = Cypress.env('REACT_APP_API_URL');
describe('Hotel Estimate page', () => {
  describe('Fetch Estimates of regions', () => {
    before(() => {
      cy.server();
      cy.authenticateUser();
      cy.route(
        'GET',
        `${baseAPI}/hotelEstimate`,
        'fixture:hotelEstimates/regionsEstimates'
      );
      cy.visit('/travel-cost/hotel-estimates');
    });
    it('should fetch estimates of regions successfully', () => {
      cy.get('.PageHeader')
        .should('be.visible')
        .get('.title')
        .contains('HOTEL ESTIMATES');
      cy.get('.document_header_group_button > div').should('be.visible');
      cy.get('.stipend-list').should('be.visible');
      cy.get('.stipend-list > :nth-child(1) > a').contains('West Africa');
      cy.get('#visaButton').s;
    });
    it('displays regions and countries toggle buttons', () => {
      cy.get('#passportButton').should('be.visible');
      cy.get('#visaButton').should('be.visible');
    });
  });
  describe('Fetch Countries Estimates', () => {
    before(() => {
      cy.server();
      cy.authenticateUser();
      cy.route(
        'GET',
        `${baseAPI}/hotelEstimate?country=true`,
        'fixture:hotelEstimates/countriesEstimates'
      );
      cy.visit('/travel-cost/hotel-estimates');
    });
    it('should fetch estimates of countries successfully', () => {
      cy.get('.PageHeader')
        .should('be.visible')
        .get('.title')
        .contains('HOTEL ESTIMATES');
      cy.get('.document_header_group_button > div').should('be.visible');
      cy.get('#visaButton').click();
      cy.get('.stipend-list').should('be.visible');
      cy.get('.stipend-list > :nth-child(1) > a').contains('Kenya');
      cy.get('#visaButton');
    });
  });
});

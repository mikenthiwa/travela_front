const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Edit Hotel Estimates for region', () => {
  before(() => {
    cy.server();
    cy.route(
      'GET',
      `${baseAPI}/hotelEstimate`,
      'fixture:hotelEstimates/regionsEstimates'
    );
    cy.route(
      'PUT',
      `${baseAPI}/hotelEstimate/44`,
      'fixture:hotelEstimates/updateRegionEstimate'
    );
    cy.authenticateUser();
    cy.visit('/travel-cost/hotel-estimates');
  });

  after(() => {
    cy.server();
    cy.route(
      'GET',
      `${baseAPI}/hotelEstimate`,
      'fixture:hotelEstimates/editedRegionEstimates'
    );
    cy.authenticateUser();
    cy.visit('/travel-cost/hotel-estimates');
  });

  it('should edit a Hotel Estimate', () => {
    cy.get(
      ':nth-child(1) > .travel_stipend_menu > :nth-child(1) > .fa'
    ).click();
    cy.get(
      ':nth-child(1) > .travel_stipend_menu > :nth-child(1) > .context-menu > .table__menu-list > .edit > span'
    ).click();
    cy.get('.modal-title-bar')
      .should('be.visible')
      .contains('Edit Hotel Estimate');

    cy.get(':nth-child(1) > .form-input > label')
      .should('be.visible')
      .contains('Type the region');

    cy.get(':nth-child(2) > .form-input > label').contains(
      'Enter Amount in Dollars ($)'
    );

    cy.get('#submit')
      .should('be.disabled')
      .contains('Save Estimate');

    cy.get('#cancel')
      .should('be.visible')
      .contains('Cancel');

    cy.get('#your-manager')
      .click()
      .clear()
      .type('150');
    cy.get('#submit').click();

    cy.get('.toast-message')
      .wait(3000)
      .should('be.visible')
      .contains('Hotel Estimate successfully updated');
  });
});

describe('Edit Hotel Estimates for country', () => {
  before(() => {
    cy.server();
    cy.route(
      'GET',
      `${baseAPI}/hotelEstimate?country=true`,
      'fixture:hotelEstimates/countriesEstimates'
    );
    cy.route(
      'PUT',
      `${baseAPI}/hotelEstimate/45`,
      'fixture:hotelEstimates/updateCountryEstimate'
    );
    cy.authenticateUser();
    cy.visit('/travel-cost/hotel-estimates?country=true');
  });

  after(() => {
    cy.server();
    cy.route(
      'GET',
      `${baseAPI}/hotelEstimate?country=true`,
      'fixture:hotelEstimates/editedCountryEstimates'
    );
    cy.authenticateUser();
    cy.visit('/travel-cost/hotel-estimates?country=true');

    it('should display toast message and updated estimate', () => {});
  });

  it('should edit a Hotel Estimate', () => {
    cy.get(
      ':nth-child(1) > .travel_stipend_menu > :nth-child(1) > .fa'
    ).click();
    cy.get(
      ':nth-child(1) > .travel_stipend_menu > :nth-child(1) > .context-menu > .table__menu-list > .edit'
    ).click();
    cy.get('.modal-title-bar')
      .should('be.visible')
      .contains('Edit Hotel Estimate');

    cy.get(':nth-child(1) > .form-input > label')
      .should('be.visible')
      .contains('Type the country');

    cy.get(':nth-child(2) > .form-input > label').contains(
      'Enter Amount in Dollars ($)'
    );

    cy.get('#submit')
      .should('be.disabled')
      .contains('Save Estimate');

    cy.get('#cancel')
      .should('be.visible')
      .contains('Cancel');

    cy.get('#your-manager')
      .click()
      .clear()
      .type('150');
    cy.get('#submit').click();

    cy.get('.toast-message')
      .wait(3000)
      .should('be.visible')
      .contains('Hotel Estimate successfully updated');
  });
});

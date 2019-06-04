const baseAPI = Cypress.env('REACT_APP_API_URL');
describe('Delete Hotel Estimate for region', () => {
  before(() => {
    cy.server();
    cy.route(
      'GET',
      `${baseAPI}/hotelEstimate`,
      'fixture:hotelEstimates/regionsEstimates'
    );
    cy.route(
      'DELETE',
      `${baseAPI}/hotelEstimate/44`,
      'fixture:hotelEstimates/deletHotelEstimate'
    );
    cy.authenticateUser();
    cy.visit('/travel-cost/hotel-estimates');
  });

  it('should delete a Hotel Estimate', () => {
    cy.get(
      ':nth-child(1) > .travel_stipend_menu > :nth-child(1) > .fa'
    ).click();
    cy.get(
      ':nth-child(1) > .travel_stipend_menu > :nth-child(1) > .context-menu > .table__menu-list > .delete'
    ).click();

    cy.get('.modal-title')
      .should('be.visible')
      .contains('Confirm Delete');

    cy.get('.content > p')
      .should('be.visible')
      .contains('Are you sure you want to delete estimate for West Africa?');

    cy.get('#cancel')
      .should('be.visible')
      .contains('Cancel');

    cy.get('#submit')
      .should('be.visible')
      .contains('Delete')
      .click();

    cy.get('.toast-message')
      .wait(3000)
      .should('be.visible')
      .contains('Hotel Estimates deleted successfully');
  });
});

describe('Delete Hotel Estimates for country', () => {
  before(() => {
    cy.server();
    cy.route(
      'GET',
      `${baseAPI}/hotelEstimate?country=true`,
      'fixture:hotelEstimates/countriesEstimates'
    );
    cy.route(
      'DELETE',
      `${baseAPI}/hotelEstimate/45`,
      'fixture:hotelEstimates/deletHotelEstimate'
    );
    cy.authenticateUser();
    cy.visit('/travel-cost/hotel-estimates?country=true');
  });

  it('should delete a Hotel Estimate for country', () => {
    cy.get(':nth-child(1) > .travel_stipend_menu > :nth-child(1) > .fa').click(
      ''
    );
    cy.get(
      ':nth-child(1) > .travel_stipend_menu > :nth-child(1) > .context-menu > .table__menu-list > .delete > span'
    ).click();

    cy.get('.modal-title')
      .should('be.visible')
      .contains('Confirm Delete');

    cy.get('.content > p')
      .should('be.visible')
      .contains('Are you sure you want to delete estimate for Kenya?');

    cy.get('#cancel')
      .should('be.visible')
      .contains('Cancel');

    cy.get('#submit')
      .should('be.visible')
      .contains('Delete')
      .click();

    cy.get('.toast-message')
      .wait(3000)
      .should('be.visible')
      .contains('Hotel Estimates deleted successfully');
  });
});

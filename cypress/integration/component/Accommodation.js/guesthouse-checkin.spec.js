const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Residence Empty Checkin page', () => {
  before(() => {  
    cy.authenticateUser();
    cy.server();
    cy.route('GET', /api\/v1\/trips/,
      'fixture:checkin/noCheckin');
    cy.visit('/residence/checkin').wait(3000);
  });


  it('displays the residence header', () => {
    cy.get('.PageHeader span.title')
      .contains('RESIDENCE');
  });

  it('displays the past checkin\'s header', () => {
    cy.get('.past_checkin_header')
      .contains('Past Check-in\'s');
  });

  it('displays text when there are no checkins', () => {
    cy.get(':nth-child(1) > .table__container > .checkInTable__trips--empty')
      .contains('You have no check-in record yet, because you haven\'t booked a room in any of the Andela Guest Houses');
  });

  it('displays text when there are no past checkins', () => {
    cy.get(':nth-child(2) > .table__container > .checkInTable__trips--empty')
      .contains('You have no check-in record yet, because you haven\'t booked a room in any of the Andela Guest Houses');
  });
});

describe('Requester\'s checkin and checkout from one of the Andela centres', () => {
  before(() => {
    cy.authenticateUser();
    cy.server();
    cy.route('GET', /api\/v1\/trips/,
      'fixture:checkin/currentCheckin');
    cy.route('PUT', /api\/v1\/trips\/*/,
      'fixture:checkin/checkedInSuccess');
    cy.visit('/residence/checkin/');
  });
  
  it('should checkin if request is verified and request date is due and later checkout', () => {
    cy.get(':nth-child(1) > .checkInTable__data__column')
      .contains('Check-in').wait(1000)
      .should('not.be.disabled')
      .click();
    cy.get(':nth-child(1) > .checkInTable__data__column')
      .contains('Check-out');
    cy.route('PUT', /api\/v1\/trips\/*/,
      'fixture:checkin/checkedOutSuccess').wait(1000);
    cy.get(':nth-child(1) > .checkInTable__data__column')
      .contains('Check-out').click().wait(2000);
    cy.get(':nth-child(2) > .table__container > .mdl-data-table > .table__body > .checkInTable__row > .checkInTable__data__column')
      .contains('Checked-out').wait(1000);     
  });
});

describe('Previous checkins', () => {
  before(() => {
    cy.authenticateUser();
    cy.server();
    cy.route('GET', /api\/v1\/trips/,
      'fixture:checkin/previousCheckins');
    cy.visit('/residence/checkin/').wait(3000);
  });

  it('should see a list of previous check-ins to the different guest houses I have visited', () => {
    cy.get(':nth-child(2) > .table__container > .mdl-data-table > .table__body > :nth-child(1) > .checkInTable__data__column')
      .contains('Checked-out');
    cy.get(':nth-child(2) > .table__container > .mdl-data-table > .table__body > :nth-child(2) > .checkInTable__data__column')
      .contains('Checked-out');
  });
  
});

describe('Guest house checkin disabled', () => {
  before(() => {
    cy.authenticateUser();
    cy.server();
    cy.route('GET', /api\/v1\/trips/,
      'fixture:checkin/guestHouseDisabled');
    cy.visit('/residence/checkin/').wait(3000);
  });

  it('should see a disabled checkin if deparure date > current date', () => {
    cy.get(':nth-child(1) > .checkInTable__data__column')
      .contains('Check-in')
      .should('be.disabled');
  });
  
});

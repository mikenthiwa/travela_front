const userDataURL = /api\/v1\/user\/\W+/;
const  dashboardDataURL = 'api/v1/analytics?location=**';
const departmentDataURL = 'api/v1/analytics/trips/departments?filterBy=**';
const travelCalendarURL = 'api/v1/analytics/calendar?type=**';
const travelReadinessURL= 'api/v1/analytics/readiness?page=**';

describe('Dashboard navigation', () => {
  before(() => {
    cy.server();
    cy.authenticateUser();
    cy.visit('/dashboard');
  });

  it('should render Dashboard header ', () => {
    cy.get('.DashboardHeader').find('button');
    cy.get('.dashboard-mobile > .title').contains('Dashboard');
    cy.get('.DashboardHeader > .actions').find(':nth-child(1)').contains('All Locations');
    cy.get('.DashboardHeader > .actions').find(':nth-child(1)').find('img');
    cy.get('.DashboardHeader > .actions').find(':nth-child(2)').click();
    cy.get('.calender-range > .rdrDateRangePickerWrapper > .rdrDefinedRangesWrapper').wait(1000);
    cy.get('.DashboardHeader > .actions').find(':nth-child(2)').click();
    cy.get('.DashboardHeader > .actions').find(':nth-child(2)').find('img');
    cy.get('.DashboardHeader > .actions').find(':nth-child(3)').find('img');
    cy.get('#download').click();
    cy.get('.toast-message').should('be.visible').contains('Download Successful')
  });

  it('should render Total No. of Travel Requests card', () => {
    cy.get('.analytics').find(':nth-child(1)');
    cy.get('.analytics > :nth-child(1) > .analytics-card__title')
      .contains('Total No. of Travel Requests');
    cy.get(':nth-child(1) > a > .analytics-card__stats').find('img');
    cy.get(':nth-child(1) > a > .analytics-card__stats').find('h4');
  });

  it('should render Total Number of Pending Requests card', () => {
    cy.get('.analytics').find(':nth-child(2)');    
    cy.get('.analytics > :nth-child(2) > .analytics-card__title')
      .contains('Total Number of Pending Requests');
    cy.get(':nth-child(2) > a > .analytics-card__stats').find('img');
    cy.get(':nth-child(2) > a > .analytics-card__stats').find('h4');
  });

  it('should render Average Travel Duration card', () => {
    cy.get('.analytics').find(':nth-child(3)');    
    cy.get('.analytics > :nth-child(3) > .analytics-card__title')
      .contains('Average Travel Duration');
  });

  it('should render No. of People visiting card', () => {
    cy.get('.visiting-card > .analytics-card > .analytics-card__title')
      .contains('No. of People visiting');
    cy.get('.visiting-card > .analytics-card > .analytics-card__stats').find('img');
    cy.get('.visiting-card > .analytics-card > .analytics-card__stats').find('h4');
  });

  it('should render No. of People leaving card', () => {
    cy.get('.leaving-card > .analytics-card > .analytics-card__title')
      .contains('No. of People leaving');
    cy.get('.leaving-card > .analytics-card > .analytics-card__stats').find('img');
    cy.get('.leaving-card > .analytics-card > .analytics-card__stats').find('h4');
  });

  it('should render Average Travel Request Lead Time card', () => {
    cy.get('.analytics').find(':nth-child(6)');
    cy.get('.analytics > :nth-child(6) > .analytics-card__title')
      .contains('Average Travel Request Lead Time');
  });

  it('should render travel readiness card', () => {
    cy.get('.analyticsReport').find('#travel-readiness');
    cy.get('#travel-readiness').find(':nth-child(1)').contains('Travel Readiness');
    cy.get('#travel-readiness').find('.travel-readiness-toggle-button-1')
    .contains('Outflow').click();
    cy.get('#travel-readiness').find('.travel-readiness-toggle-button-0')
    .contains('Inflow').click();
    cy.get('#travel-readiness').find('#active-travel-flow-button').contains('Inflow');
    cy.get('#travel-readiness').find('#btnExportReadinessCSV')
    .contains('Export').click();
    cy.get('.toast-message').should('be.visible').contains('Download Successful');
    cy.get('#travel-readiness').find('.analyticsReport__report-header');
    
  });

  it('should render Number of Trips per Department card', () => {
    cy.get('#travel-readiness').find(':nth-child(1)');
    cy.get('.analyticsReport__header > p').contains('Number of Trips per Department');
    cy.get('#btnExportTripsPerMonth').click();
    cy.get('.toast-message').should('be.visible').contains('Download Successful');
  });

  it('should render travel calendar card', () => {
    cy.get('.calendar-header').find('.title').contains('Travel Calendar');
    cy.get('.calendar-header').find('.action-btn--calender').click();
    cy.get('.calender-range > .rdrDateRangePickerWrapper > .rdrDefinedRangesWrapper').wait(1000);
    cy.get('.calendar-header').find('.action-btn--calender').click();
    cy.get('.demo-card-wide');
  });
});

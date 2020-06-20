const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Search Bar visibility', ()=>{
  before(() => {
    cy.authenticateUser();
    cy.server();
    cy.visit('/');
  });

  context('Search Bar should be visible', ()=>{
    beforeEach(()=>{
      cy.authenticateUser();
    });
    afterEach(()=>{
      cy.get('.navbar__search-size > .mdl-search > #searchForm > #search').should('be.visible');
    });
    it('/settings/roles/401938 should have searchbar', ()=>{
      cy.visit('/settings/roles/401938');
    });
    it('/requests should have searchbar', ()=>{
      cy.visit('/requests');});
    it('/requests/my-approvals should have searchbar', ()=>{
      cy.visit('/requests/my-approvals');});
    it('/requests/budgets/ should have searchbar', ()=>{
      cy.visit('/requests/budgets/');});
    it('/requests/my-verifications should have searchbar', ()=>{
      cy.visit('/requests/my-verifications');});
  });


  context('Search Bar should not be visible', ()=>{
    beforeEach(()=>{
      cy.authenticateUser();
    });
    afterEach(()=>{
      cy.get('.navbar__search-size > .mdl-search > #searchForm > #search').should('not.be.visible');
    });
    it('/dashboard should not have searchbar', ()=>{
      cy.visit('/dashboard');
    });
    it('/home should not have searchbar', ()=>{
      cy.visit('/home');});
    it('/residence/manage should not have searchbar', ()=>{
      cy.visit('/residence/manage');});
    it('/residence/checkin should not have searchbar', ()=>{
      cy.visit('/residence/checkin');});
    it('/travel-cost/travel-stipends should not have searchbar', ()=>{
      cy.visit('/travel-cost/travel-stipends');});
    it('/travel_readiness should not have searchbar', ()=>{
      cy.visit('/travel_readiness');});
    it('trip-planner/travel-readiness should not have searchbar', ()=>{
      cy.visit('trip-planner/travel-readiness');});
    it('/settings/roles should not have searchbar', ()=>{
      cy.visit('/settings/roles');});
    it('/settings/profile should not have searchbar', ()=>{
      cy.visit('/settings/profile');});
    it('/settings/reminder-setup should not have searchbar', ()=>{
      cy.visit('/settings/reminder-setup');});
    it('/settings/travel-reason should not have searchbar', ()=>{
      cy.visit('/settings/travel-reason');});
  });
});

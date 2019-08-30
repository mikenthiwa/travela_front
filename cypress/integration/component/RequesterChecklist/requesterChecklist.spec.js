const baseAPI = Cypress.env('REACT_APP_API_URL');
const id = '4WD6f5Yal';
describe('Requester Checklists', () => {
  before(() => {
    cy.server();
    cy.authenticateUser();
    cy.route('GET', `${baseAPI}/requests/4WD6f5Yal`,
      'fixture:RequesterChecklist/approvedRequest.json');
    cy.route(
      'GET',
      `${baseAPI}/dynamic-checklists/4WD6f5Yal/submissions`,
      'fixture:RequesterChecklist/FetchSubmission1.json'
    );
  });

  it('should open the checklists of a request', () => {
    cy.visit(`/new-requests/${id}/checklists`);
  });
  it('should open the checklists of a request', () => {
    cy.server();
    cy.authenticateUser();
    cy.route(
      'POST',
      `${baseAPI}/dynamic-checklists/${id}/submissions`,
      'fixture:RequesterChecklist/FetchSubmission2.json'
    );
    cy.get('.radio-option:nth-child(1) > .radio-cell > .radio-icon > img').first().click({force: true});
  });
  it('should get the checklist submission calculator', () => {
    cy.get('.circular-calculator').find('svg').should('not.be.visible');
  });
  it('should get the checklist submission calculator percwentage', () => {
    cy.get('.circle-text').contains('0%');
  });

  it('should select an item from the dropdown menu', () => {
    cy.server();
    cy.authenticateUser();
    cy.route(
      'POST',
      `${baseAPI}/dynamic-checklists/${id}/submissions`,
      'fixture:RequesterChecklist/FetchSubmission3.json'
    );
    cy.get('.style-container').should('have.value', '');
    cy.get('.style-container input').click({force: true});
    cy.get('.dropdown > :nth-child(2) > li').click({force: true});
    cy.get('.smart-checklist-tab-buttons > :nth-child(2)').click({force: true});
  });

  it('should fill flight details page', () => {
    cy.server();
    cy.authenticateUser();
    cy.route(
      'POST',
      `${baseAPI}/dynamic-checklists/${id}/submissions`,
      'fixture:RequesterChecklist/FetchSubmission4.json'
    );
    cy.get('.ticketInput > input.flightNumber').type('Gh0123A', {force: true});
    cy.get('.ticketInput > input.airline').type('Arik Airline', {force: true});
    cy.get('.ticketInput > input.returnFlightNumber').type('Abc234543', {force: true});
    cy.get('.ticketInput > input.returnAirline').type('Virgin Airline', {force: true});
    cy.get('.ticket-upload-input-label').contains('UPLOAD TICKET').wait(2000);
    cy.get('.smart-checklist-tab-buttons > :nth-child(2)').click({force:true});
    cy.get('.modal-title-text > .modal-title').first().contains('Submit Checklist');
    cy.get('.modal >:nth-child(2) > .checklist-confirm-submission-button >:nth-child(2)').contains('SUBMIT').focused().click({force:true});
  });
  it('shuold disabled checklist after submission', () => {
    cy.server();
    cy.authenticateUser();
    cy.route(
      'POST',
      `${baseAPI}/dynamic-checklists/${id}/submissions`,
      'fixture:RequesterChecklist/FetchSubmission5.json'
    );
    cy.route(
      'GET',
      `${baseAPI}/dynamic-checklists/${id}/submissions`,
      'fixture:RequesterChecklist/FetchSubmission6.json'
    );
    cy.get('.modal-title-text > .modal-title').first().contains('Submit Checklist');
    cy.get('.modal >:nth-child(2) > .checklist-confirm-submission-button >:nth-child(2)').contains('SUBMIT').click({force:true});
  });
});

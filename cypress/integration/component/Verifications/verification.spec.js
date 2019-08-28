const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Requests', () => {
  describe('Travel admin Verification page', () => {
    before(() => {
      cy.server();
      cy.route('GET', `${baseAPI}/approvals?verified=true`,
        'fixture:requests/requests');
      cy.authenticateUser();
      cy.visit('/requests/my-verifications');
    });

    it('should go back to page two when the back button is clicked', ()=>{
      cy.server();
      cy.route('GET', `${baseAPI}/requests/*`,
        'fixture:approvals/OpenRequest');
      cy.authenticateUser();
      cy.visit('/requests/my-verifications/AWQqIucjm').wait(3000);
      cy.get('.header__link').click({multiple: true, force: true});
      cy.url().should('include', '/my-verifications');
    });

    it('displays the verifications header', () => {
      cy.get('.PageHeader span.title').contains('VERIFICATIONS');
    });

    it('displays the All button', () => {
      cy.get('button#all-button').contains('All');
    });

    it('displays the Pending Verifications button', () => {
      cy.get('#open-button').contains('Pending Verifications');
    });

    it('displays the Past Verifications button', () => {
      cy.get('#past-button').contains('Past Verifications');
    });

    it('displays the Items per page text', () => {
      cy.get('.cell-items-per-page-text').contains('Items per page');
    });

    it('displays pre-populated value of 10 on select drop down', () => {
      cy.get('.dropdown__input').contains('10');
    });

    it('displays a component that shows travel request for the admin verification', () => {
      cy.get(
        '.mdl-data-table .table__body > :nth-child(1) > :nth-child(3)'
      ).contains('Return');
    });

    it('displays pagination Previous button', () => {
      cy.get('#previous-button > :nth-child(1)').contains('Previous');
    });

    it('displays number of pages item ', () => {
      cy.get('.pagination__items .pagination__page').contains('Page');
    });

    it('displays pagination Next button', () => {
      cy.get('#next-button > :nth-child(1)').contains('Next');
    });
  });

  describe('Travel admin Single Request page', () => {
    before(() => {
      cy.server();
      cy.route('GET',`${baseAPI}/requests/*`,
        'fixture:requests/ApprovedRequest'
      );
      cy.authenticateUser();
      cy.visit('/requests/my-verifications/ysH3PCEg2');
    });

    it('displays the verifications header', () => {
      cy.get('.progress-tags').contains('REQUEST #ysH3PCEg2');
    });

    it('displays Managers, Budget and Travel label', () => {
      cy.get('.stage-container > :nth-child(1)').contains('Managers Approval');
      cy.get('.stage-container> :nth-child(2)').contains('Budget Check');
      cy.get('.stage-container> :nth-child(3)').contains('Travel Checklist Submission');
      cy.get('.stage-container> :nth-child(4)').contains('Travel Verification');
      

    });
  });
});

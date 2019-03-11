const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Approval page(Approval or rejection of request by managers)', () => {
  describe('APPROVAL OF A REQUEST', () => {
    before(() => {
      cy.server();
      cy.route('GET', `${baseAPI}/requests/*`,
        'fixture:approvals/OpenRequest');
      cy.route('PUT', `${baseAPI}/approvals/*`,
        'fixture:approvals/ApprovedRequest');
      cy.authenticateUser();
      cy.visit('/requests/my-approvals/CVEgPxX1q');
    });
  
    it('should approve a request and toast success message', () => {
      cy.get('.action-button--approve').click();
      cy.get('#approve').click();
      cy.get('.toast-message')
        .wait(3000)
        .should('be.visible')
        .contains('Request approved successfully');
    });

    it('should check existence of header', () => {
      cy.get('.header')
        .contains('REQUEST');
    });

    it('should check existence of requested by partition', () => {
      cy.get('.left-pane > :nth-child(1) > :nth-child(1)')
        .contains('Requested By');
    });

    it('should certify that approve button is now updated to approved', () => {
      cy.get('.action-button--approved').contains('approved');
    });

    it('should certify that reject button is now disabled', () => {
      cy.get('.action-button--disabled').contains('reject').should('be.disabled');
    });
  });

  describe('SHOULD POST A COMMENT', () => {
    before(() => {
      cy.server();
      cy.route('GET', `${baseAPI}/requests/*`,
        'fixture:approvals/OpenRequest');
      cy.route('PUT', `${baseAPI}/approvals/*`,
        'fixture:approvals/ApprovedRequest');
      cy.route('POST', `${baseAPI}/comments`,
        'fixture:approvals/newComment');
      cy.authenticateUser();
      cy.visit('/requests/my-approvals/CVEgPxX1q');
      
    });

    it('should type in comment box', () => {
      cy.get('.ql-editor').type('testing you');
      cy.get('#post-submit').click();
    });

    it('should certify that a comment has been posted', () => {
      cy.get(':nth-child(2) > .modal__mdl-icons > .modal__modal2 > .modal__status-update')
        .contains('testing you');
    });
  });

  describe('REJECTION OF A REQUEST', () => {
    before(() => {
      cy.server();
      cy.route('GET', `${baseAPI}/requests/*`,
        'fixture:approvals/OpenRequest');
      cy.route('PUT', `${baseAPI}/approvals/*`,
        'fixture:approvals/RejectedRequest');
      cy.authenticateUser();
      cy.visit('/requests/my-approvals/CVEgPxX1q');
    });
    
    it('should reject a request and toast success message', () => {
      cy.get('.action-button--reject').click();
      cy.get('#reject').click();
      cy.get('.toast-message')
        .wait(3000)
        .should('be.visible')
        .contains('Request rejected successfully');
    });
  });
});

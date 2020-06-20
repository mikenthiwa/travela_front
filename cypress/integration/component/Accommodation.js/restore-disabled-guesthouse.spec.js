
const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Admin can restore disabled guesthouse', () => {
  before(() => {
    cy.authenticateUser();
    cy.server();
    cy.route('GET', /api\/v1\/disabledguesthouses/,
      'fixture:checkin/disabledGuestHouse'

    ).as('disabledHouse');
    cy.visit('/residence/manage');
    cy.wait('@disabledHouse');
  });

  describe('Restore guesthouse', () => {
    before(() => {
      cy.get('button.restore-acc-btn').as('restore-button');
      cy.get('@restore-button').click();
    });

    context('Modal box on click of restore button', () => {

      it('Should display modal when the "restore button" is clicked', () => {
        cy.get('.modal')
          .as('restore-guesthouse-modal')
          .should('be.visible');
      });

      it('(Modal) Should contain title', () => {
        cy.contains('.modal-title', 'Restore');
      });

      it('(Modal) Should contain body', () => {
        cy.contains('.delete-checklist-item__disclaimer', 'Are you sure');
      });

      it('(Modal) Should have one cancel button', () => {
        cy.get('.delete-checklist-item__footer--cancel').should('have.length', 1);
      });

      it('(Modal) Should have one submit button', () => {
        cy.get('#restoreGuestHouseId').should('have.length', 1);
      });
    });

  });


  describe('When Guesthouse has been restored', () => {

    context('When restore button in modal is clicked', () => {
      before(() => {
        cy.get('#restoreGuestHouseId').as('confirm-restore');
        cy.get('@confirm-restore').click();
      });
      it('should remove restore button', () => {
        cy.get('.restore-acc-btn').should('not.exist');
      });
      it('should display success message', () => {
        cy.get('.toast-message').should('exist');
        cy.contains('.toast-message', 'successfully');
      });
    });
  })

});

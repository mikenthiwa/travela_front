describe('Pagination', () => {
  before(() => {
    cy.authenticateUser();
    cy.visit('/requests');
  })

  describe('Pagination components', () => {
    it('Displays pagination header', () => {
      cy
        .get('.cell-items-per-page')
        .contains('Items per page');
    });

    it('Displays the pagination', () => {
      cy
        .get('.pagination .pagination__items')
        .contains('of');
    });

    it('Displays previous button', () => {
      cy
        .get('.pagination__button')
        .contains('Previous');
    });

    it('Displays next button', () => {
      cy
        .get('.pagination__button')
        .contains('Next');
    });
  });
})

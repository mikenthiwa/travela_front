describe('Interactions', () => {
  beforeEach(() => {
    cy
      .authenticateUser()
      .visit('/requests')
      .get('.dropdown__input')
      .click();
  });

  describe('Page Navigation', () => {
    it('should display the next page', () => {
      cy
        .get('.pagination__button')
        .contains('Next').click()
        .url().should('include', '/requests?page=2');
    });

    it('should display the previous page', () => {
      cy
        .get('.pagination__button')
        .contains('Next').click()
        .get('.pagination__button')
        .contains('Previous').click()
        .url().should('include', '/requests');
    });
  });

  describe('Pagination limit', () => {
    it('Shows 10 requests per page', () => {
      cy
        .get('.dropdown__list__item')
        .contains('10').click()
        .get('.table__row').should('have.length', 10);
    });

    it('Shows 20 requests per page', () => {
      cy
        .get('.dropdown__list__item ')
        .contains('20').click()
        .get('.table__row').should('have.length', 20);
    });

    it('Shows 30 requests per page', () => {
      cy
        .get('.dropdown__list__item ')
        .contains('30').click()
        .get('.table__row').should('have.length', 30);
    });

  });
});

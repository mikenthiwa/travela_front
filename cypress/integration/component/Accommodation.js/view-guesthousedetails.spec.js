const baseAPI = Cypress.env('REACT_APP_API_URL');
const guestHousePageUrl = '/residence/manage';


describe('Accommodation page(view a new guest house)', () => {
  describe('Guest house details page', () => {
    beforeEach(() => {
      cy.authenticateUser();
      cy.visit(guestHousePageUrl);
    });
    it(`Should navigate back to previous page
          from guest house details page`, () => {
      cy.location().should((location) => {
        expect(location.pathname).to.eq(guestHousePageUrl);
      });
      cy
        .get(`:nth-child(1) > 
          #thisGuesthouseLink > .mdl-card__media > 
          .centre__image`)
        .click()
        .wait(5000);
      cy
        .get(`:nth-child(1) > 
          .guesthouse-detail-card__description > 
          .description-type`)
        .contains('Bed Capacity');
      cy
        .get(':nth-child(1) > .guesthouse-detail-card__value')
        .contains('1');
      cy
        .get(`:nth-child(2) > 
          .guesthouse-detail-card__description > 
          .description-type`)
        .contains('No. of rooms');
      cy
        .get(':nth-child(2) > .guesthouse-detail-card__value')
        .contains('1');
      cy
        .get(`:nth-child(3) > 
          .guesthouse-detail-card__description > 
          .description-type`)
        .contains('Vacant spaces');
      cy
        .get(':nth-child(3) > .guesthouse-detail-card__value')
        .contains('1');
      cy
        .get(`:nth-child(4) > 
          .guesthouse-detail-card__description > 
          .description-type`)
        .contains('Unavailable');
      cy
        .get(':nth-child(4) > .guesthouse-detail-card__value')
        .contains('0');

      cy.location().should((location) => {
        expect(location.pathname).include(`${guestHousePageUrl}/guest-houses`);
      });

      cy.get('.back-button')
        .click()
        .wait(3000);

      cy.location().should((location) => {
        expect(location.pathname).to.eq(guestHousePageUrl);
      });
    });
    it('Should display trip modal for timeline', () => {
      cy
        .get(`:nth-child(1) > 
          #thisGuesthouseLink > .mdl-card__media > 
          .centre__image`)
        .click()
        .wait(3000);
      cy.get('.geom-trip--outer > span').click().wait(5000);
      cy.get('.trip-booking-details__body')
        .should('be.visible');
      cy.get('.geom-trip--outer').should('be.visible');
      cy.get('.trip-booking-details__body > :nth-child(1) > :nth-child(1)')
        .contains('Status');
      cy.get('.trip-booking-details__body > :nth-child(2) > :nth-child(1)')
        .contains('Check-in');
      cy.get('.trip-booking-details__body > :nth-child(3) > :nth-child(1)')
        .contains('Check-out');
      cy.get('.trip-booking-details__body > :nth-child(4) > :nth-child(1)')
        .contains('Duration');
      cy.get('.trip-booking-details__body > :nth-child(5) > :nth-child(1)')
        .contains('Origin');
      const today = new Date();
      const checkInDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());
      const checkOutDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5);
      
      const formatDate = (date) => date.toLocaleDateString('en-GB', {
        day: 'numeric', month: 'short', year: 'numeric'
      }).replace(/ /g, ' ');

      const formattedDateCheckIn = formatDate(checkInDate);
      const formattedDateCheckOut = formatDate(checkOutDate);

      cy.get('.trip-booking-details__body > :nth-child(2) > :nth-child(2)')
        .contains(formattedDateCheckIn);
      cy.get('.trip-booking-details__body > :nth-child(3) > :nth-child(2)')
        .contains(formattedDateCheckOut);
      cy.get('.trip-booking-details__body > :nth-child(1) > :nth-child(2)')
        .contains('Booked');
      cy.get('.trip-booking-details__body > :nth-child(4) > :nth-child(2)')
        .contains('6 Days');
      cy.get(':nth-child(5) > :nth-child(2)')
        .contains('Nairobi, Kenya');
    });
  });
});

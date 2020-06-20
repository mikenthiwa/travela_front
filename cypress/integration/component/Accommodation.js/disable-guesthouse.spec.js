const baseAPI = Cypress.env('REACT_APP_API_URL');
const guestHousePageUrl = '/residence/manage';

describe('Accommodation page(disable a guest house)', () => {
  describe('Guest house details page', () => {
    before(() => {
      cy.authenticateUser();
      cy.visit(guestHousePageUrl).wait(2000);
    });
    
    it('Should be able to disable a guesthouse', () => {
      cy.server();
      cy.route('GET', /api\/v1\/guesthouses\/\d+/).as('guestHouseDetailsData');
      cy
        .get(`:nth-child(2) > #thisGuesthouseLink > 
          .mdl-card__media > .centre__image`)
        .click()
        .wait(2000);
      cy.wait('@guestHouseDetailsData').then(guestHouseData => {
        const data = guestHouseData.response.body.guestHouse;
        const rooms = data.rooms;
        const bedCountPerRoom = rooms.map(room => room.beds.length);
        const bedCount = bedCountPerRoom.reduce((totalBeds, currentBedCount) => totalBeds + currentBedCount);
        const [beds] = rooms.map(room => room.beds);
        const vacantBeds = beds.filter(bed => bed.booked === false);
        const unavailableBeds = beds.filter(bed => bed.booked === true);
        cy.location().should((location) => {
          expect(location.pathname)
            .include(`${guestHousePageUrl}/guest-houses`);
        });
        cy
          .get(`:nth-child(1) > 
            .guesthouse-detail-card__description > 
            .description-type`)
          .contains('Bed Capacity');
        cy
          .get(':nth-child(1) > .guesthouse-detail-card__value')
          .contains(bedCount);
        cy
          .get(`:nth-child(2) > 
            .guesthouse-detail-card__description > 
            .description-type`)
          .contains('No. of rooms');
        cy
          .get(':nth-child(2) > .guesthouse-detail-card__value')
          .contains(rooms.length);
        cy
          .get(`:nth-child(3) > 
            .guesthouse-detail-card__description > 
            .description-type`)
          .contains('Vacant spaces');
        cy
          .get(':nth-child(3) > .guesthouse-detail-card__value')
          .contains(vacantBeds.length);
        cy
          .get(`:nth-child(4) > 
            .guesthouse-detail-card__description > 
            .description-type`)
          .contains('Unavailable');
        cy
          .get(':nth-child(4) > .guesthouse-detail-card__value')
          .contains(unavailableBeds.length);
      });
      cy
        .get(':nth-child(1) > .edit-btn')
        .contains('Edit Guest House');
      cy
        .get('#handleOnDisableId')
        .contains('Disable Guest House');
      cy
        .get('#handleOnDisableId')
        .click()
        .wait(2000);
      cy
        .get('.modal')
        .should('be.visible');
      cy
        .get('.modal-title-bar')
        .contains('Disable Travel Team Guest House');
      cy
        .get('.delete-checklist-item__disclaimer')
        .contains('Are you sure you want to disable');
      cy
        .get('strong')
        .contains('Travel Team Guest House');

      cy
        .get('.delete-checklist-item__footer--cancel')
        .should('be.visible')
        .contains('Cancel');
      cy
        .get('#disableGuestHouseId')
        .should('be.visible')
        .contains('Disable')
        .click();
      cy
        .get('.toast-message')
        .wait(2000)
        .should('be.visible')
        .contains('Guest house has been successfully disabled');
      cy.location().should((location) => {
        expect(location.pathname)
          .include(guestHousePageUrl);
      });
      cy
        .get('.disabled-title')
        .contains('DISABLED GUESTHOUSES');
      cy.get(`.table__container > :nth-child(2) > 
        .mdl-grid > .mdl-cell`)
        .contains('Restore');
      cy
        .get('.restore-acc-btn')
        .click()
        .wait(2000);
      cy
        .get('#restoreGuestHouseId')
        .click()
        .wait(2000);
    });
  });
});


const baseAPI = Cypress.env('REACT_APP_API_URL');

const currentDate = (a = 0) => {
  let theDate = new Date();
  let theDay = theDate.getDate() + a;
  let theMonth = theDate.getMonth() + 1;
  let theYear = theDate.getFullYear();
  if (theDay < 10) {
    theDay = '0' + theDay;
  } else {
    theDay;
  }
  if (theMonth < 10) {
    theMonth = '0' + theMonth;
  } else {
    theMonth;
  }

  return theMonth + '/' + theDay + '/' + theYear;
};

describe('Admin can block a room for maintenance', () => {

  describe('Admin can view empty guesthouse page', () => {
    before(() => {
      cy.authenticateUser();
      cy.server();
      cy.route('GET', /api\/v1\/guesthouses/,
        'fixture:guestHouses/emptyGuestHouses').as('emptyGuestHouse');
      cy.visit('/residence/manage');
      cy.wait('@emptyGuestHouse');
    });
    it('should return empty guesthouse message', () => {
      cy.get('.table__requests--empty').should('be.visible');
      cy.contains('.table__requests--empty', 'No accommodation centres at the moment');
    });
  });


  describe('Admin can disable guesthouse/ change room', () => {
    before(() => {
      cy.authenticateUser();
      cy.server();
      cy.route('GET', /api\/v1\/guesthouses/,
        'fixture:guestHouses/guestHouses'
      ).as('guestHouses');
      cy.visit('/residence/manage');
      cy.wait('@guestHouses');
      cy.get('#thisGuesthouseLink').click();
      cy.route('GET', /api\/v1\/guesthouses\/10948/,
        'fixture:guestHouses/singleGuestHouse'
      ).as('guestHouse');
      cy.visit('/residence/manage/guest-houses/10948');
      cy.wait('@guestHouse');
    });

    context('Make room unvailable', () => {
      it('should show elipsis', () => {
        cy.get('.ellipsis').should('be.visible');
      });
      it('should click ellipsis', () => {
        cy.get(':nth-child(1) > .room-name > .ellipsis').click();
        cy.get(':nth-child(1) > .room-name > .ellipsis > .mark-unavailable').should('be.visible');
        cy.get(':nth-child(1) > .room-name > .ellipsis > .mark-unavailable > :nth-child(1) > .container_room_fine').as('disableCheckbox');
        cy.get('@disableCheckbox').click();
        cy.get('.modal').should('be.visible');
        cy.contains('.modal-title', 'Mark Room');
        cy.get('#maintainanceStart_date > :nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > input').as('startDate');
        cy.get('#maintainanceEnd_date > :nth-child(1) > .react-datepicker-wrapper > .react-datepicker__input-container > input').as('endDate');
        cy.get('@startDate').type(currentDate());
        cy.get('@endDate').type(currentDate(1));
        cy.get(':nth-child(3) > input').type('This reason');
        cy.get('#submit').click();
        cy.get('.toast').should('be.visible').contains('record created');
        cy.get('.maintainance-bar').should('be.visible').contains('Unavai');
      });
    });

    context('Change room', () => {
      before(() => {
        cy.get('.timeline-navigator--next').click();
      });
      it('should show notice on calendar', () => {
        cy.get(':nth-child(4) > .timeline-trip-geometry > .geom-trip--outer').as('roomDetail');
        cy.get('@roomDetail').should('be.visible');
        cy.get('@roomDetail').click();
        cy.get('.trip-booking-details').should('be.visible').contains('Travela Test');
        cy.get(':nth-child(6) > span > .trip-booking-details__button').click();
        cy.get('.select-dropdown > img').click();
        cy.get('[name=newBed] ').click();
        cy.get('div[name=newBed] > ul > li#choice:nth-last-child(2)').click();
        cy.get('.change-room-modal__input').type('Another Reason');
        cy.get('.change-room-modal__footer--save').click();
      });
    });

  });
});




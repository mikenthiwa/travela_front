const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Accommodation page(create a new guest house)', () => {
  before(() => {
    cy.authenticateUser();
    cy.visit('/residence/manage');
  });

  describe('New Guesthouse Form', () => {
    before(() => {
      cy.get('button.action-btn.btn-new-request').as('guesthouse-button');
      cy.get('@guesthouse-button').click();
    });

    it(`should display a modal when the
        	'Add Guest House' button is clicked`, () => {
      cy.get('.modal')
        .as('new-guesthouse-modal')
        .should('be.visible');
      cy.get('@new-guesthouse-modal')
        .find('form.new-guesthouse')
        .as('new-guesthouse-form')
        .should('be.visible');
      cy.get('@new-guesthouse-modal').contains('Add Guest House');
      cy.get('@new-guesthouse-modal').contains('Add Rooms');
    });

    it(`should select an image for upload
			 	when the upload button is clicked`, () => {
      cy.uploadFile('images/guesthouse.jpg', 'image/jpeg');
    });

    it(`should show a validation error if
          user leaves the guest house name input field without filling it`, () => {
      cy.get('input[name=houseName]')
        .focus()
        .blur();
      cy.get('input[name=houseName] + span').as('error-span');
      cy.get('@error-span').should('have.class', 'error');
      cy.get('@error-span').contains('This field is required');
    });

    it(`should show a validation error if
          user leaves the location name input field without filling it`, () => {
      cy.get('input[name=location]')
        .focus()
        .blur();
      cy.get('input[name=location] + span').as('error-span');
      cy.get('@error-span').should('have.class', 'error');
      cy.get('@error-span').contains('This field is required');
    });

    it(`should show a validation error if
          user leaves the room name input field without filling it`, () => {
      cy.get('input[name=roomName-0]')
        .focus()
        .blur();
      cy.get('input[name=roomName-0] + span').as('error-span');
      cy.get('@error-span').should('have.class', 'error');
      cy.get('@error-span').contains('This field is required');
    });

    it(`should disable the Save button if
        all required fields are not yet filled`, () => {
      cy.get('button.bg-btn.bg-btn--active').should('be.disabled');
    });
  });

  describe('Create New Guesthouse', () => {
    it('should throw an error if a room name duplicate is found in the guesthouse', () => {
      cy.server();
      cy.route('POST', `${baseAPI}/guesthouses`).as(
        'postGuestHouse'
      );

      cy.uploadFile('images/guesthouse.jpg', 'image/jpeg');
      cy.get('input[name=houseName]')
        .wait(2000)
        .type(Math.random().toString(36).substr(2).toUpperCase());
      cy.get('input[name=location]')
        .type('Lagos')
        .wait(5000)
        .type('{downarrow}{enter}');
      cy.get('input[name=bathRooms]')
        .clear()
        .type('2');
      cy.get('input[name=roomName-0]')
        .type('Room 1');
      cy.get('div[name=roomType-0]').wait(2000).click();
      cy.get('div[name=roomType-0] > ul > li#choice:nth-child(2)').click();
      cy.get('input[name=bedCount-0]')
        .type('4');
      cy.get('input[name=roomName-1]')
        .type('Room 1');
      cy.get('div[name=roomType-1]').wait(2000).click();
      cy.get('div[name=roomType-1] > ul > li#choice:first').click();
      cy.get('input[name=bedCount-1]')
        .type('4');
      cy.get('button#submit')
        .as('submit')
        .should('not.be.disabled')
        .click();
      cy.authenticateUser();
      cy.wait('@postGuestHouse');
      cy.get('.toast-message')
        .wait(3000)
        .should('be.visible')
        .contains('Kindly use another name, this room name already exists for this guest house')
        .wait(3000);
      cy.get('.modal-close').click();
    });

    it('should throw an error if guesthouse name already exists', () => { 
      cy.server();
      cy.route('POST', `${baseAPI}/guesthouses`).as(
        'postGuestHouse'
      );  
      cy.get('button.action-btn.btn-new-request').click();
      cy.uploadFile('images/guesthouse.jpg', 'image/jpeg');
      cy.get('input[name=houseName]')
        .wait(2000)
        .type('Guest House B');
      cy.get('input[name=location]')
        .type('Lagos')
        .wait(5000)
        .type('{downarrow}{enter}');
      cy.get('input[name=bathRooms]')
        .clear()
        .type('2');
      cy.get('input[name=roomName-0]')
        .type('Room 3');
      cy.get('div[name=roomType-0]').wait(2000).click();
      cy.get('div[name=roomType-0] > ul > li#choice:nth-child(2)').click();
      cy.get('input[name=bedCount-0]')
        .type('2');
      cy.get('input[name=roomName-1]')
        .type('Room 4');
      cy.get('div[name=roomType-1]').wait(2000).click();
      cy.get('div[name=roomType-1] > ul > li#choice:first').click();
      cy.get('input[name=bedCount-1]')
        .type('3');
      cy.get('button.bg-btn.bg-btn--active')
        .as('save')
        .should('not.be.disabled')
        .click();
      cy.authenticateUser();
      cy.wait('@postGuestHouse');
      cy.get('.toast-message')
        .wait(3000)
        .should('be.visible')
        .contains('Kindly use another name, this guesthouse name already exists')
        .wait(3000);
      cy.get('.modal-close').click();
    });

    it('should successfully create a new guesthouse', () => {
      cy.server();
      cy.route('POST', `${baseAPI}/guesthouses`).as(
        'postGuestHouse'
      );      
      cy.get('button.action-btn.btn-new-request').click();
      cy.uploadFile('images/guesthouse.jpg', 'image/jpeg');
      cy.get('input[name=houseName]')
        .wait(2000)
        .type(Math.random().toString(36).substr(2).toUpperCase());
      cy.get('input[name=location]')
        .type('Lagos')
        .wait(5000)
        .type('{downarrow}{enter}');
      cy.get('input[name=bathRooms]')
        .clear()
        .type('2');
      cy.get('input[name=roomName-0]')
        .type('Room 1');
      cy.get('div[name=roomType-0]').wait(2000).click();
      cy.get('div[name=roomType-0] > ul > li#choice:nth-child(2)').click();
      cy.get('input[name=bedCount-0]')
        .type('4');
      cy.get('input[name=roomName-1]')
        .type('Room 2');
      cy.get('div[name=roomType-1]').wait(2000).click();
      cy.get('div[name=roomType-1] > ul > li#choice:first').click();
      cy.get('input[name=bedCount-1]')
        .type('4');
      cy.get('button#submit')
        .as('submit')
        .should('not.be.disabled')
        .click();
      cy.authenticateUser();
      cy.get('.progress-bar')
        .should('be.visible');
      cy.wait('@postGuestHouse');
      cy.get('.toast-message')
        .wait(3000)
        .should('be.visible')
        .contains('Guest House added')
        .wait(2000);
    });
  });
});

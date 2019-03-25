const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Accommodation page(Edit guest house details)', () => {
  before(() => {
    cy.authenticateUser();
    cy.visit('/residence/manage');
  });
  describe(' Guesthouse details Form', () => {
    before(() => {
      cy.get('a#thisGuesthouseLink').click();
      cy.get(':nth-child(1) > .edit-btn').click();
    });

    it(`should display a prefilled modal containing existing guesthouse details`, () => {
      cy.get('.modal')
        .wait(3000)
        .should('be.visible');
      cy.get('.upload-image img.imgPre')
        .should('have.attr', 'src', 'https://res.cloudinary.com/skybound/image/upload/s--GDp7KfXp--/v1553082791/frontend_upload/image_bd6dvy.jpg')
      cy.get('.input-group > :nth-child(1) > .form-input > input')
        .should('have.value', 'Qwetu')
      cy.get(':nth-child(2) > .form-input > input')
        .should('have.value', 'Nairobi, Kenya')
      cy.get('.input-group > :nth-child(3) > .form-input > :nth-child(2) > input')
        .should('have.value', '3')
      cy.get('input[name="roomName-0"]')
        .should('have.value', 'room2')
      cy.get('div[name="roomType-0"]')
        .contains('Ensuite')
      cy.get('input[name="bedCount-0"]')
        .should('have.value', '1')
      cy.get('div[name="roomType-1"]')
        .contains('Ensuite')
      cy.get('input[name="bedCount-1"]')
        .should('have.value', '1')
      cy.get('#submit').should('be.disabled')

    });
    it(`Should only allow non-booked rooms to be deleted`, () => {
      cy.get('.cancel-button').eq(0).click();
      cy.authenticateUser().wait(3000);
      cy.get('#submit').click();
      cy.get('.toast-message')
        .wait(3000)
        .should('be.visible')
        .contains(`You cannot disable this room as it 
          is currently assigned to a travel requester, kindly 
          re-assign the travel requester to another room before disabling`)
        .wait(2000);
      cy.get('#cancel').click();
      cy.get(':nth-child(1) > .edit-btn').click();
    });
    it(`should show the user validation errors when a field is empty`, () => {
      cy.get('.add-more-room-rectangle').click();
      cy.get('input[name="roomName-2"]')
        .focus()
        .blur();
      cy.get('input[name=roomName-2] + span')
        .as('missing-roomName');
      cy.get('@missing-roomName')
        .should('have.class', 'error');
      cy.get('@missing-roomName').contains('This field is required');

    });
    it(`should allow the user to edit the guesthouse and see a success message`, () => {
      cy.uploadFile('images/newguesthouse.jpg', 'image/jpeg').wait(7000);
      cy.get('input[name="roomName-1"]')
        .clear()
        .type('roomOne');
      cy.get('input[name="roomName-2"]')
        .type('room3');
      cy.get('div[name="roomType-2"').wait(3000).click();
      cy.get('div[name="roomType-2"] > ul > li#choice:first')
        .wait(3000)
        .click();
      cy.get('input[name="bedCount-2"]')
        .type('3');
      cy.authenticateUser().wait(3000);
      cy.get('#submit')
        .should('not.be.disabled')
        .click();
      cy.authenticateUser().wait(3000);
      cy.get('.toast-message')
        .wait(3000)
        .should('be.visible')
        .contains('Guest House Updated Successfully')
        .wait(2000);
    });

  });
});

const baseAPI = Cypress.env('REACT_APP_API_URL');
const userDataURL = /api\/v1\/user\/\W+/;

describe('Requests page(create new request)', () => {
  before(() => {
    cy.authenticateUser();
    cy.server();
    cy.route('GET', userDataURL).as(
      'getUserData'
    );
    cy.visit('/requests').wait(3000);
    cy.wait('@getUserData');
    cy.get('button.action-btn.btn-new-request').as('request-button');
    cy.get('@request-button').click();
    cy.get('button#submit').as('next-button');
  });

  describe('Update Manager field with Request', () => {
  
    it('check that only manager field can be updated', () => {
      //check that all field except manager field is disabled
      cy.get('input[name=name]').should('be.disabled');
      cy.get('input[name=department').should('be.disabled');
      cy.get('button.bg-btn--active').should('be.disabled');
      cy.get('button.bg-btn--inactive').should('be.disabled');
      cy.get('input#your-role').should('be.disabled');
      cy.get('input#your-manager').should('not.be.disabled');
      cy.get('input#user-location').should('be.disabled');

      // update manager field
      cy.get('input#your-manager')
        .clear()
        .type('Travela Test');
       
      cy.get('button#submit').as('next-button');
      cy.get('@next-button').click();

      cy.server();
      cy.route('POST', `${baseAPI}/requests`).as('createRequest');
      // populate trip details fields
      cy.get('label').contains('One Way').click();
      cy.get('input[type=radio]#oneWay').should('be.checked');
      cy.get('input[name=origin-0]')
        .type('Lagos, Nigeria')
        .wait(2000)
        .type('{downarrow}{enter}');
      cy.get('input[name=destination-0]')
        .type('Kampala, Uganda')
        .wait(2000)
        .type('{downarrow}{enter}');
      cy.get('input[name=departureDate-0]').click();
      cy.get('button.react-datepicker__navigation--next').contains('Next month').click();
      cy.get('div.react-datepicker__day--mon')
        .not('.react-datepicker__day--disabled')
        .first().click();
      cy.get('div[name=reasons-0]').wait(3000).click();
      cy.get('div[name=reasons-0] > ul > li#choice:first')
        .wait(3000)
        .click();
      cy.get('div[name=bed-0]').wait(3000).click();
      cy.get('div[name=bed-0] > ul > li#choice:first')
        .wait(3000)
        .click();
      cy.get('textarea').first().type('Traveling for Bootcamp');

      // submit the form
      cy.get('button#submit')
        .as('submit')
        .should('not.be.disabled')
        .click();

      //send the request and check that manager field was updated
      cy.get('button#stipend-next').click();
      cy.get('button#submit').click();
      cy.wait('@createRequest').then(createRequest => {
        cy.get('.toast-message')
          .should('be.visible')
          .contains('Travel request created successfully. Please follow up with your line manager for approval');
        expect(createRequest.response.body.request).to.have.property('manager', 'Travela Test');
      });

      //delete the request from the list of created requests
      cy.authenticateUser();
      cy.visit('/requests').wait(3000);
      cy.get('i.fa.fa-ellipsis-v').first().click();
      cy.get('li#deleteRequest').first().click();
      cy.get('button.bg-btn.bg-btn--active').contains('Delete').click({force:true});
    });
  });
});

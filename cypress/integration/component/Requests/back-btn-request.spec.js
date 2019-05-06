const baseAPI = Cypress.env('REACT_APP_API_URL');
const userDataURL = /api\/v1\/user\/\W+/;

describe('User can create a request', () => {
  let data;
  before(() => {
    cy.authenticateUser();
    cy.server();
    cy.route('GET', userDataURL).as('getUserData');
    cy.visit('/requests').wait(3000);
    cy.wait('@getUserData').then(userData => {
      data = userData.response.body.result;
    });
    cy.get('button.action-btn.btn-new-request').as('request-button');
    cy.get('@request-button').click();
    cy.get('button#submit').as('next-button');
  });

  //Delete the request on completion
  after(() => {
    cy.authenticateUser();
    cy.server();
    cy.route('GET', userDataURL).as('getUserData');
    cy.visit('/requests').wait(3000);
    cy.wait('@getUserData').then(userData => {
      data = userData.response.body.result;
    });
    cy.get('#toggleIcon').click();
    cy.get('#deleteRequest').click();
    cy.get('.delete-checklist-item__footer > .bg-btn').click();
  });

  describe('Request form after personal details have been populated', () => {
    let allStipends, destination, calculatedSipend;
    before(() => {
      //check that populated personal details match those from the api
      cy.get('input[name=name]').should('have.value', data.fullName);
      cy.get('input[name=department').should('have.value', data.department);
      cy.get('button.bg-btn--active').contains(data.gender);
      cy.get('input#your-role').should('have.value', data.occupation);
      cy.get('input#your-manager').should('have.value', data.manager);
      cy.get('input#user-location').should('have.value', data.location);

      it('should display a next button', () => {
        cy.get('#submit').contains('Next');
      });

      // Click on 'Next to Trip Details' button
      cy.get('button#submit').as('next-button');
      cy.get('@next-button').click();
    });

    it('should display a back button', () => {
      cy.get('#back-submit').contains('Back');

      // Click on 'Back to Personal Information' button
      cy.get('#back-submit').as('back-button');
      cy.get('@back-button').click();

      // Click on 'Next to Trip Details' button
      cy.get('button#submit').as('next-button');
      cy.get('@next-button').click();
    });

    it('creates a one way trip request', () => {
      cy.server();
      cy.route('POST', `${baseAPI}/requests`).as('createrequest');
      cy.route('GET', `${baseAPI}/travelStipend`).as('getStipends');

      //populate the fields
      cy.get('label')
        .contains('One Way')
        .click();
      cy.get('input[name=origin-0]')
        .type('Nairobi')
        .wait(2000)
        .type('{downarrow}{enter}');
      cy.get('input[name=destination-0]')
        .type('Lagos')
        .wait(2000)
        .type('{downarrow}{enter}');
      cy.get('input[name=departureDate-0]').click();
      cy.get('div.react-datepicker__day--mon')
        .not('.react-datepicker__day--disabled')
        .first()
        .click();
      cy.get('div[name=reasons-0]')
        .wait(3000)
        .click();
      cy.get('div[name=reasons-0] > ul > li#choice:first')
        .wait(3000)
        .click();
      cy.get('textarea')
        .first()
        .type('Bootcamp');
      cy.get('div[name=bed-0]')
        .wait(3000)
        .click();
      cy.get('div[name=bed-0] > ul > li#choice:first')
        .wait(3000)
        .click();

      // submit the form
      cy.get('button#submit')
        .as('submit')
        .should('not.be.disabled')
        .click();

      // Click on 'Back to Trip Details' button
      cy.get('#back-submit').as('back-button');
      cy.get('@back-button').click();
    });

    it('should edit travel reason field', () => {
      cy.get('textarea')
        .first()
        .clear()
        .type('Andela Learning Community');

      // submit the form
      cy.get('button#submit')
        .as('submit')
        .should('not.be.disabled')
        .click();

      // Click on 'Next to Travel Checklist' button
      cy.get('button#stipend-next').as('stipend-next');
      cy.get('@stipend-next').click();

      // Click on 'Back to Travel Stipend' button
      cy.get('#back-submit').as('back-button');
      cy.get('@back-button').click();

      // Click on 'Next to Travel checklist' button
      cy.get('button#stipend-next').as('stipend-next');
      cy.get('@stipend-next').click();

      // submit the form
      cy.get('button#submit')
        .as('submit')
        .should('not.be.disabled')
        .click();
    });
  });
});

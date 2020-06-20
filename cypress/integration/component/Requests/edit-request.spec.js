import moment from 'moment';

const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('User editing request', () => {
  let request;
  before(() => {
    cy.authenticateUser();
    cy.visit('/requests').wait(3000);
    cy.server();
    cy.route('POST', `${baseAPI}/requests`).as(
      'createRequest'
    ); // Used to check when request is POST completed
    // Fill form data
    cy.get('button.action-btn.btn-new-request').as('request-button');
    cy.get('@request-button').click();
    cy.get('input[name=name]')
      .clear()
      .type('Mr White');
    cy.get('button[name=gender]:last').click();
    cy.get('input[name=department]').click();
    // cy.get('input[name=department] > ul > li#choice:first').click();
    cy.get('input#your-manager').click();
    cy.get('input#your-role')
      .clear()
      .type('Software developer');
    cy.get('button#submit').click();
    cy.get('input[name=origin-0]')
      .type('Kampala')
      .wait(2000)
      .type('{downarrow}{enter}').click({ force: true });
    cy.get('input[name=destination-0]')
      .type('Nairobi')
      .wait(2000)
      .type('{downarrow}{enter}');
    cy.get('input[name=departureDate-0]').click();
    cy.get('.react-datepicker__day--today + div:first')
      .as('tomorrow')
      .click();
    cy.get('input[name=arrivalDate-0]').click();
    cy.get('@tomorrow')
      .next()
      .wait(2000)
      .click();
    cy.get('div.value').click();
    cy.get('ul.select-menu--active > li > div')
      .first()
      .wait(2000)
      .click({ force: true });
    cy.get('textarea[name=otherReasons-0]')
      .type('Other Travel Reasons');
    cy.get('div[name=bed-0] > div.value').wait(2000)
      .click();
    cy.get('div[name=bed-0] > ul > li > div#choice:first')
      // .first()
      .wait(2000)
      .click({force: true});

    // click the next button
    cy.get('button#submit')
      .as('submit')
      .should('not.be.disabled')
      .click();

    // click the next button
    cy.get('button.bg-btn--active')
      .should('not.be.disabled')
      .click();

    cy.get('button#submit')
      .as('submit')
      .should('not.be.disabled')
      .click();
    cy.wait('@createRequest').then(createdRequest => {
      request = createdRequest.response.body.request;
    });
  });

  it('should display the edit modal when the edit button is clicked', () => {
    cy.authenticateUser();
    cy.visit('/requests').wait(3000);

    cy.get('.request__status--open + .menu__container:first').click();
    cy.get('.table__menu-list').should('be.visible');
    cy.get('#iconBtn').click();

    // predefined request type selected
    cy.get('input#return').should('be.checked');
  });

  it('should display errors when fields are cleared and the submit button should be disabled', () => {
    cy.authenticateUser();
    cy.visit('/requests').wait(3000);

    cy.get('.request__status--open + .menu__container:first').click();
    cy.get('.table__menu-list').should('be.visible');
    cy.get('#iconBtn').click();

    cy.get('input[name=origin-0]').wait(3000).clear();
    cy.get('input[name=destination-0]').wait(3000).clear();
    cy.get('input[name=departureDate-0]').wait(3000).clear();
    // cy.get('input[name=name]').clear();
    // cy.get('label[for=role] + div > div.value > input.occupationInput').clear();
    cy.get('#submit').should('be.disabled');
    cy.get('input[name=origin-0] ~ span.error')
      .should('be.visible')
      .contains('This field is required');
    cy.get('input[name=destination-0] ~ span.error')
      .should('be.visible')
      .contains('This field is required');
  });

  it('should allow the user to edit the request and see a success message', () => {
    cy.authenticateUser();
    cy.visit('/requests').wait(3000);

    cy.get('.request__status--open + .menu__container:first').click();
    cy.get('.table__menu-list').should('be.visible');
    cy.get('#iconBtn').click();

    // user edits the request
    cy.get('label[for=oneWay]').click();
    cy.get('input[name=destination-0]').clear();
    cy.get('input[name=origin-0]')
      .clear()
      .type('Lagos')
      .wait(3000)
      .type('{downarrow}{enter}');
    cy.get('input[name=destination-0]')
      .clear().type('Nairobi')
      .wait(3000)
      .type('{downarrow}{enter}');

    //click the next button
    cy.get('button.bg-btn--active')
      .should('not.be.disabled')
      .click();

    //Update the request
    cy.get('button#submit')
      .as('submit')
      .should('not.be.disabled')
      .click();

    // Toast success should be visible
    cy.get('.toast-success:contains("Request updated")')
      .should('be.visible');

    // confirm that the edit shows on the tabl
    cy.get('.table__body > :nth-child(1) > .pl-sm-100').contains('One-way');
    cy.get('td:nth-child(3):first').contains('Lagos');
  });

  it('should only allow one to edit an open request', () => {
    cy.authenticateUser();
    cy.visit('/requests').wait(3000);
    cy.get('.request__status--rejected + .menu__container:first').click();
    cy.get('#iconBtn').should('not.be.visible');
    cy.get('.table__menu-container.open .table__menu-list .table__menu-list-item:contains("Cancel"):first').click();

    cy.get('.request__status--approved + .menu__container:first').click();
    cy.get('#iconBtn').should('not.be.visible');
    cy.get('.table__menu-container.open .table__menu-list .table__menu-list-item:contains("Cancel"):first').click();

    cy.get('.request__status--verified + .menu__container:first').click();
    cy.get('#iconBtn').should('not.be.visible');
    cy.get('.table__menu-container.open .table__menu-list .table__menu-list-item:contains("Cancel"):first').click();
    // Delete request after the edit test
    cy.get('.request__status--open + .menu__container:first').wait(3000).click();
    cy.get('#deleteRequest').click();
    cy.get(':nth-child(1) > .table__requests__status > :nth-child(1) > .table__menu > .menu__container > :nth-child(1) > .table__menu-container > .table__menu-list > #deleteRequest > .overlay > .modal > .modal-content > .delete-checklist-item__footer > .bg-btn')
      .click();
  });

});



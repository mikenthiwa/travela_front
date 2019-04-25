import moment from 'moment';

const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Requests Page(view request details)', () => {
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
      .type('Another test user');
    cy.get('button[name=gender]:last').click();
    cy.get('input#your-manager').click();
    cy.get('input#your-role')
      .clear()
      .type('Software developer');

    cy.get('button.bg-btn--active#submit')
      .should('not.be.disabled')
      .click();

    cy.get('input[name=origin-0]')
      .type('Kigali')
      .wait(2000)
      .type('{downarrow}{enter}');
    cy.get('input[name=destination-0]')
      .type('Nairobi')
      .wait(2000)
      .type('{downarrow}{enter}');
    cy.get('input[name=departureDate-0]').click();
    cy.get('.react-datepicker__day--today')
      .as('today')
      .click();
    cy.get('input[name=arrivalDate-0]').click();
    cy.get('@today')
      .next()
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
      .wait(2000)
      .click({force: true});

    // Submit form
    cy.get('button#submit')
      .as('submit')
      .should('not.be.disabled')
      .click();

    //Click the next button
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

  it(`should open the request details when the
  requestId is clicked`, () => {
    cy.authenticateUser();
    cy.visit('/requests').wait(3000);
    cy.server();
    cy.route(`${baseAPI}/requests/${request.id}`).as(
      'getRequest'
    );
    cy.get('.table__row')
      .eq(0)
      .find('td')
      .eq(0)
      .find('.button-outline')
      .click();
    cy.get('.request-details-container')
      .should('be.visible');
  });

  it('should display details of the request', () => {
    cy.get('.request__tab-card')
      .first()
      .within((el) => {
        cy.get('.tab-title')
          .contains('Manager Approval');
        cy.get('.foot-text')
          .contains('You are currently here');
      });

    cy.get('.trip-details-pod')
      .should('be.visible');

    cy.get('.trip-details-pod > thead')
      .as('tablehead');

    cy.get('@tablehead')
      .should('be.visible')
      .contains('Flight Route');

    cy.get('@tablehead')
      .should('be.visible')
      .contains('Travel Dates');

    cy.get('@tablehead')
      .should('be.visible')
      .contains('Accommodation');

    cy.get('div.request-details-container')
      .should('be.visible');
  });

  it('displays the WSISWYG editor', () => {
    cy.get('.requestDetails__add-comment')
      .click();

    cy.get('button#post-submit')
      .should('be.disabled');
  });
});

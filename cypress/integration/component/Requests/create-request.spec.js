import RequestUtils from '../../../../src/helper/request/RequestUtils';

const baseAPI = Cypress.env('REACT_APP_API_URL');
const userDataURL = /api\/v1\/user\/\W+/;

describe('Requests page(create new request)', () => {
  let data;
  before(() => {
    cy.authenticateUser();
    cy.server();
    cy.route('GET', userDataURL).as(
      'getUserData'
    );
    cy.visit('/requests').wait(3000);
    cy.wait('@getUserData').then(userData => {
      data = userData.response.body.result;
    });
    cy.get('button.action-btn.btn-new-request').as('request-button');
    cy.get('@request-button').click();
    cy.get('button#submit').as('next-button');
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


      // Click on 'New Request' button
      cy.get('button#submit').as('next-button');
      cy.get('@next-button').click();
    });

    it('checks that the return trip is the default selected', ()=>{
      cy.get('input[type=radio]#return').should('be.checked');
    });

    it(`shows validation error for empty fields after
          user focuses and leaves the field without filling it`, () => {
      cy.get('input[name=origin-0]')
        .focus()
        .blur();
      cy.get('input[name=origin-0] + span').as('error-span');
      cy.get('@error-span').should('have.class', 'error');
      cy.get('@error-span').contains('This field is required');
    });

    it(`disables the submission button when some of
        the fields are missing`, () => {
      cy.get('button#submit').should('be.disabled');
    });

    it('creates one way trip request', ()=>{
      cy.server();
      cy.route('POST', `${baseAPI}/requests`).as('createRequest');
      cy.route('GET', `${baseAPI}/travelStipend`).as('getStipends');

      // populate the fields
      cy.get('label').contains('One Way').click();
      cy.get('input[type=radio]#oneWay').should('be.checked');
      cy.get('input[name=origin-0]')
        .type('Nairobi')
        .wait(2000)
        .type('{downarrow}{enter}');
      cy.get('input[name=destination-0]').as('destination')
        .type('Lagos')
        .wait(2000)
        .type('{downarrow}{enter}');
      cy.get('input[name=departureDate-0]').as('destination-1').click();
      cy.get('button.react-datepicker__navigation--next').contains('Next month').click();
      cy.get('div.react-datepicker__day--mon')
        .not('.react-datepicker__day--disabled')
        .first().click();
      cy .get('@destination')
        .invoke('val')
        .then(val => { destination = val; });
      cy.get('div[name=reasons-0]').wait(3000).click();
      cy.get('div[name=reasons-0] > ul > li#choice:first')
        .wait(3000)
        .click();
      cy.get('textarea').first().type('This is some text to explain the travel reason');
      cy.get('div[name=bed-0]').wait(3000).click();
      cy.get('div[name=bed-0] > ul > li#choice:first')
        .wait(3000)
        .click();

      // submit the form
      cy.get('button#submit')
        .as('submit')
        .should('not.be.disabled')
        .click();

      // check that the request details have all been populated
      cy.get('div.request__tab-card').first()
        .children('div')
        .should('have.class', 'mark');

      // Assertions for travel stipends
      cy.get('.personal-rectangle').as('stipend-card')
        .contains('Destination').should('be.visible');
      cy.get('@stipend-card').contains('SubTotal')
        .as('SubTotal').should('be.visible');
      cy.get('@stipend-card').contains('Duration')
        .as('Duration').should('be.visible');
      cy.get('@stipend-card').contains('Daily Rate')
        .as('DailyRate').should('be.visible');
      cy.get('.total-title').contains('Total')
        .as('Total').should('be.visible');

      cy.wait('@getStipends').then(stipends => {
        allStipends = stipends.response.body.stipends;
        calculatedSipend = RequestUtils.calculateSingleStipend(
          { destination },
          allStipends,
          'oneWay'
        );
        cy.get('.single-trip > :nth-child(4)')
          .contains(calculatedSipend[0].subTotal).should('be.visible');
        cy.get('.single-trip > :nth-child(3)')
          .contains(calculatedSipend[0].duration).should('be.visible');
        cy.get('.single-trip > :nth-child(2)')
          .contains(calculatedSipend[0].dailyRate).should('be.visible');
        cy.get('.single-trip > :nth-child(1)')
          .contains(calculatedSipend[0].location).should('be.visible');
        cy.get('.total-stipend')
          .contains(calculatedSipend[0].duration * calculatedSipend[0].dailyRate).should('be.visible');
      });

      //send the request
      cy.get('button#stipend-next').click();

      //View travel checklist and pending approvals
      cy.get('.travel-checklist-rectangle').as('travel-checklist').should('be.visible');
      cy.get('@travel-checklist').contains('Travel Checklist Required For This Trip').should('be.visible');
      cy.get('@travel-checklist').contains('Travel Ticket Details').should('be.visible');

      /*Passport is one of the travel chcklist items required for
      Nairobi but it is not visble since the requester's location is Nairobi*/
      cy.get('@travel-checklist').contains('Passport').should('not.be.visible');
      cy.get('.pending-approvals-rectangle').as('pending-approvals').should('be.visible');
      cy.get('@pending-approvals').contains('Pending Approvals For This Request').should('be.visible');
      cy.get('@pending-approvals').contains('Line Manager Approval').should('be.visible');
      cy.get('@pending-approvals').contains('Budget Checker Approval').should('be.visible');
      cy.get('@pending-approvals').contains('Travel readiness Verification').should('be.visible');

      // check if the stipend card has a mark
      cy.get('.request__tab > :nth-child(3)').first()
        .children('div')
        .should('have.class', 'mark');

      cy.get('button#submit').click();
      cy.wait('@createRequest').then(createdRequest => {
        cy.get('.toast-message')
          .should('be.visible')
          .contains('Travel request created successfully. Please follow up with your line manager for approval');
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




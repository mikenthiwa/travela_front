import RequestUtils from '../../../../src/helper/request/RequestUtils';

const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Should create multiple trips', () => {
  let allStipends,calculatedSipend;
  let firstDestination, secondDestination, fourthDestination;
  let firstDeparture, secondDeparture, thirdDeparture, fourthDepature;
  let firstReturnDate, secondReturnDate;

  before(() => {
    cy.authenticateUser();
    cy.visit('/requests').wait(3000);
    cy.get('button.action-btn.btn-new-request')
      .click();
  });

  it(`should be displayed in a view with user information
        	'New Request' button is clicked`, () => {
    cy.get('.new-request_title')
      .should('be.visible')
      .contains('CREATE A NEW TRAVEL REQUEST');
    cy.get('.new-request')
      .find('button#submit')
      .click();
    cy.get(':nth-child(3) > li > label')
      .click();
    cy.get('.trip__tab-body')
      .contains('Trip 2');
    cy.get('input[name=origin-0]')
      .type('Nairobi')
      .wait(2000)
      .type('{downarrow}{enter}');
    cy.get('input[name=destination-0]').as('destination-0')
      .type('Lagos')
      .wait(2000)
      .type('{downarrow}{enter}');
    cy.get('@destination-0')
      .invoke('val')
      .then(val => { firstDestination = val; });
    cy.get('input[name=departureDate-0]').as('firstDepatureDate').click();
    cy.get('.react-datepicker__day--today').click();
    cy.get('@firstDepatureDate')
      .invoke('val')
      .then(val => { firstDeparture = val; });
    cy.get('input[name=arrivalDate-0]').as('firstReturnDate').click();
    cy.get('.react-datepicker__day--today + div:first').wait(2000).click();
    cy.get('@firstReturnDate')
      .invoke('val')
      .then(val => { firstReturnDate = val; });
    cy.get('div[name=reasons-0]').wait(3000).click();
    cy.get('div[name=reasons-0] > ul > li#choice:first')
      .wait(2000)
      .click();
    cy.get('div[name=bed-0]').wait(2000).click();
    cy.get('div[name=bed-0] > ul > li#choice:first')
      .wait(2000)
      .click();
    cy.get('textarea').first().type('Boot Camp');
    cy.get('input[name=origin-1]')
      .should('have.value', 'Lagos, Nigeria');
    cy.get('input[name=destination-1]').as('destination-1')
      .type('Kampala')
      .wait(2000)
      .type('{downarrow}{enter}');
    cy.get('@destination-1')
      .invoke('val')
      .then(val => { secondDestination = val; });
    cy.get('input[name=arrivalDate-0]').invoke('val').then((val) => {
      const nextDepartureDate0 = val;
      cy.get('input[name=departureDate-1]').invoke('val').then((val) => {
        const departureDate1 = val;
        secondDeparture = val;
        expect(departureDate1).to.eq(nextDepartureDate0);
      });
    });
    cy.get('input[name=departureDate-1]').invoke('val').then((val) => {
      secondDeparture = val;
    });
    cy.get('div[name=reasons-1]').wait(3000).click();
    cy.get('div[name=reasons-1] > ul > li#choice:first')
      .wait(2000)
      .click();
    cy.get('#trip1 > .rectangle > .style-details > .other__reason > .form-input > .textarea-box')
      .type('Boot Camp');
  });

  it('Add third trip', () => {
    cy.get('button.another-trip').click();
    cy.get('input[name=destination-2]').as('destination-2')
      .type('Kigali')
      .wait(2000)
      .type('{downarrow}{enter}');
    cy.get('input[name=arrivalDate-1]').as('secondReturnDate')
      .should('be.visible')
      .click();
    cy.get('.react-datepicker__navigation')
      .click();
    cy.get(':nth-child(3) > .react-datepicker__day--tue')
      .wait(2000).click();
    cy.get('@secondReturnDate')
      .invoke('val')
      .then(val => { secondReturnDate = val; });
    cy.get('div[name=bed-1]').wait(2000).click();
    cy.get('div[name=bed-1] > ul > li#choice:first')
      .wait(2000)
      .click();
    cy.get('input[name=arrivalDate-1]').invoke('val').then((val) => {
      const nextDepartureDate1 = val;
      cy.get('input[name=departureDate-2]').invoke('val').then((val) => {
        const departureDate2 = val;
        expect(departureDate2).to.eq(nextDepartureDate1);
      });
    });
    cy.get('input[name=departureDate-2]').invoke('val').then((val) => {
      thirdDeparture = val;
      cy.log(thirdDeparture);
    });
    cy.get('div[name=reasons-2]').wait(3000).click();
    cy.get('div[name=reasons-2] > ul > li#choice:first')
      .wait(2000)
      .click();
    cy.get('#trip2 > .rectangle > .style-details > .other__reason > .form-input > .textarea-box')
      .type('Partner Engagement');
  });

  it('Add fourth trip', () => {
    cy.get('button.another-trip').click();
    cy.get('input[name=destination-3]').as('destination-3')
      .type('Nairobi')
      .wait(2000)
      .type('{downarrow}{enter}');
    cy.get('@destination-3')
      .invoke('val')
      .then(val => { fourthDestination = val; });
    cy.get('input[name=arrivalDate-2]').as('thirdReturnDate')
      .should('be.visible')
      .click();
    cy.get('.react-datepicker__navigation')
      .click();
    cy.get(':nth-child(4) > .react-datepicker__day--mon')
      .wait(2000).click();
    cy.get('div[name=bed-2]').wait(2000).click();
    cy.get('div[name=bed-2] > ul > li#choice:first')
      .wait(2000)
      .click();
    cy.get('input[name=arrivalDate-2]').invoke('val').then((val) => {
      const nextDepartureDate2 = val;
      cy.get('input[name=departureDate-3]').invoke('val').then((val) => {
        const departureDate3 = val;
        fourthDepature = val;
        expect(departureDate3).to.eq(nextDepartureDate2);
      });
    });

    cy.get('div[name=reasons-3]').wait(3000).click();
    cy.get('div[name=reasons-3] > ul > li#choice:first')
      .wait(2000)
      .click();
    cy.get('div[name=bed-3]').wait(2000).click();
    cy.get('div[name=bed-3] > ul > li#choice:first')
      .wait(2000)
      .click();
    cy.get('#trip3 > .rectangle > .style-details > .other__reason > .form-input > .textarea-box')
      .type('Partner Engagement');
  });

  it('Delete second last trip', () => {
    cy.get('.trip__tab-body')
      .find('#trip3')
      .should('be.visible');
    cy.get('#trip2 > .delete-icon > .addsvg')
      .click()
      .wait(4000);
    cy.get('.trip__tab-body')
      .find('#trip3')
      .should('not.be.visible');
  });

  it('Submit created trip', () => {
    cy.server();
    cy.route('GET', `${baseAPI}/travelStipend`).as('getStipends');
    cy.get('button#submit')
      .click();

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
      calculatedSipend = RequestUtils.getAllTripsStipend([
        { destination: firstDestination,
          departureDate: firstDeparture,
          returnDate: firstReturnDate },
        { destination: secondDestination,
          departureDate: secondDeparture,
          returnDate: secondReturnDate },
        { destination: fourthDestination,
          departureDate: fourthDepature,
          returnDate: secondReturnDate },
      ],
      allStipends
      );
      // First table row test
      cy.get('.false > :nth-child(2) > :nth-child(4)')
        .contains(calculatedSipend.stipendSubTotals[0].subTotal).should('be.visible');
      cy.get('.false > :nth-child(2) > :nth-child(3)')
        .contains(calculatedSipend.stipendSubTotals[0].duration).should('be.visible');
      cy.get('.false > :nth-child(2) > :nth-child(2)')
        .contains(calculatedSipend.stipendSubTotals[0].dailyRate).should('be.visible');
      cy.get('.false > :nth-child(2) > :nth-child(1)')
        .contains(calculatedSipend.stipendSubTotals[0].location).should('be.visible');

      // Second table row test
      cy.get('.false > :nth-child(3) > :nth-child(4)')
        .contains(calculatedSipend.stipendSubTotals[1].subTotal).should('be.visible');
      cy.get('.false > :nth-child(3) > :nth-child(3)')
        .contains(calculatedSipend.stipendSubTotals[1].duration).should('be.visible');
      cy.get('.false > :nth-child(3) > :nth-child(2)')
        .contains(calculatedSipend.stipendSubTotals[1].dailyRate).should('be.visible');
      cy.get('.false > :nth-child(3) > :nth-child(1)')
        .contains(calculatedSipend.stipendSubTotals[1].location).should('be.visible');

      // Third table row test
      cy.get('.false > :nth-child(4) > :nth-child(4)')
        .contains(calculatedSipend.stipendSubTotals[2].subTotal).should('be.visible');
      cy.get('.false > :nth-child(4) > :nth-child(3)')
        .contains(calculatedSipend.stipendSubTotals[2].duration).should('be.visible');
      cy.get('.false > :nth-child(4) > :nth-child(2)')
        .contains(calculatedSipend.stipendSubTotals[2].dailyRate).should('be.visible');
      cy.get('.false > :nth-child(4) > :nth-child(1)')
        .contains(calculatedSipend.stipendSubTotals[2].location).should('be.visible');

      cy.get('.total-stipend')
        .contains(calculatedSipend.totalStipend).should('be.visible');
    });

    cy.get('#stipend-next')
      .click();

    //View travel checklist and pending approvals
    cy.get('.travel-checklist-rectangle').as('travel-checklist').should('be.visible');
    cy.get('@travel-checklist').contains('Travel Checklist Required For This Trip').should('be.visible');
    cy.get('@travel-checklist').contains('Travel Ticket Details').should('be.visible');
    cy.get('.pending-approvals-rectangle').as('pending-approvals').should('be.visible');
    cy.get('@pending-approvals').contains('Pending Approvals For This Request').should('be.visible');
    cy.get('@pending-approvals').contains('Line Manager Approval').should('be.visible');
    cy.get('@pending-approvals').contains('Budget Checker Approval').should('be.visible');
    cy.get('@pending-approvals').contains('Travel readiness Verification').should('be.visible');
    // check if the stipend card has a mark
    cy.get('.request__tab > :nth-child(3)').first()
      .children('div')
      .should('have.class', 'mark');

    cy.get('#submit')
      .click();
    cy.authenticateUser();
    cy.get('.toast-message')
      .wait(3000)
      .should('be.visible')
      .contains('Travel request created successfully. Please follow up with your line manager for approval');
    cy.get(':nth-child(1) > .table__requests__status > :nth-child(1) > .table__menu > .menu__container > :nth-child(1) > #toggleIcon')
      .click();
    cy.get(':nth-child(1) > .table__requests__status > :nth-child(1) > .table__menu > .menu__container > :nth-child(1) > .table__menu-container > .table__menu-list > #deleteRequest')
      .click();
    cy.get('.delete-checklist-item__footer > .bg-btn').contains('Delete').click({force:true});
  });
});

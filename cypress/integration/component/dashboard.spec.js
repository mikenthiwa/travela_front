const userDataURL = /api\/v1\/user\/\W+/;
const  dashboardDataURL = 'api/v1/analytics?location=**';
const departmentDataURL = 'api/v1/analytics/trips/departments?filterBy=**';
const travelCalendarURL = 'api/v1/analytics/calendar?type=**';
const travelReadinessURL= 'api/v1/analytics/readiness?page=**';

describe('Dashboard navigation', () => {
  let location;
  let newData;
  let deptData;
  let calendarDetails;
  let travelReadinessDetails;

  before(() => {
    cy.server();
    cy.authenticateUser();

    //create a request for today
    cy.visit('/requests').wait(3000);
    cy.get('button.action-btn.btn-new-request').as('request-button');
    cy.get('@request-button').click();
    cy.get('button#submit').as('next-button');
    cy.get('@next-button').click();
    cy.get('label').contains('Return').click();
    cy.get('input[name=origin-0]')
      .type('Nairobi')
      .wait(2000)
      .type('{downarrow}{enter}');
    cy.get('input[name=destination-0]')
      .type('Kampala')
      .wait(2000)
      .type('{downarrow}{enter}');
    cy.get('input[name=departureDate-0]').click();
    cy.get('div.react-datepicker__day--today').click();
    cy.get('input[name=arrivalDate-0]').click();
    cy.get('div.react-datepicker__day--today').next().click();
    cy.get('div[name=reasons-0]').wait(3000).click();
    cy.get('div[name=reasons-0] > ul > li#choice:first')
      .wait(3000)
      .click();
    cy.get('div[name=bed-0]').wait(3000).click();
    cy.get('div[name=bed-0] > ul > li#choice:first')
      .wait(3000)
      .click();
    cy.get('textarea').first().type('This is some text to explain the travel reason');
    cy.get('button#submit')
      .as('submit')
      .should('not.be.disabled')
      .click();
    cy.get('button#stipend-next').click();
    cy.get('button#submit').click();

    //start testing dashboard
    cy.route('GET', userDataURL).as(
      'getUserData'
    );
    cy.route('GET', travelCalendarURL).as('calendarDetails');
    cy.visit('/dashboard').wait(3000);
    cy.wait('@getUserData').then(userData => {
      location = userData.response.body.result.location;
      localStorage.setItem('location', location);
    }).wait(3000);
    cy.wait('@calendarDetails').then(calendarData=>{
      calendarDetails = calendarData.response.body.data;
    });

  });

  it('contains all the required components', () => {
    //check all the components are rendered
    cy.get('h3.analytics-card__title')
      .contains('Total No. of Travel Requests');
    cy.get('h3.analytics-card__title')
      .contains('Total Number of Pending Requests');
    cy.get('h3.analytics-card__title')
      .contains('Average Travel Duration');
    cy.get('h3.analytics-card__title')
      .contains(`No. of People visiting ${location} Center`);
    cy.get('h3.analytics-card__title')
      .contains(`No. of People leaving ${location} Center`);
    cy.get('div.analyticsReport__card')
      .contains('Number of Trips per Department');
    cy.get('div.analyticsReport__card')
      .contains('Travel Readiness');
    cy.get('div.calendar-header')
      .contains('Travel Calendar');

  });

  it('downloads .CSV files when download is clicked', () => {
    //click the download button to download files
    cy.get('button#download').as('download-button');
    cy.get('@download-button').click();
    cy.get('.toast-message')
      .should('be.visible')
      .contains('Download Successful')
      .wait(3000);
  });


  it('can set filter for dashboard data', () => {
    //filter the dashboard and set new data
    cy.server();
    cy.get('button.action-btn')
      .eq(1)
      .click()
      .wait(3000);
    cy.get('.calender-range')
      .should('be.visible');
    cy.get('button.rdrDayToday').first().click();
    cy.route('GET', dashboardDataURL).as('newDashboardData');
    cy.route('GET', departmentDataURL).as('departmentData');
    cy.get('button.rdrDayToday').next().first().click();
    cy.wait('@newDashboardData').then(newDashboardData => {
      newData = newDashboardData.response.body.data;
    });
    cy.wait('@departmentData').then(departmentData => {
      deptData = departmentData.response.body.data;
    }).wait(4000);
  });

  it('displays correct data as fetched from the server', () => {
    //check data in the cards to match that from server
    cy.get('.analytics-card__stat').eq(0).contains(newData.totalRequests);
    cy.get('.analytics-card__stat').eq(1).contains(newData.pendingRequests);
    cy.get('.analytics-card__stat').eq(3).contains(newData.peopleLeaving);
    cy.get('.analytics-card__stat').eq(2).contains(newData.peopleVisiting);
    cy.get('.analyticsReport__report-details').contains(deptData[0].label);
  });

  it('loads the travel calendar with correct data from the server',  ()=>{
    //ensure travel calendar can toggle between show details and hide details
    cy.server();
    localStorage.setItem('location', location);
    cy.get('button.action-btn--calender').click();
    cy.route('GET', travelCalendarURL).as('calendarDetails');
    cy.get('button.rdrStaticRange').eq(10).click().wait(3000);
    cy.wait('@calendarDetails').then(calendarData=>{
      calendarDetails = calendarData.response.body.data;
      cy.get('button.toggle-btn').click();
      cy.get('div.flight').should('not.exist');
      cy.get('button.toggle-btn').click();
      cy.get('div.flight').contains(calendarDetails[0].flight.departure.airline);
    });
  });

  it('can switch content between inflow and outflow', ()=>{
    //check that travel readiness card toggles with correct data between inflow and outflow
    cy.server();
    //change the dashboard filter
    cy.get('button.action-btn')
      .eq(1)
      .click()
      .wait(3000);
    cy.get('button.rdrStaticRange').contains('This Month').first().click();
    cy.route('GET', travelReadinessURL).as('travelReadiness');
    cy.get('button.travel-readiness-toggle-button-1').click({force:true});
    cy.wait('@travelReadiness').then(travelReadinessData=>{
      travelReadinessDetails = travelReadinessData.response.body;
      cy.get('div.analyticsReport__report-details').contains(travelReadinessDetails.readiness[0].request.name);
    });

    //delete the request from the list of created requests
    cy.authenticateUser();
    cy.visit('/requests').wait(3000);
    cy.get('i.fa.fa-ellipsis-v').first().click();
    cy.get('li#deleteRequest').first().click();
    cy.get('button.bg-btn.bg-btn--active').contains('Delete').click();
  });

});




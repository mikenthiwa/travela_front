const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('WELCOME PAGE', () => {

  beforeEach(() => {
    cy.authenticateUser(); //Authenticate a user on login
    cy.visit('/welcome-page');// visit welcome page on first login
    
  });
  it('tests if the skeleton loader exists in the welcome page', () => {
    cy.get('.rp-requests').as('home-holder');
    cy.get('@home-holder')
      .find('.heading') // check if the title exist on welcome page
      .should('contain', 'Welcome to Travela');
    cy.get('@home-holder')
      .find('img')      // check if the welcome imgage exist on welcome page
      .should('have.value', '');
    cy.get('@home-holder')
      .find('.message')  // check if the welcome message exist on welcome page
      .should('have.value', '');
    cy.get('@home-holder')
      .find('button')  // check if the nexct button exist on welcome page
      .click({ multiple: true, force: true });          // onClick the Get started button, redirect to Information page
    cy.get('.rp-requests').as('Personal-Information-page');
    cy.get('@Personal-Information-page')
      .find('.width-911')   // check if the Information page exist 
      .should('have.value', '');
    cy.get('@Personal-Information-page')
      .find('.request__tab-card-onboarding')  // check if the changing tab exist on Information page
      .should('have.value', '');
    cy.get('@Personal-Information-page')
      .find('.tab-logo-onboarding')        // check if the changing tab title exist on Information page
      .should('have.value', '');
    cy.get('@Personal-Information-page')
      .find('.distance-line')             // check if the horizontal line exist on Information page
      .should('have.value', '');
    cy.get('@Personal-Information-page')
      .find('.tab-title')
      .should('have.value', '');
    cy.get('@Personal-Information-page')
      .find('form')                       // check if the form exist on Information page
      .should('have.value', '');
    cy
      .get('@Personal-Information-page')
      .get('input > :nth-child(1)')           // check if the input field for name exist on Information page
      .should('be', 'string');
    cy
      .get('@Personal-Information-page')
      .get('button[name="gender"]')     // check if the field for gender exist on Information page
      .should('have.value', '');
    
    cy.get('@Personal-Information-page')
      .find('label')                     // ensure all the labels exist on the form input
      .should('have.value', '');
      
    cy
      .get('@Personal-Information-page')
      .get('input[id="your-department"]')  // check if the input field for occupation exist on the information page
      .should('be', 'string');
       
    cy
      .get('@Personal-Information-page')
      .get('input[id="your-role"]')  // check if the input field for role exist on the information page
      .should('be', 'string');
    cy
      .get('@Personal-Information-page')
      .get('input[id="your-manager"]')  // check if the input field for manager exist on the information page
      .should('be', 'string');
    cy
      .get('@Personal-Information-page')
      .get('input[id="user-location"]')  // check if the input field for location exist on the information page
      .should('be', 'string');
    
    cy
      .get('@Personal-Information-page')
      .find('button')  // check if the next button exist on welcome page
      .click({ multiple: true, force: true });
    cy.get('.rp-requests').as('Travel-Document-page');
    cy.get('@Travel-Document-page')
      .find('.width-911')   // check if the Travel page exist 
      .should('have.value', '');
    cy
      .get('@Travel-Document-page')
      .find('.tab-title')   
      .should('have.value', '');
    cy
      .get('@Travel-Document-page')
      .find('.passport-question')  
      .should('contain', 'Do you have a Valid Passport?')
      .should('contain', 'Yes')
      .should('contain', 'No');
    cy
      .get('@Travel-Document-page')
      .find('p')
      .should('contain','Do you have a Valid Passport?');  
    cy
      .get('@Travel-Document-page')
      .find('.radio-buttons')
      .should('contain', 'Yes'); 
    cy
      .get('@Travel-Document-page')
      .find('.radio-buttons')
      .should('contain', 'No'); 
    cy
      .get('@Travel-Document-page')
      .get('input[id="yes"]')
      .click({ multiple: true, force: true });
    cy
      .get('@Travel-Document-page')
      .get('input[id="no"]')
      .click({ multiple: true, force: true });
    cy
      .get('@Travel-Document-page')
      .get('.reason')
      .get('textarea').type('I have no passport because I am a Roman', {force:true});
    cy
      .get('@Travel-Document-page')
      .find('.next-btn')
      .click({ multiple: true, force: true })
      .visit('/all-done');
    cy
      .get('.all-done').as('set-up')
      .get('@set-up')
      .find('.heading')
      .should('contain', "You're All Set Up");
    cy
      .get('.all-done').as('set-up')
      .get('@set-up')
      .find('.complete_image');
    cy
      .get('.all-done').as('set-up')
      .get('@set-up')
      .find('#get-started')
      .should('contain', 'Go To Dashboard')
      .click({ multiple: true, force: true })
  });
});

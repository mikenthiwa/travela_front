const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Add passport page ', () => {
  before(() => {
    cy.authenticateUser();
    cy.visit('/travel_readiness');
  });
  
  describe('Add passport form', () => {
    before(() => {
      cy.get('#passportButton')
        .should('have.class', 'documents-button-group__button--active');
      cy.get('button.documents-button-group__button')
        .click();
    });
    it(`should display in a modal when the
        	'Add passport' button is clicked`, () => {
      cy.get('.modal')
        .as('passport-modal')
        .should('be.visible');
      cy.get('@passport-modal').contains('Add Passport Details');
      cy.get('@passport-modal')
        .find('form.travel-document-form')
        .as('add-passport-form')
        .should('be.visible');
      cy.get('@add-passport-form').contains('Name as Seen On Passport');
      cy.get('@add-passport-form').contains('Passport Number');
      cy.get('@add-passport-form').contains('Nationality');
      cy.get('@add-passport-form').contains('Place of Issue');
      cy.get('@add-passport-form').contains('Expiry Date');
      cy.get('@add-passport-form').contains('Attach the image or PDF of your passport document');
      cy.get('div.document-input__input-container').contains('Maximum file size - 10MB');
    });

    it(`should show a validation error if
          user puts the cursor in an input field and leaves its without filling it`, () => {
      cy.get('input[name=name]')
        .focus()
        .blur();
      cy.get('input[name=name] + span').as('missing-name');
      cy.get('@missing-name').should('have.class', 'error');
      cy.get('@missing-name').contains('This field is required');
      cy.get('input[name=passportNumber]')
        .focus()
        .blur();
      cy.get('input[name=passportNumber] + span').as('missing-passportNumber');
      cy.get('@missing-passportNumber').should('have.class', 'error');
      cy.get('@missing-passportNumber').contains('This field is required');
    });
  });

  describe('Add passport', () => {
    it('should successfully add a passport with file size larger than 10MB', () => {
      cy.server();
      cy.route('POST', `${baseAPI}/travel_readiness`);
      cy.get('input[name=name]')
        .wait(2000)
        .type('Mirriam Maina');
      cy.get('input[name=passportNumber]')
        .wait(2000)
        .type('PST 45678');
      cy.get('.occupationInput')
        .wait(2000)
        .type('Ugandan');
      cy.get('input[name=dateOfBirth]')
        .wait(2000)
        .type('01/01/1999');
      cy.get('input[name=dateOfIssue]')
        .wait(2000)
        .type('01/01/2018');
      cy.get(':nth-child(6) > input')
        .wait(2000)
        .type('Uganda');
      cy.get('input[name=expiryDate]')
        .wait(2000)
        .type('{downarrow}{enter}');
      cy.get('.document-input__input-container__prompts__text > :nth-child(1)')
        .contains('Choose from computer');
      cy.uploadFile('images/guesthouse.jpg', 'image/jpeg');
      cy.get('button#submit')
        .should('not.be.disabled')
        .click();
      cy.authenticateUser()
        .wait(3000);
      cy.get('.toast-message')
        .should('be.visible')
        .wait(3000)
        .contains('Passport created successfully!');
      cy.get('.modal-title-bar')
        .should('be.visible');
      cy.get('button#yes')
        .should('be.visible')
        .click();
    });

    it('should add second passport with passport document in pdf', () => {
      cy.get('input[name=name]')
        .wait(2000)
        .type('Susan Keru');
      cy.get('input[name=passportNumber]')
        .wait(2000)
        .type('PST 87654');
      cy.get('.occupationInput')
        .wait(2000)
        .type('Ugandan');
      cy.get('input[name=dateOfBirth]')
        .wait(2000)
        .type('01/01/1999');
      cy.get('input[name=dateOfIssue]')
        .wait(2000)
        .type('01/01/2018');
      cy.get(':nth-child(6) > input')
        .wait(2000)
        .type('Uganda');
      cy.get('input[name=expiryDate]')
        .wait(2000)
        .type('{downarrow}{enter}');
      cy.upload_pdf('images/pdfImage.pdf', 'application/pdf', 'input[type=file]');
      cy.get('.document-input__input-container__prompts__text > :nth-child(1)')
        .contains('images/pdfImage.pdf');
      cy.get('button#submit')
        .should('not.be.disabled')
        .click();
      cy.authenticateUser()
        .wait(2000);
      cy.get('.toast-message')
        .wait(3000)
        .should('be.visible')
        .contains('Passport created successfully!')
        .wait(2000);
      cy.get('.modal-title-bar')
        .should('be.visible');
      cy.get('button#no')
        .should('be.visible')
        .click();
      cy.get('.rp-requests')
        .should('be.visible');
    });

    it('should toast an error message for errors in file upload', ()=>{
      cy.get('button.documents-button-group__button').click();
      cy.get('input[name=name]')
        .wait(2000)
        .type('Susan Keru');
      cy.get('input[name=passportNumber]')
        .wait(2000)
        .type('PST 87654');
      cy.get('.occupationInput')
        .wait(2000)
        .type('Ugandan');
      cy.get('input[name=dateOfBirth]')
        .wait(2000)
        .type('01/01/1999');
      cy.get('input[name=dateOfIssue]')
        .wait(2000)
        .type('01/01/2018');
      cy.get(':nth-child(6) > input')
        .wait(2000)
        .type('Uganda');
      cy.get('input[name=expiryDate]')
        .wait(2000)
        .type('{downarrow}{enter}');
      cy.uploadFile('images/largefile.jpg', 'image/jpeg');
      cy.get('.toast-message')
        .wait(3000)
        .should('be.visible')
        .contains('This upload has exceeded the 10 MB limit that is allowed')
        .wait(2000);
      cy.get('button#cancel').click();

    });
  });

  describe('Edit passport', () => {
    it('edit passport information on the system', ()=>{
      cy.get('.table__body >:last-child > :nth-child(8) > .menu__container > :nth-child(1) > #toggleIcon2')
        .click();
      cy.get(`.table__body >:last-child > :nth-child(8) > .menu__container > :nth-child(1) > 
      .table__menu-container > .table__menu-list`)
        .contains('Edit');
      cy.get(`.table__body >:last-child > :nth-child(8) > 
      .menu__container > :nth-child(1) > .table__menu-container > .table__menu-list > #iconBtn2`)
        .click();
      cy.get('input[name=name]')
        .wait(2000)
        .should('have.value', 'Susan Keru')
        .clear()
        .type(`Requester ${Math.random().toString(36).substr(2).toUpperCase()}`);
      cy.get('input[name=dateOfBirth]').clear().click();
      cy.get('.react-datepicker__day + div:first').wait(2000).click();
      cy.get('#submit')
        .click();
      cy.get('.toast-message')
        .wait(3000)
        .should('be.visible')
        .contains('Passport updated successfully!')
        .wait(2000);
    });
  });

  describe('Comment on passport information', () => {
    it('users should be able to comment on passport information', ()=> {
      cy.get('span.document-name')
        .first()
        .click();
      cy.get('.modal')
        .as('comment-modal')
        .should('be.visible')
        .contains('Passport Details');
      cy.get('@comment-modal')
        .find('.ql-editor')
        .as('comment-editor')
        .should('be.visible');
      cy.get('@comment-editor')
        .type('Hello, World');
      cy.get('#post-submit')
        .contains('Post')
        .click()
        .wait(2000);
      cy.get('.modal__status-update > p')
        .should('be.visible')
        .contains('Hello,World');
      cy.get('.modal-close > img')
        .should('be.visible')
        .click();
    });
  });

  describe('Delete passport', () => {
    it('user should be able to delete a passport', ()=> {
      cy.get('#toggleIcon2')
        .click();
      cy.get('.table__menu-list')
        .contains('Delete');
      cy.get('#deleteRequest')
        .click();
      cy.get('.modal')
        .as('delete-modal')
        .should('be.visible');
      cy.get('@delete-modal')
        .find('button.bg-btn')
        .contains('Delete')
        .click().wait(3000);
      cy.get('.toast-message')
        .contains('Document successfully deleted')
        .wait(2000);
    });

    it('user should be able to delete second passport', ()=> {
      cy.get('#toggleIcon2')
        .click();
      cy.get('.table__menu-list')
        .contains('Delete');
      cy.get('#deleteRequest')
        .click();
      cy.get('.modal')
        .as('delete-modal')
        .should('be.visible');
      cy.get('@delete-modal')
        .find('button.bg-btn')
        .contains('Delete')
        .click().wait(3000);
    });
  });
});

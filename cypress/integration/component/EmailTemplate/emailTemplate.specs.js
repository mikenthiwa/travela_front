const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Create email template page', () => {
  before(() => {
    cy.authenticateUser();
    cy.visit('/settings/reminder-setup');
  });

  it('should display create email template page', () => {
    cy.get('.action-btn')
      .should('be.visible')
      .click()
    cy.get('.readiness-header').as('template-page');
    cy.get('@template-page').contains('CREATE AN EMAIL TEMPLATE');
    cy.get('@template-page').contains('Template Name');
    cy.get('@template-page').contains('From');
    cy.get('@template-page').contains('Cc');
    cy.get('@template-page').contains('Email Subject');
    cy.get('@template-page').contains('Email Message');
  });
});

describe('Create email template', () => {
  before(() => {
    cy.server();
    cy.route(
      'GET',
      `${baseAPI}/reminderManagement/emailTemplates`,
      'fixture:reminderSetup/beforeData'
    );
    cy.route(
      'POST',
      `${baseAPI}/reminderManagement/emailTemplates`,
      'fixture:reminderSetup/newData'
    );
    cy.authenticateUser();
    cy.visit('/settings/reminder-setup');
  });

  it('should create a new template', () => {
    cy.get('.action-btn')
      .should('be.visible')
      .click();
    cy.get('input[name=name]').type('passport reminder');
    cy.get('input[name=role]').type('sammy.njau@andela.com');
    cy.get('input[name=cc]').type('sylvia.mbugua@andela.com');
    cy.get('input[name=subject]').type('Reminder for passport upload');
    cy.get('textarea[name=message]').type(
      'Please upload your passport for travel readiness'
    );
    cy.get('button#submit')
      .should('not.be.disabled')
      .click();
    cy.get('.toast-message')
      .should('be.visible')
      .contains('Reminder Email Template created successfully');
  });

  after(() => {
    cy.server();
    cy.route(
      'GET',
      `${baseAPI}/reminderManagement/emailTemplates`,
      'fixture:reminderSetup/getData'
    );
  });
});

describe('Edit Template', () => {
  before(() => {
    cy.server();
    cy.route(
      'GET',
      `${baseAPI}/reminderManagement/emailTemplates`,
      'fixture:reminderSetup/getData'
    );
    cy.route(
      'GET',
      `${baseAPI}/reminderManagement/emailTemplates/28`,
      'fixture:reminderSetup/singleData'
    );
    cy.route(
      'PUT',
      `${baseAPI}/reminderManagement/emailTemplates/28`,
      'fixture:reminderSetup/editData'
    );
    cy.authenticateUser();
    cy.visit('/settings/reminder-setup');
  });

  it('should edit a template', () => {
    cy.get('#toggleIcon')
      .should('be.visible')
      .click();
    cy.get('.edit').click();
    cy.get('input[name=name]')
      .clear()
      .type('passport reminder two');
    cy.get('input[name=role]')
      .clear()
      .type('sammy.hinga@andela.com');
    cy.get('input[name=subject]')
      .clear()
      .type('A Reminder for passport upload');
    cy.get('button#submit')
      .should('not.be.disabled')
      .click();
    cy.get('.toast-message')
      .should('be.visible')
      .contains('Reminder email template successfully updated');
  });

  after(() => {
    cy.server();
    cy.route(
      'GET',
      `${baseAPI}/reminderManagement/emailTemplates`,
      'fixture:reminderSetup/updatedData'
    );
    cy.authenticateUser();
    cy.visit('/settings/reminder-setup');
  });
});

describe('Disable Template', () => {
  before(() => {
    cy.server();
    cy.route(
      'GET',
      `${baseAPI}/reminderManagement/emailTemplates`,
      'fixture:reminderSetup/getData'
    );
    cy.route(
      'GET',
      `${baseAPI}/reminderManagement/emailTemplates/28`,
      'fixture:reminderSetup/singleData'
    );
    cy.route(
      'PUT',
      `${baseAPI}/reminderManagement/emailTemplates/disable/28`,
      'fixture:reminderSetup/singleDisableData'
    );
    cy.authenticateUser();
    cy.visit('/settings/reminder-setup');
  });

  it('should disable a template', () => {
    cy.get('#toggleIcon')
      .first()
      .click()
      .should('be.visible');
    cy.get('.disable').click();
    cy.get('.modal').as('disable-modal');
    cy.get('@disable-modal').contains('Disable Reminder Condition');
    cy.get('textarea[type=text]')
      .type('This template is no longer in use')
    cy.get('button#oncancel')
      .should('not.be.disabled')
      .click();
    cy.get('.toast-message')
      .should('be.visible')
      .contains('passport has been successfully disabled');
  });

  after(() => {
    cy.server();
    cy.route(
      'GET',
      `${baseAPI}/reminderManagement/emailTemplates`,
      'fixture:reminderSetup/disabledData'
    );
    cy.authenticateUser();
    cy.visit('/settings/reminder-setup');
  });
});

describe('Enable Template', () => {
  before(() => {
    cy.server();
    cy.route(
      'GET',
      `${baseAPI}/reminderManagement/emailTemplates`,
      'fixture:reminderSetup/disabledData'
    );
    cy.route(
      'GET',
      `${baseAPI}/reminderManagement/emailTemplates/28`,
      'fixture:reminderSetup/singleDisableData'
    );
    cy.route(
      'PUT',
      `${baseAPI}/reminderManagement/emailTemplates/enable/28`,
      'fixture:reminderSetup/enabledData'
    );
    cy.authenticateUser();
    cy.visit('/settings/reminder-setup');
  });

  it('should enable a disabled template', () => {
    cy.get('#toggleIcon').click();
    cy.get('.enable')
      .click()
    cy.get('.modal').as('disable-modal');
    cy.get('@disable-modal').contains('Enable Email Reminder Template');
    cy.get('button#oncancel')
      .should('not.be.disabled')
      .click();
    cy.get('.toast-message')
      .should('be.visible')
      .contains('passport template has been successfully enabled');
  });
});

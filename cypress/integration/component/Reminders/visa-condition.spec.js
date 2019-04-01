const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('see a list of previously created reminder conditions', () => {
  before(() => {
    cy.server();
    cy.route(
      'GET',
      `${baseAPI}/reminders?document=visa&page=1`,
      'fixture:reminders/listReminderCondition'
    );
    cy.authenticateUser();
    cy.visit('settings/reminders?document=visa').wait(2000);
  });
  it('should get  list of created reminder', () => {
    cy.get('.list-templates').should('be.visible');
    cy.get(':nth-child(1) > .readiness__cell-name').should('be.visible');
    cy.get(
      ':nth-child(1) > .readiness__cell-name > .reminder__condition-name'
    ).contains('visa should be renewed');
    cy.get(':nth-child(2)').should('be.visible');
    cy.get(':nth-child(3)').should('be.visible');
    cy.get(':nth-child(4)').should('be.visible');
    cy.get(':nth-child(5)').should('be.visible');
    cy.get(':nth-child(6)').should('be.visible');
  });
});

describe('select reminder condition', () => {
  before(() => {
    cy.server();
    cy.route(
      'GET',
      `${baseAPI}/reminders?document=visa&page=1`,
      'fixture:reminders/listReminderCondition'
    );
    cy.route(
      'GET',
      `${baseAPI}/reminders/7`,
      'fixture:reminders/detailReminderCondition'
    );
    cy.authenticateUser();
    cy.visit('settings/reminders?document=visa').wait(2000);
  });
  it('should get  list of created reminder', () => {
    cy.get(':nth-child(1) > .readiness__cell-name > .reminder__condition-name')
      .contains('visa should be renewed')
      .click();
    cy.get('.modal').should('be.visible');
    cy.get('.modal-title').should('be.visible');
    cy.get('.reminder_details > :nth-child(1)').should('be.visible');
    cy.get('#cancel').click();
    cy.get('.modal').should('not.be.visible');
  });
});

describe('Create Travel Reminder condition ', () => {
  before(() => {
    cy.server();
    cy.route(
      'POST',
      `${baseAPI}/reminders`,
      'fixture:reminders/newReminderCondition'
    );
    cy.route(
      'GET',
      `${baseAPI}/reminders?document=visa&page=1`,
      'fixture:reminders/listReminderCondition'
    );
    cy.authenticateUser();
    cy.visit('settings/reminders?document=visa').wait(2000);
  });

  it('should create Reminder Condition', () => {
    cy.get('button.create-new').click();
    cy.get('div.dropdown__input').click();
    cy.get('#Visa-Visa').click();
    cy.get('button#submit').should('be.disabled')
    cy.get('input[name=conditionName]').type('Visa correction details');
    cy.get(
      ':nth-child(2) > :nth-child(1) > [style="position: relative;"] > .input > .value > .select-dropdown > img'
    ).click();
    cy.get('li')
      .contains('Visa Expires')
      .click();
    cy.get('input[name=date-0]').type(2);
    cy.get(
      ':nth-child(3) > :nth-child(1) > [style="position: relative;"] > .input'
    ).as('input');
    cy.get(
      ':nth-child(3) > :nth-child(1) > [style="position: relative;"] > .input > .value'
    ).click();
    cy.get('@input')
      .contains('li', 'Visa Expires')
      .click();
    cy.get('div.value');
    cy.get('input[name=date-1]').type(2);
    cy.get(
      ':nth-child(3) > .dropdown-input-group > .form-input.period > [style="position: relative;"] > .input > .value > .select-dropdown'
    ).click();
    cy.get(
      ':nth-child(3) > .dropdown-input-group > .form-input.period > [style="position: relative;"] > .input >'
    ).as('choices');
    cy.get('@choices')
      .find('li', 'Day')
      .as('day');
    cy.get('@day')
      .first()
      .click();
      cy.get('button#submit').should('be.enabled')
    cy.get('#submit')
      .click()
      .wait(5000);
    cy.get('div.toast-message').contains('Reminder successfully created');
  });
});

describe('Name Error Reminder condition ', () => {
  before(() => {
    cy.server();
    cy.route(
      'POST',
      `${baseAPI}/reminders`,
      'fixture:reminders/invalidNameCondition'
    );
    cy.route(
      'GET',
      `${baseAPI}/reminders?document=visa&page=1`,
      'fixture:reminders/listReminderCondition'
    );
    cy.authenticateUser();
    cy.visit('settings/reminders?document=visa').wait(2000);
  });

  it('should raise validation failed', () => {
    cy.get('button.create-new').click();
    cy.get('div.dropdown__input').click();
    cy.get('#Visa-Visa').click();
    cy.get('button#submit').should('be.disabled')
    cy.get('input[name=conditionName]').type('Vi');
    cy.get(
      ':nth-child(2) > :nth-child(1) > [style="position: relative;"] > .input > .value > .select-dropdown > img'
    ).click();
    cy.get('li')
      .contains('Visa Expires')
      .click();
    cy.get('input[name=date-0]').type(2);
    cy.get(
      ':nth-child(3) > :nth-child(1) > [style="position: relative;"] > .input'
    ).as('input');
    cy.get(
      ':nth-child(3) > :nth-child(1) > [style="position: relative;"] > .input > .value'
    ).click();
    cy.get('@input')
      .contains('li', 'Visa Expires')
      .click();
    cy.get('div.value');
    cy.get('input[name=date-1]').type(2);
    cy.get(
      ':nth-child(3) > .dropdown-input-group > .form-input.period > [style="position: relative;"] > .input > .value > .select-dropdown'
    ).click();
    cy.get(
      ':nth-child(3) > .dropdown-input-group > .form-input.period > [style="position: relative;"] > .input >'
    ).as('choices');
    cy.get('@choices')
      .find('li', 'Day')
      .as('day');
    cy.get('@day')
      .first()
      .click();
      cy.get('button#submit').should('be.enabled')
    cy.get('#submit')
      .click()
      .wait(5000);
    cy.get('div.toast-message').contains('Condition name should be more than 4 characters');
  });
});

describe('Create Duplicate Travel Reminder condition ', () => {
  before(() => {
    cy.server();
    cy.route(
      'POST',
      `${baseAPI}/reminders`,
      'fixture:reminders/errorReminderCondition'
    );
    cy.authenticateUser();
    cy.visit('settings/reminders?document=visa').wait(2000);
  });

  it('should create a duplicate Reminder Condition', () => {
    cy.get('button.create-new').click();
    cy.get('div.dropdown__input').click();
    cy.get('#Visa-Visa').click();
    cy.get('input[name=conditionName]').type('Visa correction details');
    cy.get(
      ':nth-child(2) > :nth-child(1) > [style="position: relative;"] > .input > .value > .select-dropdown > img'
    ).click();
    cy.get('li')
      .contains('Visa Expires')
      .click();
    cy.get('input[name=date-0]').type(2);
    cy.get(
      ':nth-child(3) > :nth-child(1) > [style="position: relative;"] > .input'
    ).as('input');
    cy.get(
      ':nth-child(3) > :nth-child(1) > [style="position: relative;"] > .input > .value'
    ).click();
    cy.get('@input')
      .contains('li', 'Visa Expires')
      .click();
    cy.get('div.value');
    cy.get('input[name=date-1]').type(2);
    cy.get(
      ':nth-child(3) > .dropdown-input-group > .form-input.period > [style="position: relative;"] > .input > .value > .select-dropdown'
    ).click();
    cy.get(
      ':nth-child(3) > .dropdown-input-group > .form-input.period > [style="position: relative;"] > .input >'
    ).as('choices');
    cy.get('@choices')
      .find('li', 'Day')
      .as('day');
    cy.get('@day')
      .first()
      .click();
    cy.get('#submit')
      .click()
      .wait(3000);
    cy.get('div.toast-message').contains('Validation failed');
  });
});

describe('Edit Travel Reminder condition ', () => {
  before(() => {
    cy.server();
    cy.route(
      'GET',
      `${baseAPI}/reminders?document=visa&page=1`,
      'fixture:reminders/listReminderCondition'
    );
    cy.route(
      'GET',
      `${baseAPI}/reminders/7`,
      'fixture:reminders/detailReminderCondition'
    );
    cy.route(
      'PUT',
      `${baseAPI}/reminders/7`,
      'fixture:reminders/editReminderCondition'
    );
  
    cy.authenticateUser();
    cy.visit('settings/reminders?document=visa').wait(2000);
  });

  it('should edit a Travel Reminder condition', () => {
    cy.get('tr')
      .contains('tr', 'visa should be renewed')
      .as('row');
    cy.get('@row')
      .find('i.fa-ellipsis-v')
      .click();
    cy.get('@row')
      .find(':nth-child(5) > :nth-child(1) >')
      .as('menu-container');
    cy.get('@menu-container')
      .contains('Edit')
      .click();

    cy.get('div.dropdown__input').click();
    cy.get('#Visa-Visa').click();
    cy.get('input[name=conditionName]').should(
      'have.value',
      'visa should be renewed'
    );
    cy.get('input[name=conditionName]').clear();
    cy.get('input[name=conditionName]').type('Visa Replacement');
    cy.get(
      ':nth-child(2) > :nth-child(1) > [style="position: relative;"] > .input > .value > .select-dropdown > img'
    ).click();
    cy.get('input[name=date-0]').should('have.value', '2');
    cy.get('input[name=date-0]').clear();
    cy.get('input[name=date-0]').type(1);
    cy.get(
      ':nth-child(2) > .dropdown-input-group > .form-input.period > [style="position: relative;"] > .input > .value > .select-dropdown'
    ).click();
    cy.get(
      ':nth-child(2) > .dropdown-input-group > .form-input.period > [style="position: relative;"] > .input >'
    ).as('choices');
    cy.get('@choices')
      .find('li', 'Day')
      .as('day');
    cy.get('@day')
      .first()
      .click();
    cy.get('#submit').click();
    cy.get('div.toast-message').contains('Reminder successfully upated');
  });
});

describe('Disable Travel Reminder condition ', () => {
  before(() => {
    cy.server();
    cy.route(
      'GET',
      `${baseAPI}/reminders?document=visa&page=1`,
      'fixture:reminders/listReminderCondition'
    );
    cy.route(
      'PUT',
      `${baseAPI}/reminders/conditions/disable/7`,
      'fixture:reminders/disableReminderCondition'
    );
    cy.authenticateUser();
    cy.visit('settings/reminders?document=visa').wait(2000);
  });

  it('should disbale a travel reminder condition', () => {
    cy.get('tr')
      .contains('tr', 'visa should be renewed')
      .as('row');
    cy.get('@row')
      .find('i.fa-ellipsis-v')
      .click();
    cy.get('@row')
      .find(':nth-child(5) > :nth-child(1) >')
      .as('menu-container');
    cy.get('@menu-container')
      .contains('Disable')
      .click();
    cy.get('.delete-checklist-item__input').type('no longer valid');
    cy.get('#oncancel').click();
    cy.get('div.toast-message').contains(
      'Condition has been successfully disabled'
    );
  });
});

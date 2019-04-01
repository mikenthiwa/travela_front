const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('ReminderSetup', () => {
  beforeEach(() => {
    cy.authenticateUser();
    cy.visit('/settings/reminders?document=passport');
  });
  describe('Create Reminder Condition', () => {
    before(() => {
      cy.server();
      cy.route(
        'POST',
        `${baseAPI}/reminders`,
        'fixture:reminders/passportReminderCondition'
      );
    });
    it('should successfully create a reminder condition', () => {
      cy.get('.PageHeader').contains('REMINDER CONDITIONS');
      cy.get('.create-new')
        .should('be.visible')
        .click();
      cy.get('.title').contains('CREATE A REMINDER FOR');
      cy.get('.dropdown__input')
        .should('be.visible')
        .click();
      cy.get('#Passport-Passport').click();
      cy.get('.reminder-card').should('be.visible');
      cy.get('form > :nth-child(1) > :nth-child(1)').contains('Condition Name');
      cy.get(':nth-child(1) > input').type('Passport Expiry');
      cy.get(
        ':nth-child(2) > :nth-child(1) > [style="position: relative;"] > .input > .value > .select-dropdown > img'
      ).click();
      cy.get('li')
        .contains('Passport Renewal')
        .click();
      cy.get(':nth-child(2) > .dropdown-input-group').should('be.visible');
      cy.get('input[name=date-0]').type(3);
      cy.get(
        ':nth-child(2) > .dropdown-input-group > .form-input.period > [style="position: relative;"] > .input > .value'
      ).click();
      cy.get('.delete-icon > .addsvg').click();
      cy.get('#submit').click();
      cy.get('div.toast-message').contains('Reminder successfully created');
    });
  });
  describe('List Previous Reminders', () => {
    it('should display a list of previously created reminder conditions ', () => {
      cy.get('.list-templates').should('be.visible');
      cy.get('.readiness__cell-name').should('be.visible');
      cy.get('.reminder__condition-name').contains('Passport Invalid');
      cy.get('.table__rows > :nth-child(2)').should('be.visible');
      cy.get('.table__rows > :nth-child(3)').should('be.visible');
      cy.get('.table__rows > :nth-child(4)').should('be.visible');
      cy.get('.table__rows > :nth-child(5)').should('be.visible');
    });
  });
  describe('Edit Reminder Condition', () => {
    it('should edit a reminder condition', () => {
      cy.get('tr')
        .contains('tr', 'Passport Invalid')
        .as('row');
      cy.get(':nth-child(1) > :nth-child(5) > :nth-child(1) > #toggleIcon');
      cy.get('@row')
        .find('i.fa-ellipsis-v')
        .click();
      cy.get('@row')
        .find(':nth-child(5) > :nth-child(1) >')
        .as('edit-container');
      cy.get('@edit-container')
        .contains('Edit')
        .click({ force: true });
      cy.get('div.dropdown__input').click();
      cy.get('#Passport-Passport').click();
      cy.get('input[name=conditionName]').should(
        'have.value',
        'Passport Invalid'
      );
      cy.get('input[name=conditionName]').clear();
      cy.get('input[name=conditionName]').type('Invalid Passport');
      cy.get(
        ':nth-child(2) > :nth-child(1) > [style="position: relative;"] > .input > .value > .select-dropdown > img'
      ).click();
      cy.get('input[name=date-0]').should('have.value', '1');
      cy.get('input[name=date-0]').clear();
      cy.get('input[name=date-0]').type(2);
      cy.get(
        ':nth-child(2) > .dropdown-input-group > .form-input.period > [style="position: relative;"] > .input > .value > .select-dropdown'
      ).click();
      cy.get(
        ':nth-child(2) > .dropdown-input-group > .form-input.period > [style="position: relative;"] > .input >'
      ).as('to-deadline');
      cy.get('@to-deadline')
        .find('li', 'Day')
        .as('time');
      cy.get('@time')
        .first()
        .click();
      cy.get('#submit').click();
      cy.get('div.toast-message').contains('Reminder successfully upated');
    });
  });
  describe('Create Reminder With Similar Name', () => {
    it('should not create a reminder condition with similar name', () => {
      cy.get('.PageHeader').contains('REMINDER CONDITIONS');
      cy.get('.create-new')
        .should('be.visible')
        .click();
      cy.get('.title').contains('CREATE A REMINDER FOR');
      cy.get('.dropdown__input')
        .should('be.visible')
        .click();
      cy.get('#Passport-Passport').click();
      cy.get('.reminder-card').should('be.visible');
      cy.get('form > :nth-child(1) > :nth-child(1)').contains('Condition Name');
      cy.get(':nth-child(1) > input').type('Invalid Passport');
      cy.get(
        ':nth-child(2) > :nth-child(1) > [style="position: relative;"] > .input > .value > .select-dropdown > img'
      ).click();
      cy.get('li')
        .contains('Passport Renewal')
        .click();
      cy.get(':nth-child(2) > .dropdown-input-group').should('be.visible');
      cy.get('input[name=date-0]').type(3);
      cy.get(
        ':nth-child(2) > .dropdown-input-group > .form-input.period > [style="position: relative;"] > .input > .value'
      ).click();
      cy.get('.delete-icon > .addsvg').click();
      cy.get('#submit').click();
      cy.get('div.toast-message').contains(
        'Reminder condition name already exists'
      );
    });
  });
  describe('Disable Reminder Condition', () => {
    it('should disable a reminder condition', () => {
      cy.get('tr')
        .contains('tr', 'Invalid Passport')
        .as('row');
      cy.get('@row')
        .find('i.fa-ellipsis-v')
        .click();
      cy.get('@row')
        .find(':nth-child(5) > :nth-child(1) >')
        .as('disable-container');
      cy.get('@disable-container')
        .contains('Disable')
        .click();
      cy.get('.delete-checklist-item__input').type('Not needed');
      cy.get('#oncancel').click();
      cy.get('div.toast-message').contains(
        'Condition has been successfully disabled'
      );
    });
  });
  describe('Enable reminder condition', () => {
    it('should enable a disabled reminder condition', () => {
      cy.get('tr')
        .contains('tr', 'Invalid Passport')
        .as('rowdisabled');
      cy.get('@rowdisabled')
        .find('i.fa-ellipsis-v')
        .click();
      cy.get('@rowdisabled')
        .find(':nth-child(5) > :nth-child(1) >')
        .as('enaable-container');
      cy.get('@enaable-container')
        .contains('Enable')
        .click();
      cy.get('body').contains('Are you sure you want to enable the template');
      cy.get('#oncancel')
        .contains('Enable')
        .click();
    });
  });
  describe('Edit back Reminder Condition', () => {
    it('should edit a reminder condition', () => {
      cy.get('tr')
        .contains('tr', 'Invalid Passport')
        .as('row');
      cy.get(':nth-child(1) > :nth-child(5) > :nth-child(1) > #toggleIcon');
      cy.get('@row')
        .find('i.fa-ellipsis-v')
        .click();
      cy.get('@row')
        .find(':nth-child(5) > :nth-child(1) >')
        .as('edit-container');
      cy.get('@edit-container')
        .contains('Edit')
        .click({ force: true });
      cy.get('div.dropdown__input').click();
      cy.get('#Passport-Passport').click();
      cy.get('input[name=conditionName]').should(
        'have.value',
        'Invalid Passport'
      );
      cy.get('input[name=conditionName]').clear();
      cy.get('input[name=conditionName]').type('Passport Invalid');
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
      ).as('to-deadline');
      cy.get('@to-deadline')
        .find('li', 'Day')
        .as('time');
      cy.get('@time')
        .first()
        .click();
      cy.get('#submit').click();
      cy.get('div.toast-message').contains('Reminder successfully upated');
    });
  });
});

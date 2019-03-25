const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Travel checklists page', () => {
  before(() => {
    cy.authenticateUser();
    localStorage.setItem('location', 'Nairobi');
    cy.server();
    cy.route('GET', `${baseAPI}/checklists?destinationName=Nairobi`, 'fixture:checklist/defaultChecklist');
    cy.visit('/trip-planner/checklists');
  });

  it ('should display default items else user-friendly message', () =>{
    cy.get('div#default-item-header').contains('Default item');
    cy.get('div.checklist-item').eq(0).contains('Travel Ticket Details');
  });
  it('should display added items else display a user-friendly message', () =>{
    cy.get('div#added-item-header').contains('Added Items');
    cy.get('.checkInTable__trips--empty').eq(0).contains('No new checklist item added yet');
  });
  it('should show disabled items else dispaly user-friendly message', ()=>{
    cy.get('div#deleted-item-header').contains('Disabled Items');
    cy.get('.checkInTable__trips--empty').eq(1)
      .contains('There are currently no disabled travel checklist items for your location');
  });
 
  describe('Add travel checklist item', () => {
    before(() => {
      // Click on 'Add item' button
      cy.get('button.action-btn.btn-new-request').as('checklist-button');
      cy.get('@checklist-button').click();
    });
    
    it('should be displayed in a modal when the Add Item button is clicked', () => {
      cy.get('label').should('be.visible');
      cy.get('label').contains('Item Name');
      cy.get('label').contains('Link to information document');
      cy.get('input').should('be.visible');
      cy.get('input.link-label-field').should('be.visible');
      cy.get('input.link-address-field').should('be.visible');
      cy.get('label.container').should('be.visible');
      cy.get('label.container').contains('Require file attachment');
      cy.get('button#cancel.bg-btn.bg-btn--inactive').should('be.visible');
      cy.get('button#submit.bg-btn.bg-btn--active').should('be.visible');
    });

    it('displays an error when no item name input is provided', () => {
      cy.get('input[name=itemName]')
        .focus()
        .blur();
      cy.get('input[name=itemName] +span')
        .should('have.class', 'error')
        .contains('This field is required');
    });

    it('inputs a travel checklist item', () => {
      cy.get('input[name=itemName]')
        .type('East African Passport')
        .should('have.value', 'East African Passport');
      cy.get('input.link-label-field')
        .type('passport')
        .should('have.value', 'passport');
      cy.get('input.link-address-field')
        .type('www.com')
        .should('have.value', 'www.com');
      cy.get('span.checkmark').click();
    });

    it('adds/saves a checklist item', () => {
      cy.server(); 
      cy.route('POST', `${baseAPI}/checklists`, 'fixture:checklist/success');    
      cy.get('button#submit.bg-btn.bg-btn--active')
        .click()
        .url()
        .should('include', '/trip-planner/checklists');
      cy.get('.toast-message')
        .should('be.visible')
        .contains('Check list item created successfully');
      cy.get('div#item-name').contains('East African Passport');
      cy.get('.toast:contains("Check list item created successfully") button').click();
    });
  });

  describe('handle error', () => {
    before(() => {
      cy.get('button.action-btn.btn-new-request').as('checklist-button');
      cy.get('@checklist-button').click({ force: true });
    });

    it('should return an error when adding an existing checklist item', () => {
      cy.server({ status: 400 }); 
      cy.route('POST', `${baseAPI}/checklists`, 'fixture:checklist/duplicate').as('createItem');
     
      cy.get('input[name=itemName]')
        .clear()
        .type('East African Passport');
      cy.get('input.link-label-field')
        .type('passport')
        .should('have.value', 'passport');
      cy.get('input.link-address-field')
        .type('www.com')
        .should('have.value', 'www.com');
      cy.get('span.checkmark').click();
  
      cy.get('button#submit.bg-btn.bg-btn--active')
        .click()
        .url()
        .should('include', '/checklists');
      cy.wait(['@createItem']);
      cy.get('.toast-message')
        .should('be.visible')
        .contains('Travel checklist items are unique, kindly check your input');
    });
  });
  
  describe('Edit travel checklist Item', () => {
    before(() => {
      cy.server();
      cy.route('GET', `${baseAPI}/checklists`, 'fixture:checklist/initialData');
      cy.route('PUT', `${baseAPI}/checklists/*`, 'fixture:checklist/edit');    
      cy.get('button#edit-btn').click({ force: true });
    });
  
    it('should display a modal when the Edit Item button is clicked and Edit the items', () => {
      cy.get('label').should('be.visible');
      cy.get('label').contains('Item Name');
      cy.get('label').contains('Link to information document');
      cy.get('input').should('be.visible');
      cy.get('input.link-label-field').should('be.visible');
      cy.get('input.link-address-field').should('be.visible');
      cy.get('label.container').should('be.visible');
      cy.get('label.container').contains('Require file attachment');
      cy.get('button#cancel.bg-btn.bg-btn--inactive').should('be.visible');
      cy.get('button#submit.bg-btn.bg-btn--active').should('be.visible');
      cy.get('input[name=itemName]')
        .clear()
        .type('Visa');
      cy.get('input.link-label-field')
        .clear()
        .type('passport')
        .should('have.value', 'passport');
      cy.get('input.link-address-field')
        .clear()
        .type('www.com')
        .should('have.value', 'www.com');
      cy.get('span.checkmark')
        .click();
      cy.get('#submit')
        .should('not.be.disabled')
        .click()
        .url()
        .should('include', '/checklists');
      cy.get('.toast-message')
        .should('be.visible')
        .contains('Checklist item successfully updated');
      cy.get('div#item-name').contains('Visa');
    });
  });

  describe('Delete travel checklist Item', () => {
    before(() => {
      cy.server();
      cy.route('GET', `${baseAPI}/checklists`, 'fixture:checklist/initialData');  
      cy.route('GET', `${baseAPI}/checklists/deleted?destinationName=null`, 'fixture:checklist/deleted'); 
      cy.route('DELETE', `${baseAPI}/checklists/*`, 'fixture:checklist/checklist'); 
      cy.get('button#delete-btn').click({ force: true });
  
    });

    it('should display in modal when the Delete Item button is clicked and delete an item', () => {
      cy.get('div.modal-title-bar').contains('Disable Checklist Item');
      cy.get('p.delete-checklist-item__reason').contains('Reason for Disabling');
      cy.get('input').should('be.visible');
      cy.get('button#cancel.bg-btn.bg-btn--inactive').should('be.visible');
      cy.get('button#oncancel.restore-checklist-items__footer--delete').should('be.disabled');
      cy.get('p.delete-checklist-item__reason');
      cy.get('textarea.delete-checklist-item__input')
        .type('The application is not relevant');
      cy.get('button#oncancel.restore-checklist-items__footer--delete')
        .contains('Disable')
        .click()
        .wait(3000);
      cy.get('.toast-message')
        .contains('Checklist item deleted successfully')
        .wait(2000);
    });
  });
});

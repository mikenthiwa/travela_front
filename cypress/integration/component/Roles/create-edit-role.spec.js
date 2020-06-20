const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('Create a new user role', () => {
  before(() => {
    cy.server();
    cy.route('GET', `${baseAPI}/user/roles`, 'fixture:roles/listRoles');
    cy.route('POST', `${baseAPI}/user/role`, 'fixture:roles/newRole');
    cy.authenticateUser();
    cy.visit('/settings/roles');
  });

  it('should create a new user role', () => {
    cy.get('.action-btn').click();
    cy.get('[style="padding-top: 14px;"] > .form-input > label').contains(
      'Role Name *'
    );
    cy.get('#add-role-name').type('finance');
    cy.get(':nth-child(2) > .form-input > label').contains('Description *');
    cy.get('#add-role-description').type('Manage Andela finance accounts');
    cy.get('#submit').click();
    cy.get('.toast').should('be.visible');
    cy.get('.toast').should('contain', 'Role created successfully');
  });

  it('should display a  list of the existing user roles', () => {
    cy.get('.mdl-data-table').contains('Travel Team Member');
  });

  it('should display the title of the page', () => {
    cy.get('.title').contains('USER ROLES');
  });

  it('should display title of role name column', () => {
    cy.get('.bb-md-0').contains('Role Name');
  });

  it('should display title of description column', () => {
    cy.get('.pl-sm-100d').contains('Description');
  });

  it('should display title of users column', () => {
    cy.get('thead > tr > :nth-child(3)').contains('Users');
  });

  it('should display title of actions column', () => {
    cy.get('thead > tr > :nth-child(4)').contains('Actions');
  });
});

describe('Shows error if existing  user role', () => {
  before(() => {
    cy.server();
    cy.route('POST', `${baseAPI}/user/role`);
    cy.authenticateUser();
    cy.visit('/settings/roles');
  });

  it('show error message if role is already existing ', () => {
    cy.get('.action-btn').click();
    cy.get('#add-role-name').type('Super Administrator');
    cy.get('#add-role-description').type('Can perform all task on travela');
    cy.get('#submit').click();
    cy.get('.toast').should('be.visible');
    cy.get('.toast').should('contain', 'Role already exist');
  });
});

describe('Edit a user role', () => {
  before(() => {
    cy.server();
    cy.route('GET', `${baseAPI}/user/roles`, 'fixture:roles/exists');
    cy.route('PATCH', `${baseAPI}/user/role/25`, 'fixture:roles/editRole');
    cy.authenticateUser();
    cy.visit('/settings/roles/');
  });

  it('should edit a user role', () => {
    cy.get('#editRole').click();
    cy.get('[style="padding-top: 14px;"] > .form-input > label').contains(
      'Role Name *'
    );
    cy.get('#add-role-name').should('have.value', 'finance');
    cy.get('#add-role-name')
      .clear()
      .type('Finance');
    cy.get(':nth-child(2) > .form-input > label').contains('Description *');
    cy.get('#add-role-description').should(
      'have.value',
      'Manage Andela finance accounts'
    );
    cy.get('#add-role-description')
      .clear()
      .type('Andela finance accounts manager');
    cy.get('#submit').click();
    cy.get('.toast').should('be.visible');
    cy.get('.toast').should('contain', 'User role updated successfully');
  });
  after(() => {
    cy.server();
    cy.route('GET', `${baseAPI}/user/roles`, 'fixture:roles/updatedRole');
    cy.authenticateUser();
    cy.visit('/settings/roles/');
  });
});

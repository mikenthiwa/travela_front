const baseAPI = Cypress.env('REACT_APP_API_URL');

describe('superadmin should be assigned all roles by default', () => {
  before(() => {
    cy.server();
    cy.route('GET', `${baseAPI}/user/roles/10948?&page=1`,
      'fixture:roles/superAdminUsers');
    cy.route('PUT', `${baseAPI}/user/role/update`,
      'fixture:roles/addSuperadmin');
    cy.authenticateUser();
    cy.visit('/settings/roles/10948').wait(2000);
  });
  after(() => {
    cy.server();
    cy.route('GET', `${baseAPI}/user/roles/10948?&page=1`, 'fixture:roles/updatedSuperAdminUsers');
    cy.authenticateUser();
    cy.visit('/settings/roles/10948');
  });

  it('should assign superadmin all centers', () => {
    cy.get('.action-btn')
      .should('be.visible')
      .click({force:true});
    cy.get('.modal--add-user').should('be.visible');
    cy.get('[style="padding-top: 14px;"] > .form-input > [style="position: relative;"] > .value > .occupationInput').type('Bolton.Opondo@andela.com');
    cy.get('#submit').click();
    cy.get('.toast-message')
      .contains('User has been added as a\n' + '      super administrator');
  });
});

describe('Added superadmin should have all five centers', () => {
  it('should show a list of added users', () => {
    cy.get('.bb-md-0').contains('Name');
    cy.get('.role-user__name').contains('Bolton Otieno');
    cy.get('.pl-sm-100d').contains('Center');
    cy.get('.pl-sm-120').contains('5');
  });
});


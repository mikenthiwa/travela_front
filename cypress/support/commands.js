const testToken = Cypress.env('token');

Cypress.Commands.add('authenticateUser', (token = testToken) => {
  cy.setCookie('jwt-token', token);
});

Cypress.Commands.add('uploadFile', (filePath,fileType) => {
  cy.fixture(filePath).then((logo) => {
    cy.get('input[type=file]').then(($input) => {
      return Cypress.Blob.base64StringToBlob(logo, fileType)
        .then((blob) => {
          const testFile = new File([blob], 'image', {
            type: fileType
          });
          const dataTransfer = new DataTransfer();
          const el = $input[0]
          dataTransfer.items.add(testFile)
          el.files = dataTransfer.files;
          return cy.wrap($input).trigger('change', {force: true});
        });
    });
  });
});

Cypress.Commands.add('openAndFillRoleForm', (email) => {
  cy.get('.action-btn').click();
  cy.get('.form-input > input')
    .type(email);
  cy.get('#submit').click();
});

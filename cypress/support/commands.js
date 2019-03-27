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
          const el = $input[0];
          dataTransfer.items.add(testFile);
          el.files = dataTransfer.files;
          return cy.wrap($input).trigger('change', {force: true});
        });
    });
  });
});

//Adds pdf document
Cypress.Commands.add('upload_pdf', (fileName, fileType, selector) => {
  return cy.get(selector).then(subject => {
    cy.fixture(fileName, 'base64')
      .then(Cypress.Blob.base64StringToBlob)
      .then(blob => {
        const el = subject[0];
        const testFile = new File([blob], fileName, {
          type: fileType
        });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(testFile);
        el.files = dataTransfer.files;
        return cy.wrap(subject).trigger('change', {force: true});
      });
  });
});

Cypress.Commands.add('openAndFillRoleForm', (email) => {
  cy.get('.action-btn').click();
  cy.get('.form-input > input')
    .type(email);
  cy.get('#submit').click();
});

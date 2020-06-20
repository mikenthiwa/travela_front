export const payload= {
  name: 'Reminder Template',
  from: 'moses.gitau@andela.com',
  cc: ['gitaumoses4@andela.com'],
  subject: 'This is the subject',
  message: 'This is the message'
};

export const response = {
  data: {
    success: false,
    message: 'Reminder Email Template created successfully',
    reminderEmailTemplate: {...payload}
  }
};

export const reminderEmailTemplate = {
  cc: [
    'super2.model@andela.com',
    'wonder24.woman@andela.com'
  ],
  id: 28,
  name: 'Test reminder email template',
  from: '4fr0c0d3.awesome@andela.com',
  subject: 'Test template',
  message: 'This is a test template with this amazing content',
  disabled: true,
  createdAt: '2019-01-22T18:09:09.986Z',
  updatedAt: '2019-01-22T19:57:19.619Z',
  deletedAt: null,
  createdBy: 1,
  creator: {
    id: 1,
    fullName: 'Super Modo',
    email: 'modo.sup3r@andela.com',
    department: 'Fellowship-Programs'
  }
};

export const updateTemplateResponse = {
  data: {
    success: true,
    message: 'Email template updated successfully',
    reminderEmailTemplate: {
      ...reminderEmailTemplate
    }
  }
};

export const getTemplateResponse = {
  data: {
    success: true,
    reminderEmailTemplate: {
      ...reminderEmailTemplate
    }
  }
};

export const errors = [{
  message : 'The name should be more than 5 characters',
  name: 'name'
}];

export const enableResponse = {
  data: {
    success: true,
    message: 'Reminder email template has been successfully enabled',
    updatedTemplate: {
      name: 'jxdddddddddddddd',
    },
  }
};

export const enableErrors = [{
  message : 'Possible network error',
}];

export const disablePayload = {
  template: {},
  reason: 'Not needed anymore'
};

export const disableResponse = {
  data: {
    success: false,
    message: 'Reminder Email Template successfully disabled',
    updatedTemplate: {
      disable: true,
      reason: disablePayload
    },
    reason: disablePayload.reason
  }
};

export const disableErrors = [{
  message : 'The reason is required',
  reason: 'reason'
}];

export default {
  payload,
  response,
  errors,
  getTemplateResponse
};

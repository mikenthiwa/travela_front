import { getItemsToCheck } from '../helper/travelChecklist-helper';

export const LagosSubmission =   {
  destinationName: 'Lagos, Nigeria',
  tripId: 'NumC5-pK7G',
  checklist: [
    {
      id: '9',
      name: 'yellow card',
      requiresFiles: false,
      destinationName: 'Lagos, Nigeria',
      deleteReason: null,
      resources: [],
      submissions: [
        {
          id: 'JGLqrmBEd',
          value: 'I submitted yellow card',
          tripId: 'NumC5-pK7G',
          checklistItemId: '9',
          createdAt: '2018-11-18T22:03:26.442Z',
          updatedAt: '2018-11-18T23:53:59.297Z',
          deletedAt: null,
          checklistSubmissions: {
            id: '9'
          }
        }
      ]
    },
    {
      id: '8',
      name: 'visa application',
      requiresFiles: true,
      destinationName: 'Lagos, Nigeria',
      deleteReason: null,
      resources: [],
      submissions: [
        {
          id: 'wY4s9r-29',
          value: {
            url: 'image.com',
            fileName: 'test.pdf'
          },
          tripId: 'NumC5-pK7G',
          checklistItemId: '8',
          createdAt: '2018-11-18T22:03:50.071Z',
          updatedAt: '2018-11-18T22:26:25.322Z',
          deletedAt: null,
          checklistSubmissions: {
            id: '8'
          }
        }
      ]
    },
    {
      id: '7',
      name: 'Travel stipend',
      requiresFiles: true,
      destinationName: 'Lagos, Nigeria',
      deleteReason: null,
      resources: [],
      submissions:[
        {
          id: 'fopl4zG0p',
          value: {
            url: 'image.com',
            fileName: 'test.png'
          },
          tripId: 'H5X8CVA0IR',
          checklistItemId: 9,
          documentId: null,
          createdAt: '2019-03-21T05:03:51.398Z',
          updatedAt: '2019-03-21T05:03:51.398Z',
          deletedAt: null,
          checklistSubmissions: {
            id: 9
          }
        }
      ]

    },
    {
      id: '3',
      name: 'Travel Ticket Details',
      requiresFiles: false,
      destinationName: 'Default',
      deleteReason: null,
      resources: [],
      submissions: [
        {
          id: 'yRCCSp0Oy',
          value: {
            departureTime: '2018-11-20T01:00',
            arrivalTime: '2018-11-20T01:00',
            airline: 'Arik Airways',
            ticketNumber: 'LG 777',
            returnDepartureTime: '2018-11-20T01:00',
            returnTime: '2018-11-20T01:00',
            returnTicketNumber: 'LG 555',
            returnAirline: ''
          },
          tripId: 'NumC5-pK7G',
          checklistItemId: '3',
          createdAt: '2018-11-18T22:04:32.606Z',
          updatedAt: '2018-11-18T22:04:32.606Z',
          deletedAt: null,
          checklistSubmissions: {
            id: '3'
          }
        }
      ]
    },
    {
      id: '10',
      name: 'Travel stipend',
      requiresFiles: true,
      destinationName: 'Lagos, Nigeria',
      deleteReason: null,
      resources: [],
      submissions:[]
    }
  ]
};

export const KampalaSubmission = {
  destinationName: 'Kampala, Uganda',
  checklist: [
    {
      id: '1',
      name: 'visa application',
      requiresFiles: true,
      destinationName: 'Kampala, Uganda',
      deleteReason: null,
      resources: [
        {
          id: '1',
          label: 'Application Guide',
          link: 'http://kigali.visa.com',
          checklistItemId: '1'
        }
      ],
      submissions: [
        {
          id: 'dpTfZ_0XX',
          value: {
            url: 'https://image.com',
            fileName: 'test-img.png'
          },
          tripId: 'TegwiWkL3',
          checklistItemId: '1',
          createdAt: '2018-11-18T22:02:53.476Z',
          updatedAt: '2018-11-18T22:29:45.157Z',
          deletedAt: null,
          checklistSubmissions: {
            id: '1'
          }
        }
      ]
    },
    {
      id: '2',
      name: 'travel stipend',
      requiresFiles: false,
      destinationName: 'Kampala, Uganda',
      deleteReason: null,
      resources: [],
      submissions: [
        {
          id: 'JMEfGF5m2',
          value: 'Ogooluwa is a boy\n',
          tripId: 'TegwiWkL3',
          checklistItemId: '2',
          createdAt: '2018-11-18T22:02:59.538Z',
          updatedAt: '2018-11-18T22:40:22.515Z',
          deletedAt: null,
          checklistSubmissions: {
            id: '2'
          }
        }
      ]
    },
    {
      id: '3',
      name: 'Travel Ticket Details',
      requiresFiles: false,
      destinationName: 'Default',
      deleteReason: null,
      resources: [],
      submissions: [
        {
          id: 'AbNCgwZlh',
          value: {
            arrivalTime: '16:02',
            airline: 'jhkjnbjkbvjh',
            ticketNumber: 'hhbjhvj',
            returnTime: '',
            returnTicketNumber: '',
            returnAirline: ''
          },
          tripId: 'TegwiWkL3',
          checklistItemId: '3',
          createdAt: '2018-11-18T22:03:17.050Z',
          updatedAt: '2018-11-18T22:03:21.432Z',
          deletedAt: null,
          checklistSubmissions: {
            id: '3'
          }
        }
      ]
    }
  ],
  tripId: 'TegwiWkL3'
};


export const aSubmission = {
  id: 'MtSjqm616', value: 'andela.com', tripId: 'NumC5-pK7G', checklistItemId: '9',
  createdAt: '2018-11-18T22:04:00.364Z', updatedAt: '2018-11-18T23:43:02.203Z', deletedAt: null
};

export const checklistSubmission = [LagosSubmission];

export const responseMessage = 'Checklist with submissions retrieved successfully';
export const percentageCompleted = 100;
export const requestId = 'request-123';
export const submissionSuccessResponse = {
  success: true, message: responseMessage, submission: aSubmission, percentageCompleted
};

export const checklistSubmissionResponse = {
  success: true, message: responseMessage, submissions: checklistSubmission, percentageCompleted
};

export const itemsToCheck = getItemsToCheck(checklistSubmission);
export const fileUploadStore = {
  isUploading: '', uploadSuccess: 'NumC5-pK7G-9', cloudinaryUrl: 'image.com', error: ''
};

export const submissionInfo = {
  isUploading: [], isLoading: false, isFetching: false, successStatus: false,
  tripType: '', postFail: false, postSuccess: [], requestId: '', itemsToCheck,
  successMessage: '', percentageCompleted: 0, fetchFailureMessage: '',
  fetchSuccessMessage: '', submissions: checklistSubmission,
};

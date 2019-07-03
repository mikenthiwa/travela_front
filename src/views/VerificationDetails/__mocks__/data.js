import _ from 'lodash';

export const verifiedRequest = {
  requestData: {
    id: 'nKUGXmTmn',
    name: 'Diana Ombati',
    tripType: 'return',
    manager: 1581,
    gender: 'Female',
    department: 'Fellows-TDD',
    role: 'Software Developer',
    status: 'Approved',
    userId: '2119',
    picture: 'https://lh5.googleusercontent.com/-g_DJc0cG_ZI/AAAAAAAAAAI/AAAAAAAAABE/i4Cvm2EMtSw/s96-c/photo.jpg',
    stipend: 0,
    budgetStatus: 'Approved',
    createdAt: '2019-06-27T12:13:13.803Z',
    updatedAt: '2019-06-27T12:13:53.690Z',
    deletedAt: null,
    tripModificationId: null,
    modifications: [],
    currentModification: null,
    comments: [],
    trips: [
      {
        id: 'GZywoqUm16',
        origin: 'Lagos, Nigeria',
        destination: 'Kampala, Uganda',
        departureDate: '2019-09-01',
        returnDate: '2019-09-08',
        checkStatus: 'Not Checked In',
        checkInDate: null,
        checkOutDate: null,
        accommodationType: 'Hotel Booking',
        lastNotifyDate: null,
        notificationCount: 0,
        travelCompletion: 'false',
        otherTravelReasons: null,
        createdAt: '2019-06-27T12:13:13.863Z',
        updatedAt: '2019-06-27T12:13:13.863Z',
        deletedAt: null,
        travelReasons: 2,
        bedId: null,
        requestId: 'nKUGXmTmn',
        reasons: {
          id: 2,
          title: 'working',
          description: 'Working for a cause',
          createdAt: '2019-06-19T10:16:27.996Z',
          updatedAt: '2019-06-19T10:16:27.996Z',
          deletedAt: null
        },
        beds: null
      }
    ],
    approver: 1581,
    timeApproved: '2019-06-27T12:13:53.682Z',
    approverImage: 'https://lh5.googleusercontent.com/-g_DJc0cG_ZI/AAAAAAAAAAI/AAAAAAAAABE/i4Cvm2EMtSw/s96-c/photo.jpg',
    budgetApprovedBy: 'Diana Ombati',
    budgetApprovedAt: '2019-06-27T00:00:00.000Z'
  },
  comments: []
};

const requests = {
  requestData: {
    comments: [
      {
        comment:
          '<p>testing <strong>#b5tdJCef7 #b5tdJCef7 #b5tdJCef7 #b5tdJCef7 #b5tdJCef7</strong></p>',
        createdAt: '2019-02-26T16:29:13.579Z',
        deletedAt: null,
        documentId: null,
        id: 'b-PDWlDkm',
        isEdited: false,
        requestId: 'b5tdJCef7',
        updatedAt: '2019-02-26T16:29:13.579Z',
        user: {
          createdAt: '2019-02-25T10:54:30.214Z',
          department: 'Fellowship-Programs',
          email: 'christopher.akanmu@andela.com',
          fullName: 'Christopher Akanmu',
          gender: 'Male',
          id: 1,
          location: 'Lagos',
          manager: 'Christopher Akanmu',
          occupation: 'Technical Team Lead',
          passportName: 'Christopher Akanmu',
          picture:
            'https://lh3.googleusercontent.com/-0IiIxTNUkIY/AAAAAAAAAAI/AAAAAAAAAAc/bjqhX-Jagqc/photo.jpg?sz=50',
          updatedAt: '2019-02-27T12:44:18.033Z',
          userId: '-LVoI8g-LZGO0W4S2xRt'
        },
        userId: 1
      }
    ],
    createdAt: '2019-02-25T10:59:03.299Z',
    deletedAt: null,
    department: 'Fellowship-Programs',
    gender: 'Male',
    id: 'nXCj4U57J',
    manager: 'Christopher Akanmu',
    name: 'Christopher Akanmu',
    picture:
      'https://lh3.googleusercontent.com/-0IiIxTNUkIY/AAAAAAAAAAI/AAAAAAAAAAc/bjqhX-Jagqc/photo.jpg?sz=50',
    role: 'Technical Team Lead',
    status: 'Approved',
    tripType: 'oneWay',
    stipend: [
      {
        subTotal: 600,
        location: 'New York, United States',
        dailyRate: 300,
        duration: 2,
        centerExists: true
      }
    ],
    trips: [
      {
        accommodationType: 'Hotel Booking',
        bedId: null,
        beds: null,
        checkInDate: null,
        checkOutDate: null,
        checkStatus: 'Not Checked In',
        createdAt: '2019-02-25T10:59:03.310Z',
        deletedAt: null,
        departureDate: '2019-02-25',
        destination: 'New York, United States',
        id: 'M8M9iehHfO',
        lastNotifyDate: null,
        notificationCount: 0,
        origin: 'Lagos, Nigeria',
        otherTravelReasons: 'Travelling for fun',
        reasons: null,
        requestId: 'nXCj4U57J',
        returnDate: '2019-03-25',
        travelCompletion: 'false',
        travelReasons: null,
        updatedAt: '2019-02-25T11:41:30.437Z'
      }
    ],
    updatedAt: '2019-02-25T10:59:03.299Z',
    userId: '-LVoI8g-LZGO0W4S2xRt'
  },
  fetchingRequest: false
};

const user = {
  currentUser: {
    id: 1,
    fullName: 'Christopher Akanmu',
    email: 'christopher.akanmu@andela.com',
    userId: '-LVoI8g-LZGO0W4S2xRt',
    passportName: 'Christopher Akanmu',
    department: 'Fellowship-Programs',
    occupation: 'Technical Team Lead',
    manager: 'Christopher Akanmu',
    gender: 'Male',
    picture:
      'https://lh3.googleusercontent.com/-0IiIxTNUkIY/AAAAAAAAAAI/AAAAAAAAAAc/bjqhX-Jagqc/photo.jpg?sz=50',
    location: 'Lagos',
    createdAt: '2019-02-25T10:54:30.214Z',
    updatedAt: '2019-02-27T12:44:18.033Z',
    roles: [
      {
        roleName: 'Travel Administrator',
        centers: [
          {
            location: 'Nigeria'
          }
        ]
      }
    ]
  },
  getUserData: {
    success: true,
    message: 'data',
    result: {
      id: 1,
      fullName: 'Christopher Akanmu',
      email: 'christopher.akanmu@andela.com',
      userId: '-LVoI8g-LZGO0W4S2xRt',
      passportName: 'Christopher Akanmu',
      department: 'Fellowship-Programs',
      occupation: 'Technical Team Lead',
      manager: 'Christopher Akanmu',
      gender: 'Male',
      picture:
        'https://lh3.googleusercontent.com/-0IiIxTNUkIY/AAAAAAAAAAI/AAAAAAAAAAc/bjqhX-Jagqc/photo.jpg?sz=50',
      location: 'Lagos',
      createdAt: '2019-02-25T10:54:30.214Z',
      updatedAt: '2019-02-27T12:44:18.033Z'
    }
  }
};

const comments = {
  creatingComment: false,
  editingComment: false,
  deletingComment: false,
  comment: '',
  comments: [
    {
      comment:
        '<p>testing <strong>#b5tdJCef7 #b5tdJCef7 #b5tdJCef7 #b5tdJCef7 #b5tdJCef7</strong></p>',
      createdAt: '2019-02-26T16:29:13.579Z',
      deletedAt: null,
      documentId: null,
      id: 'b-PDWlDkm',
      isEdited: false,
      requestId: 'b5tdJCef7',
      updatedAt: '2019-02-26T16:29:13.579Z',
      user: {
        createdAt: '2019-02-25T10:54:30.214Z',
        department: 'Fellowship-Programs',
        email: 'christopher.akanmu@andela.com',
        fullName: 'Christopher Akanmu',
        gender: 'Male',
        id: 1,
        location: 'Lagos',
        manager: 'Christopher Akanmu',
        occupation: 'Technical Team Lead',
        passportName: 'Christopher Akanmu',
        picture:
          'https://lh3.googleusercontent.com/-0IiIxTNUkIY/AAAAAAAAAAI/AAAAAAAAAAc/bjqhX-Jagqc/photo.jpg?sz=50',
        updatedAt: '2019-02-27T12:44:18.033Z',
        userId: '-LVoI8g-LZGO0W4S2xRt'
      },
      userId: 1
    }
  ]
};

const modal = {
  modal: { shouldOpen: false }
};
const approvals = {
  updatedStatus: false,
  updatingStatus: false
};


export const props = {
  fetchUserRequestDetails: jest.fn(),
  fetchAttachments: jest.fn(),
  updateRequestStatus: jest.fn(),
  downloadAttachments: jest.fn(),
  submissionInfo: {
    submissions : [
      {
        destinationName: 'Uganda',
        checklist:[
          {
            id: 1,
            name: 'Travel Ticket Details',
            requiresFiles: false,
            destinationName: 'Default',
            deleteReason: null,
            resources:[{
              id: 1,
              label: 'Flight Application Guide',
              link: 'https://docs.google.com/document/d/17vOCjPE3sgG2OSYV_3ZcpzCg1IbD7dCO8cVa8aBDN_M/edit?usp=drivesdk',
              checklistItemId: 1
            }
            ],
            submissions:[{
              id: 'M_AIwdHjx',
              userResponse: 'null',
              userUpload:{
                departureTime: '2019-07-01T15:30',
                arrivalTime: '2019-07-02T15:30',
                airline: 'kenya',
                flightNumber: '200 kl'
              },
              tripId: 'BhYrCehG0y',
              checklistItemId: 1,
              documentId: null,
              createdAt: '2019-06-28T13:04:43.009Z',
              updatedAt: '2019-06-28T13:04:58.630Z',
              deletedAt: null,
              checklistsubmissions:{
                id: 1
              }
            }]
          },
          {
            id: 2,
            name: 'Travel Ticket',
            requiresFiles: true,
            destinationName: 'Default',
            deleteReason: null,
            resources:[],
            submissions:[{
              id: 'Hy37HaBU6',
              userResponse: 'null',
              userUpload:{
                url: 'https://res.cloudinary.com/authors-haven/image/upload/v1561377750/dwbogtwostrvfvghvluh.jpg',
                fileName: '61b36a8679a3be840e93679c0bf4cbcb (3).jpg'
              },
              tripId: 'BhYrCehG0y',
              checklistItemId: '2',
              documentId: null,
              createdAt: '2019-06-24T12:02:31.395Z',
              updatedAt: '2019-06-24T12:02:31.395Z',
              deletedAt: null,
              checklistSubmissions:{
                id: 2
              }
            }]
          }
        ],
        tripId: 'BhYrCehG0y',
        tripLocation: 'Kampala, Uganda',
        tripOrigin: 'Kenya'
      }
    ],
    isUploading: [], 
    percentageCompleted: 80,
    itemsToCheck: [], 
    postSuccess: [], 
    tripType: 'return',
  },
  match: {
    params: {
      requestId: 'nXCj4U57J'
    }
  },
  location: {
    pathname: '/requests/my-approvals/requestId'
  },
  history: {
    goBack: jest.fn()
  },
  travelCosts: {
    stipends: []
  }
};

export const noSubmissions = {
  fetchUserRequestDetails: jest.fn(),
  fetchAttachments: jest.fn(),
  updateRequestStatus: jest.fn(),
  downloadAttachments: jest.fn(),
  submissionInfo: {
    submissions : [
      {
        destinationName: 'Uganda',
        checklist:[
          {
            id: 1,
            name: 'Travel Ticket Details',
            requiresFiles: false,
            destinationName: 'Uganda',
            deleteReason: null,
            resources:[{
              id: 1,
              label: 'Flight Application Guide',
              link: 'https://docs.google.com/document/d/17vOCjPE3sgG2OSYV_3ZcpzCg1IbD7dCO8cVa8aBDN_M/edit?usp=drivesdk',
              checklistItemId: 1
            }
            ],
            submissions:[]
          },
          {
            id: 2,
            name: 'Travel Ticket',
            requiresFiles: true,
            destinationName: 'Uganda',
            deleteReason: null,
            resources:[],
            submissions:[{
              id: 'Hy37HaBU6',
              userResponse: 'null',
              userUpload:{
                url: 'https://res.cloudinary.com/authors-haven/image/upload/v1561377750/dwbogtwostrvfvghvluh.jpg',
                fileName: '61b36a8679a3be840e93679c0bf4cbcb (3).jpg'
              },
              tripId: 'BhYrCehG0y',
              checklistItemId: '2',
              documentId: null,
              createdAt: '2019-06-24T12:02:31.395Z',
              updatedAt: '2019-06-24T12:02:31.395Z',
              deletedAt: null,
              checklistSubmissions:{
                id: 2
              }
            }]
          }
        ],
        tripId: 'BhYrCehG0y',
        tripLocation: 'Kampala, Uganda',
        tripOrigin: 'Kenya'
      }
    ],
    isUploading: [],
    percentageCompleted: 80,
    itemsToCheck: [],
    postSuccess: [],
    tripType: 'return',
  },
  match: {
    params: {
      requestId: 'nXCj4U57J'
    }
  },
  location: {
    pathname: '/requests/my-approvals/requestId'
  },
  history: {
    goBack: jest.fn()
  },
  travelCosts: {
    stipends: []
  }
};


export const initialState = {
  requests,
  user,
  comments,
  modal,
  tripModifications: {
    updateRequest: {}
  },
  attachments: {
    submissions: [
      {
        destinationName: 'Kampala, Uganda',
        checklist: [
          {
            id: 'PUk9KCG-7',
            name: 'Yellow Fever Certificate',
            requiresFiles: true,
            destinationName: 'Lagos, Nigeria',
            submissions: [
              {
                id: 'FLkx_xe9f',
                userUpload: {
                  url: 'some.url.com',
                  fileName: 'somefile.jpg'
                },
                updatedAt: '2019-03-04T16:17:54.739Z'
              }
            ]
          },
          {
            id: 'PUk9445uui',
            name: 'Checklist Item',
            requiresFiles: false,
            destinationName: 'Nairobi, Kenya',
            submissions: [
              {
                userUpload: 'Some Value',
                updatedAt: '2019-04-04T16:17:54.739Z'
              }
            ]
          },
          {
            id: 'PUk9445uui',
            name: 'Another Checklist Item',
            requiresFiles: false,
            destinationName: 'Nairobi, Kenya',
            submissions: []
          },
          {
            id: '1',
            name: 'Travel Ticket Details',
            destinationName: 'Kampala, Uganda',
            submissions: [
              {
                id: 'mspJ6ew9K',
                userUpload: {
                  departureTime: '2019-03-11T15:00',
                  arrivalTime: '2019-03-12T00:00',
                  airline: 'Nai Air',
                  ticketNumber: '112233445'
                }
              }
            ]
          }
        ]
      }
    ]
  },
  submissions: props.submissionInfo,
  approvals
};

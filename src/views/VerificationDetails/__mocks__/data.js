const requests = {
  requestData: {
    comments: [{
      comment: '<p>testing <strong>#b5tdJCef7 #b5tdJCef7 #b5tdJCef7 #b5tdJCef7 #b5tdJCef7</strong></p>',
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
        picture: 'https://lh3.googleusercontent.com/-0IiIxTNUkIY/AAAAAAAAAAI/AAAAAAAAAAc/bjqhX-Jagqc/photo.jpg?sz=50',
        updatedAt: '2019-02-27T12:44:18.033Z',
        userId: '-LVoI8g-LZGO0W4S2xRt',
      },
      userId: 1
    }],
    createdAt: '2019-02-25T10:59:03.299Z',
    deletedAt: null,
    department: 'Fellowship-Programs',
    gender: 'Male',
    id: 'nXCj4U57J',
    manager: 'Christopher Akanmu',
    name: 'Christopher Akanmu',
    picture: 'https://lh3.googleusercontent.com/-0IiIxTNUkIY/AAAAAAAAAAI/AAAAAAAAAAc/bjqhX-Jagqc/photo.jpg?sz=50',
    role: 'Technical Team Lead',
    status: 'Approved',
    tripType: 'oneWay',
    trips: [{
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
    }],
    updatedAt: '2019-02-25T10:59:03.299Z',
    userId: '-LVoI8g-LZGO0W4S2xRt'
  },
  fetchingRequest: false,
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
    picture: 'https://lh3.googleusercontent.com/-0IiIxTNUkIY/AAAAAAAAAAI/AAAAAAAAAAc/bjqhX-Jagqc/photo.jpg?sz=50',
    location: 'Lagos',
    createdAt: '2019-02-25T10:54:30.214Z',
    updatedAt: '2019-02-27T12:44:18.033Z'
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
      picture: 'https://lh3.googleusercontent.com/-0IiIxTNUkIY/AAAAAAAAAAI/AAAAAAAAAAc/bjqhX-Jagqc/photo.jpg?sz=50',
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
  comments: [{
    comment: '<p>testing <strong>#b5tdJCef7 #b5tdJCef7 #b5tdJCef7 #b5tdJCef7 #b5tdJCef7</strong></p>',
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
      picture: 'https://lh3.googleusercontent.com/-0IiIxTNUkIY/AAAAAAAAAAI/AAAAAAAAAAc/bjqhX-Jagqc/photo.jpg?sz=50',
      updatedAt: '2019-02-27T12:44:18.033Z',
      userId: '-LVoI8g-LZGO0W4S2xRt',
    },
    userId: 1
  }]
};
  
export const initialState = {
  requests,
  user,
  comments,
  attachments: { submissions: [
    { destinationName: 'Kampala, Uganda',
      checklist: [
        {
          id: 'PUk9KCG-7',
          name: 'Yellow Fever Certificate',
          requiresFiles: true,
          destinationName: 'Lagos, Nigeria',
          submissions: [{
            id: 'FLkx_xe9f',
            value: {
              url: 'some.url.com',
              fileName: 'somefile.jpg'
            },
            updatedAt: '2019-03-04T16:17:54.739Z',
          }]
        },
        {
          id: 'PUk9445uui',
          name: 'Checklist Item',
          requiresFiles: false,
          destinationName: 'Nairobi, Kenya',
          submissions: [{
            value: 'Some Value',
            updatedAt: '2019-04-04T16:17:54.739Z',
          }]
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
          submissions: [{
            id: 'mspJ6ew9K',
            value: {
              departureTime: '2019-03-11T15:00',
              arrivalTime: '2019-03-12T00:00',
              airline: 'Nai Air',
              ticketNumber: '112233445',            
            }
          }]
        },
      ]
    }
  ]},
};


  
export const props = {
  fetchUserRequestDetails: jest.fn(),
  fetchAttachments: jest.fn(),
  updateRequestStatus: jest.fn(),
  downloadAttachments: jest.fn(),
  match: {
    params: {
      requestId: 'nXCj4U57J'
    }
  },
  location: {
    pathname: '/requests/my-approvals/requestId'
  }
};


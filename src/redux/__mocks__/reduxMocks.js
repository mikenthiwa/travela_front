export const fetchRequestsResponse = {
  requests: [
    {
      id: 'xDh20btGz',
      name: 'Amarachukwu Agbo',
      origin: 'Lagos',
      destination: 'Nairobi',
      manager: 'Samuel Kubai',
      gender: 'Female',
      department: 'TDD',
      role: 'Software Developer',
      status: 'Open',
      userId: 'pommyLHJmKrx76A8Slm',
      departureDate: '2018-12-09',
      arrivalDate: '2018-12-11',
    },
  ],
  meta: {
    count: {
      open: 1,
      past: 2,
    },
    pagination: {
      currentPage: 1,
      pageCount: 1,
      dataCount: 1,
    },
  },
  message: 'Requests retrieved successfully'
};

export const createRequestMock = {
  requestObj: {
    name: 'Ademola Ariya',
    origin: 'Lagos',
    destination: 'New York',
    manager: 'Samuel Kubai'
  }
};

export const createStipendMock = {
  requestObj: {
    center: 'Kigali',
    stipend: 1234
  }
};

export const fetchRoleUsersResponse = {
  id: 53019,
  roleName: 'Manager',
  description: 'Can request and approve travel request ',
  createdAt: '2018-08-16T11:11:52.181Z',
  updatedAt: '2018-08-16T11:11:52.181Z',
  users: [
    {
      email: 'test.user@andela.com',
      fullName: 'Test User'
    }
  ],
  meta: {
    currentPage: 1,
    count: 1,
    pageCount: 1,
  }
};

export const fetchTeammatesResponse = {
  teammates: [
    {
      name: 'Alice Doe',
      picture: 'https://randomuser.me/api/portraits/men/25.jpg',
      destination: 'Lagos',
      departureDate: '2019-10-16',
      returnDate: '2018-07-20'
    }
  ]
};

export const fetchRequestsCommentsResponse = {
  id: 'xGh30atGz',
  comment: 'See you next week',
  createdAt: '2018-08-16T11:11:52.181Z',
  updatedAt: '2018-08-16T11:11:52.181Z',
};

export const fetchRequestsDetailsResponse = {
  requestData: {
    id: 'xDh20cuGx',
    name: 'Test user C',
    origin: 'Lagos',
    destination: 'Nairobi',
    manager: 'Samuel Kubai',
    department: 'TDD',
    role: 'Software Developer',
    departureDate: '2018-09-12',
    arrivalDate: '2018-11-12',
    createdAt: '2018-09-04T10:38:12.141Z',
    updatedAt: '2018-09-04T10:38:12.141Z',
    trips: [],
    comments: [
      {
        id: 'xGh30atGz',
        comment: 'See you next week',
        createdAt: '2018-08-16T11:11:52.181Z',
        updatedAt: '2018-08-16T11:11:52.181Z',
      },
      {
        id: 'xGh30atGl',
        comment: 'See you next two weeks',
        createdAt: '2018-08-17T11:11:52.181Z',
        updatedAt: '2018-08-17T11:11:52.181Z',
      }
    ]
  }
};

export const userImage = {
  user: {
    UserInfo:{
      picture: 'http://my-image'
    },
  }
};

export const userEmail = {
  getUserData: {
    result:{
      email: 'hari2@gmail.com'
    }
  }
};

export const tripsResponse = {
  success: true,
  trips: [
    {
      id: '3',
      origin: 'New York',
      destination: 'Nairobi',
      departureDate: '2018-09-27',
      returnDate: '2018-10-04',
      checkStatus: 'Checked In',
      checkInDate: '2018-09-30T22:36:05.261Z',
      checkOutDate: null,
      lastNotifyDate: '2018-09-30T21:46:35.295Z',
      notificationCount: 1,
      createdAt: '2018-09-30T21:46:35.031Z',
      updatedAt: '2018-09-30T22:36:05.261Z',
      bedId: 1,
      requestId: 'xDh20cuGx',
      request: {
        id: 'xDh20cuGx',
        name: 'Stephen Neutron',
        tripType: 'multi',
        manager: 'Samuel Kubai',
        gender: 'Female',
        department: 'TDD',
        role: 'Software Developer',
        status: 'Approved',
        userId: '-LMZI3qQ7GE6ETe4icAL',
        createdAt: '2018-09-30T21:46:35.026Z',
        updatedAt: '2018-09-30T21:46:35.026Z'
      },
      beds: {
        id: 1,
        bedName: 'bed 1',
        createdAt: '2018-09-30T21:46:35.013Z',
        updatedAt: '2018-09-30T21:46:35.013Z',
        roomId: 'eyt233l2bC',
        rooms: {
          id: 'eyt233l2bC',
          roomName: 'big cutter',
          roomType: 'ensuited',
          bedCount: 1,
          faulty: false,
          createdAt: '2018-09-30T21:46:35.008Z',
          updatedAt: '2018-09-30T21:46:35.008Z',
          guestHouseId: '49RuqRI3E',
          guestHouses: {
            id: '49RuqRI3E',
            houseName: 'Mini flat',
            location: 'Lagos Nigeria',
            bathRooms: 1,
            imageUrl: 'https://www.lol.com',
            genderPolicy: 'unisex',
            createdAt: '2018-09-30T21:46:35.003Z',
            updatedAt: '2018-09-30T21:46:35.003Z',
            userId: '-MUyHJmKrxA90lPNQ1FOLNm'
          }
        }
      }
    },
  ],
  message: 'Retrieved Successfully'
};

export const notCheckInTrips = {
  success: true,
  trips: [
    {
      id: '3',
      origin: 'New York',
      destination: 'Nairobi',
      departureDate: '2018-09-27',
      returnDate: '2025-10-04',/* Extend date to some far away date */
      checkStatus: 'Not Checked In',
      checkInDate: null,
      checkOutDate: null,
      lastNotifyDate: null,
      notificationCount: 0,
      createdAt: '2018-09-30T21:46:35.031Z',
      updatedAt: '2018-09-30T22:36:05.261Z',
      bedId: 1,
      requestId: 'xDh20cuGx',
      request: {
        id: 'xDh20cuGx',
        name: 'Stephen Neutron',
        tripType: 'multi',
        manager: 'Samuel Kubai',
        gender: 'Female',
        department: 'TDD',
        role: 'Software Developer',
        status: 'Approved',
        userId: '-LMZI3qQ7GE6ETe4icAL',
        createdAt: '2018-09-30T21:46:35.026Z',
        updatedAt: '2018-09-30T21:46:35.026Z'
      },
      beds: {
        id: 1,
        bedName: 'bed 1',
        createdAt: '2018-09-30T21:46:35.013Z',
        updatedAt: '2018-09-30T21:46:35.013Z',
        roomId: 'eyt233l2bC',
        rooms: {
          id: 'eyt233l2bC',
          roomName: 'big cutter',
          roomType: 'ensuited',
          bedCount: 1,
          faulty: false,
          createdAt: '2018-09-30T21:46:35.008Z',
          updatedAt: '2018-09-30T21:46:35.008Z',
          guestHouseId: '49RuqRI3E',
          guestHouses: {
            id: '49RuqRI3E',
            houseName: 'Mini flat',
            location: 'Lagos Nigeria',
            bathRooms: 1,
            imageUrl: 'https://www.lol.com',
            genderPolicy: 'unisex',
            createdAt: '2018-09-30T21:46:35.003Z',
            updatedAt: '2018-09-30T21:46:35.003Z',
            userId: '-MUyHJmKrxA90lPNQ1FOLNm'
          }
        }
      }
    },
  ],
  message: 'Retrieved Successfully'
};

export const updateTripResponse = {
  success: true,
  trip: {
    id: '3',
    origin: 'New York',
    destination: 'Nairobi',
    departureDate: '2018-09-27',
    returnDate: '2018-10-04',
    checkStatus: 'Checked In',
    checkInDate: '2018-09-30T22:36:05.261Z',
    checkOutDate: null,
    lastNotifyDate: '2018-09-30T21:46:35.295Z',
    notificationCount: 1,
    createdAt: '2018-09-30T21:46:35.031Z',
    updatedAt: '2018-09-30T22:36:05.261Z',
    bedId: 1,
    requestId: 'xDh20cuGx',
    request: {
      id: 'xDh20cuGx',
      name: 'Stephen Neutron',
      tripType: 'multi',
      manager: 'Samuel Kubai',
      gender: 'Female',
      department: 'TDD',
      role: 'Software Developer',
      status: 'Approved',
      userId: '-LMZI3qQ7GE6ETe4icAL',
      createdAt: '2018-09-30T21:46:35.026Z',
      updatedAt: '2018-09-30T21:46:35.026Z'
    }
  },
  message: 'Updated Successfully'
};
export const fetchOccupationsResponse ={
  'data': {
    'occupations': [
      {
        'id': 1,
        'occupationName': 'success manager',
        'createdAt': '2018-09-27T13:57:13.898Z',
        'updatedAt': '2018-09-27T13:57:13.898Z'
      },
      {
        'id': 2,
        'occupationName': 'accounts manager',
        'createdAt': '2018-09-27T13:57:13.898Z',
        'updatedAt': '2018-09-27T13:57:13.898Z'
      },
    ]}
};

export const updateTripRoomResponse = {
  success: true,
  trip: {
    id: 'G5qZlv2j2P',
    origin: 'Lagos, Nigeria',
    destination: 'Nice, France',
    departureDate: '2018-10-10',
    returnDate: '2018-10-20',
    checkStatus: 'Checked In',
    checkInDate: '2018-10-10T10:51:30.134Z',
    checkOutDate: null,
    lastNotifyDate: null,
    notificationCount: 0,
    createdAt: '2018-10-10T10:43:07.642Z',
    updatedAt: '2018-10-10T11:53:52.604Z',
    bedId: '12',
    requestId: '2xrO2f_Qx'
  },
  message: 'Updated Successfully'
};

export const fetchDepartmentsTripsResponse = {
  success: true,
  data: [
    {
      label: 'Success',
      value: 2
    },
    {
      label: 'Talent & Development',
      value: 3
    }
  ]
};

export const fetchDepartmentsTripsError = {
  success: false,
  message: 'Validation failed',
  errors: [
    {
      message: 'type must be \'json\' or \'file\'',
      name: 'type'
    }
  ]
};
export const fetchReadinessResponse = {
  readiness: {
    sucess:true,
    readiness: [
      {
        departureDate: '2018-10-04',
        request: {
          name: 'Lazuli Doe'
        },
        travelReadiness: '0% complete',
        arrivalDate: '2018-10-05T00:00:00.000Z'
      },
    ],
    pagination: {
      pageCount: 1,
      currentPage: 1,
      dataCount:13
    }
  }
};

export const fetchTravelCalendarResponse = {
  'data': [
    {
      name: 'Harrison Maina',
      department: 'Apprenticeship Department',
      role: 'Product designer',
      flights: {
        arrival: {
          destination: 'Lagos',
          airline: 'Kenya Airways',
          flightNo: 'KQ5752',
          arrivalTime: '24/10/2018 13:23:33',
          departureTime: '24/10/2018 13:23:33'
        },
        departure: {
          destination: 'Nairobi',
          airline: 'Kenya Airways',
          flightNo: 'KQ5752',
          arrivalTime: '24/10/2018 13:23:33',
          departureTime: '24/10/2018 13:23:33'
        }
      }
    }

  ],
  pagination: {
    total: 30,
    current_page: 1,
    limit: 13,
    nextPage: 2,
    prevPage: null
  }
};

export const passportDetails  = {
  'name': 'Mike',
  'passportNumber': 'ABC123aemlbczy85',
  'nationality': 'Kenyan ',
  'dateOfBirth': '12/01/1998',
  'dateOfIssue': '12/10/2018',
  'placeOfIssue': 'Kenya',
  'expiryDate': '11/11/2019',
  'cloudinaryUrl': 'https://farm4.staticflickr.com/3894/15008518202_c265dfa55f_h.jpeg'
};
export const fetchTravelReadinessResponse = {
  'passport': {...passportDetails}
};


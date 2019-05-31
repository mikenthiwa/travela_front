export const expectedResponse = {
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
      arrivalDate: '2018-12-11'
    }
  ],
  meta: {
    count: {
      open: 1,
      past: 2
    },
    pagination: {
      currentPage: 1,
      pageCount: 1,
      dataCount: 1
    }
  },
  message: 'Requests retrieved successfully'
};

export const userResponse = {
  user: {
    success: true,
    message: 'data',
    result: {
      id: 1,
      fullName: 'captain america',
      email: 'captain.america@andela.com',
      userId: 'JFENDVNDK',
      createdAt: '2018-09-03T17:09:05.824Z',
      updatedAt: '2018-09-03T17:09:05.824Z',
      roleId: 401938,
      roles: {
        roleName: 'Requester',
        description: 'Can make travel request'
      }
    }
  }
};

export const roleResponses = {
  success: true,
  message: 'data',
  result: [
    {
      id: 401938,
      roleName: 'Requester',
      description: 'Can make travel request',
      createdAt: '2018-08-16T11:11:52.181Z',
      updatedAt: '2018-08-16T11:11:52.181Z',
      users: [
        {
          email: 'captain.america@andela.com'
        },
      ]
    },
    {
      id: 53019,
      roleName: 'Manager',
      description: 'Can request and approve travel request ',
      createdAt: '2018-08-16T11:11:52.181Z',
      updatedAt: '2018-08-16T11:11:52.181Z',
      users: [
        {
          email: 'luke.cage@andela.com'
        }

      ]
    },
  ]
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

export const singleTripResponse = {
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
export const occupationResponses = {
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
    }]
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

export const fetchTeammatesResponse = {
  success: true,
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

export const fetchAnalyticsResponse = {
  dats: {
    total_requests: 1,
    pending_requests: 1,
    people_visiting: 0,
    people_leaving: 1,
    travel_duration_breakdown: {
      durations: [
        {
          name: '4 days',
          value: 1
        }
      ],
      total: 1
    },
    travel_lead_time_breakdown: {
      lead_times: [
        {
          name: '1 days',
          value: 1
        }
      ],
      total: 1
    }
  },
  error: {},
  isLoading: false,
  success: true,
};

export const fetchReadinessResponse = {
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
  ]
};

export const fetchTravelCalendarResponse = {
  'data': [{
    'name': 'Barrison Waina',
    'department': 'Apprenticeship Department',
    'role': 'Product designer',
    'flights': {
      'arrival': {
        'destination': 'Lagos',
        'airline': 'Kenya Airways',
        'flight_no': 'KQ5752',
        'arrival_time': '24/10/2018 13:23:33',
        'depature_time': '24/10/2018 13:23:33'
      },
      'depature': {
        'destination': 'Nairobi',
        'airline': 'Kenya Airways',
        'flight_no': 'KQ5752',
        'arrival_time': '24/10/2018 13:23:33',
        'depature_time': '24/10/2018 13:23:33'
      }
    }
  }],
  'pagination': {
    'total': 30,
    'current_page': 1,
    'limit': 13,
    'nextPage': 2,
    'prevPage': null
  }
};

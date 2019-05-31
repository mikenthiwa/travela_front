export const response =  {
  'success': true,
  'message': 'Guest House created successfully',
  'guestHouse': {
    'houseName': 'Small Lagos ',
    'location': 'Lagos Nigeria',
    'bathRooms': 5,
    'imageUrl': 'https://res.cloudinary.com/jpg',
    'genderPolicy': 'unisex',
    'userId': '-LHJlGhZ9HiNldVt-jB-',
    'id': '8gsGdpeON',
    'updatedAt': '2018-10-03T12:02:01.359Z',
    'createdAt': '2018-10-03T12:02:01.359Z'
  },
  'rooms': [
    {
      'id': 'YHy5KywQG5',
      'roomName': 'big cutter',
      'roomType': 'ensuited',
      'bedCount': '1',
      'faulty': false,
      'createdAt': '2018-10-03T12:02:01.364Z',
      'updatedAt': '2018-10-03T12:02:01.364Z',
      'guestHouseId': '8gsGdpeON'
    },
    {
      'id': '5mV6-k5rk_',
      'roomName': 'small cutter',
      'roomType': 'non-ensuited',
      'bedCount': '1',
      'faulty': false,
      'createdAt': '2018-10-03T12:02:01.364Z',
      'updatedAt': '2018-10-03T12:02:01.364Z',
      'guestHouseId': '8gsGdpeON'
    }
  ],
  'bed': [
    [
      {
        'id': 1,
        'roomId': 'YHy5KywQG5',
        'bedName': 'bed 1',
        'updatedAt': '2018-10-03T12:02:01.371Z',
        'createdAt': '2018-10-03T12:02:01.371Z'
      },
    ],
    [
      {
        'id': 8,
        'roomId': '5mV6-k5rk_',
        'bedName': 'bed 1',
        'updatedAt': '2018-10-03T12:02:01.372Z',
        'createdAt': '2018-10-03T12:02:01.372Z'
      },
    ]
  ]
};

export const guestHouse = {
  'houseName': 'Small Lagos ',
  'location': 'Lagos Nigeria',
  'bathRooms': '5',
  'imageUrl': 'https://res.cloudinary.com/jpg',
  'genderPolicy': 'unisex',
  'rooms': [
    {
      'roomName': 'big cutter',
      'roomType': 'ensuited',
      'bedCount': '1'
    },
    {
      'roomName': 'small cutter',
      'roomType': 'non-ensuited',
      'bedCount': '1'
    }
  ]
};

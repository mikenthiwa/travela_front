const mockData = {
  stipends: [
    {
      id:1,
      center: {location: 'Nairobi, Kenya'},
      amount: 345
    },
    {
      id:2,
      center: {location: 'Kampala, Uganda'},
      amount: 345
    }
  ],

  selectedStipend: {
    id: 29,
    amount: 500,
    creator: {fullName:'Mirriam Maina',id:1},
    center: {location:'Kampala, Uganda'}
  },

  action: {
    stipendId: 5,
    payload: {
      stipend: 30000
    }
  },
  response: {
    data: {
      message: 'Travel stipend updated successfully',
      travelStipend: {
        id: 5,
        amount: 1000,
        centerId: 78901,
        creator: {
          id: 1001,
          fullName: 'Super Modo',
          email: 'super.modo@andela.com'
        }
      }
    }
  },

  validationError: {
    response: {
      status: 422,
      message: 'Validation failed',
      data: {
        errors: [
          {
            message: 'stipend has not been provided',
            name: 'stipend'
          }
        ]
      }
    }
  },

  otherError: {
    response: {
      status: 400,
      message: 'Bad Request',
      data: {
        errors: [
          {
            message: 'stipend has not been provided'
          }
        ]
      }
    }
  }
};

export default mockData;

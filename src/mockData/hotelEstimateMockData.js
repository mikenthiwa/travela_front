const mockData = {
  estimates: [
    {
      id: 52,
      amount: 1000,
      createdBy: {
        id: 992,
        name: 'Sylvia Mbugua'
      },
      region: 'North Africa'
    },
    {
      id: 51,
      amount: 100,
      createdBy: {
        id: 992,
        name: 'Sylvia Mbugua'
      },
      region: 'Kenya'
    },
    {
      id: 53,
      amount: 150,
      createdBy: {
        id: 992,
        name: 'Sylvia Mbugua'
      },
      region: 'South Africa'
    },
    {
      id: 54,
      amount: 15,
      createdBy: {
        id: 992,
        name: 'Sylvia Mbugua'
      },
      region: 'East Africa'
    }
  ],
  countriesWithEstimates: ['Uganda'],
  selectedEstimate: {
    success: true,
    hotelEstimate: {
      id: 53,
      amount: 150,
      countryId: null,
      regionId: 1002,
      createdBy: 992,
      deletedAt: null,
      createdAt: '2019-05-27T10:25:23.570Z',
      updatedAt: '2019-05-27T10:25:32.430Z',
      creator: {
        id: 992,
        fullName: 'Sylvia Mbugua'
      }
    }
  },
  response: {
    data: {
      success: true,
      message: 'Hotel estimate updated successfully',
      hotelEstimate: {
        id: 54,
        amount: '15',
        countryId: null,
        regionId: 1001,
        createdBy: 992,
        deletedAt: null,
        createdAt: '2019-05-27T06:54:03.366Z',
        updatedAt: '2019-05-27T06:59:19.662Z',
        creator: {
          id: 992,
          fullName: 'Sylvia Mbugua'
        }
      }
    }
  },
  action: {
    estimateId: 5,
    payload: {
      estimate: 15
    }
  },
  validationError: {
    response: {
      success: false,
      message: 'Validation failed',
      data: {
        errors: [
          {
            message: 'amount is required and must be a positive number',
            name: 'estimate'
          }
        ]
      }
    }
  }
};

export default mockData;

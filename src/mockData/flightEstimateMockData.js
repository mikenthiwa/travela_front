const mockData = {
  flightEstimates: [
    {
      id: 1,
      originRegion: null,
      destinationRegion: null,
      originCountry: 'Kenya',
      destinationCountry: 'Nigeria',
      createdBy: '2190',
      amount: 150,
      creator: {
        fullName: 'Peace Acio',
        id: 43
      }
    },
    {
      id: 2,
      originRegion: null,
      destinationRegion: null,
      originCountry: 'France',
      destinationCountry: 'Germany',
      createdBy: '2190',
      amount: 100,
      creator: {
        fullName: 'Peace Acio',
        id: 43
      }
    },
    {
      id: 3,
      originRegion: null,
      destinationRegion: null,
      originCountry: 'Uganda',
      destinationCountry: 'Rwanda',
      createdBy: '2190',
      amount: 300,
      creator: {
        fullName: 'Peace Acio',
        id: 43
      }
    }
  ],

  selectedEstimate: {
    success: true,
    flightEstimate: {
      id: 9,
      originRegion: null,
      destinationRegion: null,
      originCountry: 'Nigeria',
      destinationCountry: 'Uganda',
      createdBy: '2190',
      amount: 200,
      deletedAt: null,
      createdAt: '2019-06-07T12:27:39.116Z',
      updatedAt: '2019-06-07T12:46:16.464Z'
    }
  },

  newEstimate: {
    success: true,
    flightEstimate: {
      id: 9,
      originRegion: null,
      destinationRegion: null,
      originCountry: 'Nigeria',
      destinationCountry: 'Uganda',
      createdBy: '2190',
      amount: 200,
      deletedAt: null,
      createdAt: '2019-06-07T12:27:39.116Z',
      updatedAt: '2019-06-07T12:46:16.464Z'
    }
  },

  updatedEstimate: {
    isSaving: false,
    data: {
      id: 9,
      originRegion: null,
      destinationRegion: null,
      originCountry: 'Nigeria',
      destinationCountry: 'Uganda',
      createdBy: '2190',
      amount: 200,
      deletedAt: null,
      createdAt: '2019-06-07T12:27:39.116Z',
      updatedAt: '2019-06-07T12:46:16.464Z'
    }
  },

  flightEstimate: {
    id: 9,
    originRegion: null,
    destinationRegion: null,
    originCountry: 'Nigeria',
    destinationCountry: 'Uganda',
    createdBy: '2190',
    amount: 200,
    deletedAt: null,
    createdAt: '2019-06-07T12:27:39.116Z',
    updatedAt: '2019-06-07T12:46:16.464Z'
  },

  response: {
    data: {
      success: true,
      message: 'Flight Estimate Successfully updated',
      flightEstimate: {
        id: 10,
        originRegion: null,
        destinationRegion: null,
        originCountry: 'Nigeria',
        destinationCountry: 'Uganda',
        createdBy: '2190',
        amount: 50,
        deletedAt: null,
        createdAt: '2019-06-07T12:27:39.116Z',
        updatedAt: '2019-06-07T12:46:16.464Z'
      }
    }
  },
  action: {
    estimateId: 7,
    payload: {
      flightEstimate: 50
    }
  },
  validationError: {
    response: {
      success: false,
      message: 'Validation failed',
      data: {
        errors: 'Possible network error, please reload the page'
      }
    }
  }
};

export default mockData;

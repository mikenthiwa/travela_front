const mockData = {
    estimates: [
      {
        id: 1,
        amount: 1000,
        createdBy: {
          id: 591,
          name: 'Andrew Hinga'
        },
        region: 'East Africa',
        regionId: 1001
      },
      {
        id: 3,
        amount: 550,
        createdBy: {
          id: 591,
          name: 'Andrew Hinga'
        },
        region: 'UK',
        regionId: 1
      }
    ],

    selectedEstimate: {
      id: 29,
      amount: 500,
      creator: { fullName: 'Andrew Hinga', id: 1 },
      country: 'Uganda'
    },

    action: {
      estimateId: 5,
      payload: {
        estimate: 30000
      }
    },

    response: {
      data: {
        success: true,
        message: 'Successfully created a new hotel estimate',
        estimate: {
          id: 3,
          amount: 550,
          regionId: 1,
          countryId: null,
          createdBy: {
            name: 'Andrew Hinga',
            id: 591
          },
          updatedAt: '2019-05-27T10:23:28.151Z',
          createdAt: '2019-05-27T10:23:28.151Z',
          deletedAt: null,
          location: 'UK'
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
              message: 'estimate has not been provided',
              name: 'estimate'
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
              message: 'estimate has not been provided'
            }
          ]
        }
      }
    }
  };

  export default mockData;
  
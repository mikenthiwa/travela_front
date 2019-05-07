
import RequestUtils from '../RequestUtils';

const trips = [
  {
    bedId: 3,
    departureDate: '2019-02-19',
    destination: 'Nairobi,Kenya',
    origin: 'Lagos, Nigeria',
    returnDate: '2019-02-28'
  },
  {
    bedId: 3,
    departureDate: '2019-02-28',
    destination: 'Kampala,Uganda',
    origin: 'Nairobi, Kenya',
    returnDate: '2019-03-28'
  },
];

const trips2 = [
  {
    bedId: 3,
    departureDate: '2019-02-19',
    destination: 'Nairobi, Kenya',
    origin: 'Lagos, Nigeria',
    returnDate: '2019-02-28'
  }
];

const checklistItems = [
  {
    destinationName: 'Kampala, Uganda',
    checklist: [
      {
        id: 'yuVpBVtjr',
        name: 'Kampala Passport',
        requiresFiles: false,
        destinationName: 'Kampala, Uganda',
        deleteReason: null,
        resources: []
      },
      {
        id: 'b3klCohox',
        name: 'Kigali Visa',
        requiresFiles: false,
        destinationName: 'Kampala, Uganda',
        deleteReason: null,
        resources: []
      },
      {
        id: 2,
        name: 'Travel Ticket Details',
        requiresFiles: false,
        destinationName: 'Default',
        deleteReason: null,
        resources: [
          {
            id: '1',
            label: 'Flight Application Guide',
            link: 'https://docs.google.com/document/d/17vOCjPE3sgG2OSYV_3ZcpzCg1IbD7dCO8cVa8aBDN_M/edit?usp=drivesdk',
            checklistItemId: '2'
          }
        ]
      },
      {
        id: '1',
        name: 'Travel Ticket',
        requiresFiles: true,
        destinationName: 'Default',
        deleteReason: null,
        resources: []
      }
    ]
  }
];

const checklistItems2 = [
  {
    destinationName: 'Default',
    checklist: [
      {
        id: 2,
        name: 'Travel Ticket Details',
        requiresFiles: false,
        destinationName: 'Default',
        deleteReason: null,
        resources: [
          {
            id: '1',
            label: 'Flight Application Guide',
            link: 'https://docs.google.com/document/d/17vOCjPE3sgG2OSYV_3ZcpzCg1IbD7dCO8cVa8aBDN_M/edit?usp=drivesdk',
            checklistItemId: '2'
          }
        ]
      },
      {
        id: '1',
        name: 'Travel Ticket',
        requiresFiles: true,
        destinationName: 'Default',
        deleteReason: null,
        resources: []
      }
    ]
  }
];

const travelChecklistItems = [
  {
    destinationName: 'Kampala, Uganda',
    checklist: [
      {
        id: 'yuVpBVtjr',
        name: 'Kampala Passport',
        requiresFiles: false,
        destinationName: 'Kampala, Uganda',
        deleteReason: null,
        resources: []
      },
      {
        id: 'b3klCohox',
        name: 'Kigali Visa',
        requiresFiles: false,
        destinationName: 'Kampala, Uganda',
        deleteReason: null,
        resources: []
      },
      {
        id: 2,
        name: 'Travel Ticket Details',
        requiresFiles: false,
        destinationName: 'Default',
        deleteReason: null,
        resources: [
          {
            id: '1',
            label: 'Flight Application Guide',
            link: 'https://docs.google.com/document/d/17vOCjPE3sgG2OSYV_3ZcpzCg1IbD7dCO8cVa8aBDN_M/edit?usp=drivesdk',
            checklistItemId: '2'
          }
        ]
      },
      {
        id: '1',
        name: 'Travel Ticket',
        requiresFiles: true,
        destinationName: 'Default',
        deleteReason: null,
        resources: []
      }
    ]
  },
    {
      destinationName: 'Nairobi, Kenya',
      checklist: [
        {
          id: 'yuVpBVtjr',
          name: 'Nairobi Passport',
          requiresFiles: false,
          destinationName: 'Nairobi, Kenya',
          deleteReason: null,
          resources: []
        },
        {
          id: 'b3klCohox',
          name: 'Nairobi Visa',
          requiresFiles: false,
          destinationName: 'Nairobi, Kenyaa',
          deleteReason: null,
          resources: []
        },
        {
          id: 2,
          name: 'Travel Ticket Details',
          requiresFiles: false,
          destinationName: 'Default',
          deleteReason: null,
          resources: [
            {
              id: '1',
              label: 'Flight Application Guide',
              link: 'https://docs.google.com/document/d/17vOCjPE3sgG2OSYV_3ZcpzCg1IbD7dCO8cVa8aBDN_M/edit?usp=drivesdk',
              checklistItemId: '2'
            }
          ]
        },
        {
          id: '1',
          name: 'Travel Ticket',
          requiresFiles: true,
          destinationName: 'Default',
          deleteReason: null,
          resources: []
        }
      ]
    }
]

const nonAndelanCenterTrip = {
  bedId: 3,
  departureDate: '2019-03-29',
  destination: 'London,UK',
  origin: 'Kampala, Uganda',
};

const stipends = [
  {
    'id': 1,
    'amount': 100,
    'creator': {
      'fullName': 'Victor Ugwueze',
      'id': 1
    },
    'center': {
      'location': 'Nigeria'
    }
  },
  {
    'id': 2,
    'amount': 100,
    'creator': {
      'fullName': 'Victor Ugwueze',
      'id': 1
    },
    'center': {
      'location': 'Kenya'
    }
  },
  {
    'id': 3,
    'amount': 100,
    'creator': {
      'fullName': 'Ugwueze',
      'id': 1
    },
    'center': {
      'location':'Uganda',
    }
  }
];


describe('Request Travel Stipend', () => {

  it('should return difference between two dates in days', () => {
    const trip = trips[0];
    const days = RequestUtils.calculateDuration(trip);
    expect(days).toBe(9);
  });

  it('should return 1 duration trip for one way trip', () => {
    const trip = trips[0];
    const duration = RequestUtils.calculateDuration(trip, 'oneWay');
    expect(duration).toBe(1);
  });

  it('should return stipend with center for a single trip', () => {
    const trip = trips[0];
    const stipend = RequestUtils.calculateSingleStipend(trip, stipends);
    expect(stipend).toMatchObject(
      [
        {
          'centerExists': true,
          'dailyRate': 100,
          'duration': 9,
          'location': 'Kenya',
          'subTotal': 900
        }
      ]
    );
  });

  it('should return center and stipend', () => {
    const stipend = RequestUtils.stipendData(stipends);
    expect(stipend).toMatchObject(
      [
        {
          location: 'Nigeria',
          amount: 100
        },
        {
          location: 'Kenya',
          amount: 100
        },
        {
          location: 'Uganda',
          amount: 100
        }
      ]
    );
  });

  it('should return stipend for all trips', () => {
    const stipend = RequestUtils.getAllTripsStipend(trips, stipends);
    const expected  = {
      stipendSubTotals: [
        {
          centerExists: true,
          dailyRate: 100,
          'duration': 9,
          'location': 'Kenya',
          'subTotal': 900
        },
        {
          'centerExists': true,
          'dailyRate': 100,
          'duration': 1,
          'location': 'Uganda',
          'subTotal': 100}
      ],
      'totalStipend': '$ 1000'
    };
    expect(stipend).toMatchObject(expected);
  });

  it('should return 0 stipend for trips to Non-Andelan centers', () => {
    const updatedTrip = [
      ...trips,
      nonAndelanCenterTrip,
    ];
    const stipend = RequestUtils.getAllTripsStipend(updatedTrip, stipends);
    const expected  = {
      stipendSubTotals: [
        {
          'centerExists': true,
          'dailyRate': 100,
          'duration': 9,
          'location': 'Kenya',
          'subTotal': 900
        },
        {
          'centerExists': true,
          'dailyRate': 100,
          'duration': 28,
          'location': 'Uganda',
          'subTotal': 2800
        },
        {
          'centerExists': false,
          'dailyRate': 'N/A',
          'duration': 1,
          'location': 'UK',
          'subTotal': 0
        }
      ],
      'totalStipend': '$ 3700'
    };
    expect(stipend).toMatchObject(expected);
  });
});


describe('Request Travel Checklist', () => {
  it('should return default checklist items', () => {
    const newItems = checklistItems;
    const newChecklist = RequestUtils.getDefaultChecklist(
      checklistItems,
      trips
    );
    const expected = {
      destinationName: 'Nairobi, Kenya',
      checklist: [
        {
          id: 2,
          name: 'Travel Ticket Details',
          requiresFiles: false,
          destinationName: 'Default',
          deleteReason: null,
          resources: [
            {
              id: '1',
              label: 'Flight Application Guide',
              link:
                  'https://docs.google.com/document/d/17vOCjPE3sgG2OSYV_3ZcpzCg1IbD7dCO8cVa8aBDN_M/edit?usp=drivesdk',
              checklistItemId: '2'
            }
          ]
        },
        {
          id: '1',
          name: 'Travel Ticket',
          requiresFiles: true,
          destinationName: 'Default',
          deleteReason: null,
          resources: []
        }
      ]
    };
    newItems.push(expected);
    expect(newChecklist).toMatchObject(newItems);
  });

  it('should return default checklist items', () => {
    const newItems2 = checklistItems2;
    const newChecklist = RequestUtils.getDefaultChecklist(
      checklistItems2,
      trips2
    );

    const expected = {
      destinationName: 'Kenya',
      checklist: [
        {
          id: 2,
          name: 'Travel Ticket Details',
          requiresFiles: false,
          destinationName: 'Default',
          deleteReason: null,
          resources: [
            {
              id: '1',
              label: 'Flight Application Guide',
              link:
                  'https://docs.google.com/document/d/17vOCjPE3sgG2OSYV_3ZcpzCg1IbD7dCO8cVa8aBDN_M/edit?usp=drivesdk',
              checklistItemId: '2'
            }
          ]
        },
        {
          id: '1',
          name: 'Travel Ticket',
          requiresFiles: true,
          destinationName: 'Default',
          deleteReason: null,
          resources: []
        }
      ]
    };
    newItems2.push(expected);
    expect(newChecklist).toMatchObject(newItems2);
  });
});

describe('formatLocation', ()=> {
  it('should return Nairobi(NBO) if Nairobi is passed to it', ()=>{
    const  Nairobi = RequestUtils.formatLocation('Nairobi');
    expect(Nairobi).toBe('Nairobi(NBO)');
  });

  it('should return Lagos(LOS)if Lagos is passed to it', ()=>{
    const  Lagos = RequestUtils.formatLocation('Lagos');
    expect(Lagos).toBe('Lagos(LOS)');
  });

  it('should return Kampala(KLA) if Kampala is passed to it', ()=>{
    const  Kampala = RequestUtils.formatLocation('Kampala');
    expect(Kampala).toBe('Kampala(KLA)');
  });
  it('should return Kigali(KGL) if Kigali is passed to it', ()=>{
    const  Kigali = RequestUtils.formatLocation('Kigali');
    expect(Kigali).toBe('Kigali(KGL)');
  });
  it('should return Congo if Congo is passed to it', ()=>{
    const  Kigali = RequestUtils.formatLocation('Congo');
    expect(Kigali).toBe('Congo');
  });

});

describe('removeLocationChecklist', ()=> {
  it('should remove users location checklistItems' , ()=>{
    const userData = {
      email: "sylvia.mbugua@andela.com",
      fullName: "Sylvia Mbugua",
      gender: "Female",
      id: 4,
      location: "Kampala, Uganda"
      }

    const  response = RequestUtils.removeLocationChecklist(travelChecklistItems, userData);
    expect(response[0].destinationName).toBe('Kampala, Uganda');
    expect(response[0].checklist.length).toBe(1);
  });
});

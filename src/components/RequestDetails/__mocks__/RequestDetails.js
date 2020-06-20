export const request = {
  comments: [],
  createdAt: '2019-02-25T10:59:03.299Z',
  deletedAt: null,
  department: 'Fellowship-Programs',
  gender: 'Male',
  id: 'nXCj4U57J',
  manager: 'Christopher Akanmu',
  name: 'Christopher Akanmu',
  picture: 'https://lh3.googleusercontent.com/-0IiIxTNUkIY/AAAAAAAAAAI/AAAAAAAAAAc/bjqhX-Jagqc/photo.jpg?sz=50',
  role: 'Technical Team Lead',
  status: 'Open',
  tripType: 'oneWay',
  stipend: [
    { subTotal: 600, location: 'New York, United States', dailyRate: 300, duration: 2, centerExists: true },
    { subTotal: 1000, location: 'Nairobi, Kenya', dailyRate: 500, duration: 2, centerExists: true }
  ],
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
};

export const props = {
  fetchUserRequestDetails: jest.fn(),
  updateRequestStatus: jest.fn(),
  isLoading: true,
  renderButtons:  jest.fn(),
  renderRightPaneQuestion:  jest.fn(),
  approvalPage: true,
  headerTags: ['Managers Approval'],
  submissionInfo: { percentageCompleted: 0 },
  history: {
    push: jest.fn()
  },
  shouldOpen: false,
  openModal: jest.fn(),
  closeModal: jest.fn(),
  updateModification: jest.fn(),
  tripModification: {},
  requestId: 'nXCj4U57J',
  request,
  pathname: '/requests/my-approvals/requestId'
};

import React from 'react';
import { mount, shallow } from 'enzyme';
import moment from 'moment';
import { tripRequest } from '../../../mockData/checklistSubmissionMocks';
import FlightDetailsForm from '../CheckListItems/FlightDetails/FlightDetailsForm';
import FlightDetails from '../CheckListItems/FlightDetails/index';
import DateInput from '../../Forms/FormsAPI/Input/InputFields/Date';
import { isForInStatement } from 'typescript';

describe('Flight details tab', () => {
  let props = {
    checkId: 'aLvOR5JCk7-2',
    tripId: 'QbSyCm5XIF',
    checklist: {
      ticket: {
        deleteReason: null,
        destinationName: 'Default',
        id: '2',
        name: 'Travel Ticket',
        requiresFiles: true,
        resources: [],
        submissions: [
          {
            checklistItemId: '2',
            checklistSubmissions: { id: '2' },
            createdAt: '2019-06-19T14:33:09.307Z',
            deletedAt: null,
            documentId: null,
            id: 'WdrAZHV-j',
            tripId: 'QDYDpqEE-U',
            updatedAt: '2019-06-19T14:33:09.307Z',
            userResponse: null,
            userUpload: {
              fileName: 'ticket (1) (1).png',
              url:
                'https://res.cloudinary.com/authors-haven/image/upload/v1560954789/zt6ekgifcak8rsxuwzam.png'
            }
          }
        ]
      },
      ticketDetails: {
        deleteReason: null,
        destinationName: 'Default',
        id: '1',
        name: 'Travel Ticket Details',
        requiresFiles: false,
        resources: [
          {
            checklistItemId: '1',
            id: '1',
            label: 'Flight Application Guide',
            link:
              'https://docs.google.com/document/d/17vOCjPE3sgG2OSYV_3ZcpzCg1IbD7dCO8cVa8aBDN_M/edit?usp=drivesdk'
          }
        ],
        submissions: [
          {
            checklistItemId: '1',
            checklistSubmissions: { id: '1' },
            createdAt: '2019-06-19T14:32:42.556Z',
            deletedAt: null,
            documentId: null,
            id: 'kwgrc80D9',
            tripId: 'QDYDpqEE-U',
            updatedAt: '2019-06-20T09:14:38.907Z',
            userResponse: null,
            userUpload: {
              fileName: 'ticket (1) (1).png',
              url:
                'https://res.cloudinary.com/authors-haven/image/upload/v1560954789/zt6ekgifcak8rsxuwzam.png'
            }
          }
        ]
      }
    },
    request: { ...tripRequest },
    postSubmission: jest.fn(),
    tripType: 'return',
    uploadFile: jest.fn(),
    checkId: 'QbSyCm5XIF-1',
    downloadAttachments: jest.fn(),
    fileUploads: jest.fn(),
    trip: {
      accommodationType: 'Hotel Booking',
      bedId: null,
      beds: null,
      checkInDate: null,
      checkOutDate: null,
      checkStatus: 'Not Checked In',
      createdAt: '2019-06-17T14:07:53.243Z',
      deletedAt: null,
      departureDate: '2019-06-17',
      destination: 'Nairobi, Kenya',
      id: 'QDYDpqEE-U',
      lastNotifyDate: null,
      notificationCount: 0,
      origin: 'Kampala, Uganda',
      otherTravelReasons: 'visiting the embassy',
      reasons: null,
      requestId: 'bZzWv8GtE',
      returnDate: '2019-06-18',
      travelCompletion: 'false',
      travelReasons: null,
      updatedAt: '2019-06-17T14:07:53.243Z'
    }
  };

  const wrapper = mount(<FlightDetailsForm {...props} />);
  const instance = wrapper.instance();

  it('hits submitFlightDetails', () => {
    instance.setState({
      departureTime: '2019-07-08T12:00',
      arrivalTime: '2019-07-08T12:00',
      flightNumber: 'KQ 123',
      airline: 'Kenyan airlines',
      error: ''
    });
    instance.handleFlightDetailsSubmit();
  });

  it('submits partial ticket details', () => {
    instance.setState({
      departureTime: '2019-07-08T12:00',
      arrivalTime: '2019-07-08T12:00',
      flightNumber: 'KQ 123',
    });
    instance.handleFlightDetailsSubmit();
  });

  it('tries to submit with arrival time empty', () => {
    instance.setState({
      departureTime: '2019-07-08T12:00',
      arrivalTime: '',
      flightNumber: 'KQ 123',
    });
    instance.handleFlightDetailsSubmit();
  });

  it('tries to submit with arrival time less or eqaul empty', () => {
    instance.setState({
      departureTime: '2019-07-08T12:00',
      arrivalTime: '2019-07-08T12:00',
      flightNumber: 'KQ 123',
      returnArrivalTime: '2019-07-11T12:00',
      returnDepartureTime: '2019-07-11T12:00'
    });
    instance.handleFlightDetailsSubmit();
  });
  it('tries to submit with return arrival time less than return departure time', () => {
    instance.setState({
      departureTime: '2019-07-08T12:00',
      arrivalTime: '2019-07-08T2:00',
      flightNumber: 'KQ 123',
      returnArrivalTime: '2019-07-11T12:00',
      returnDepartureTime: '2019-07-11T12:00'
    });
    instance.handleFlightDetailsSubmit();
  });
  it('empty error keys', () => {
    instance.setState({
      departureTime: '2019-07-08T12:00',
      arrivalTime: '2019-07-08T2:00',
      flightNumber: 'KQ 123',
      returnArrivalTime: '2019-07-11T2:00',
      returnDepartureTime: '2019-07-11T12:00'
    });
    instance.handleFlightDetailsSubmit();
  });

  it('hits handleInputTextChange', () => {
    const event = {
      target: {
        name: '',
        value: ''
      }
    };
    instance.handleTextInputChange(event);
  });

  it('should call the handleDateInputChange', () => {
    const input = wrapper.find('DateInput[name="departureTime"]');
    input.value= moment('2019-07-08T12:00');
    const event = {
      target: {
        value: '2019-07-08T12:00',
        name: 'departureTime',
        type: 'datetime-local'
      }
    };
    instance.handleDateInputChange(moment('2019-07-08T12:00'), event);
  });

  it('should display a react date picker with option to select time', () => {
    wrapper.find('input[name="departureTime"]').simulate('click');
    const datePicker = wrapper.find('DateInput[name="departureTime"]');
    const timePicker = datePicker.find('Time');
    timePicker.at(0).prop('onChange')(moment('2019-07-08T12:00'));
    expect(timePicker.length).toEqual(1);
  });

  it('should hit onChangeRaw', () => {
    wrapper.find('input[name="departureTime"]').simulate('change', {target: {value: 'June 28, 2019 04:00 PM' }});
  });

});

describe('Flight Details', () => {
  let flightProps = {
    submissions: [
      {
        destinationName: 'Kenya',
        checklist: [
          {
            id: '2',
            name: 'Travel Ticket',
            requiresFiles: true,
            destinationName: 'Default',
            deleteReason: null,
            resources: [],
            submissions: [
              {
                id: 'WdrAZHV-j',
                userResponse: null,
                userUpload: {
                  url:
                    'https://res.cloudinary.com/authors-haven/image/upload/v1560954789/zt6ekgifcak8rsxuwzam.png',
                  fileName: 'ticket (1) (1).png'
                },
                tripId: 'QDYDpqEE-U',
                checklistItemId: '2',
                documentId: null,
                createdAt: '2019-06-19T14:33:09.307Z',
                updatedAt: '2019-06-19T14:33:09.307Z',
                deletedAt: null,
                checklistSubmissions: {
                  id: '2'
                }
              }
            ]
          },
          {
            id: '1',
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
                checklistItemId: '1'
              }
            ],
            submissions: [
              {
                id: 'kwgrc80D9',
                userResponse: null,
                userUpload: {},
                tripId: 'QDYDpqEE-U',
                checklistItemId: '1',
                documentId: null,
                createdAt: '2019-06-19T14:32:42.556Z',
                updatedAt: '2019-06-20T12:23:17.980Z',
                deletedAt: null,
                checklistSubmissions: {
                  id: '1'
                }
              }
            ]
          }
        ],
        tripId: 'QDYDpqEE-U',
        tripLocation: 'Nairobi, Kenya',
        tripOrigin: 'Uganda'
      }
    ],
    request: { ...tripRequest },
    uploadFile: jest.fn(),
    downloadAttachments: jest.fn(),
    fileUploads: jest.fn(),
    postSubmission: jest.fn(),
    tripType: 'return',
    trip: {
      accommodationType: 'Hotel Booking',
      bedId: null,
      beds: null,
      checkInDate: null,
      checkOutDate: null,
      checkStatus: 'Not Checked In',
      createdAt: '2019-06-17T14:07:53.243Z',
      deletedAt: null,
      departureDate: '2019-06-17',
      destination: 'Nairobi, Kenya',
      id: 'QDYDpqEE-U',
      lastNotifyDate: null,
      notificationCount: 0,
      origin: 'Kampala, Uganda',
      otherTravelReasons: 'visiting the embassy',
      reasons: null,
      requestId: 'bZzWv8GtE',
      returnDate: '2019-06-18',
      travelCompletion: 'false',
      travelReasons: null,
      updatedAt: '2019-06-17T14:07:53.243Z'
    }
  };

  it('matches snapshot', () => {
    const indexTree = shallow(<FlightDetails {...flightProps} />);
    expect(indexTree).toMatchSnapshot();
  });
});

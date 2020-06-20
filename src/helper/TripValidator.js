import * as yup from 'yup';

const tripValidator = (trip) => {
  let schema = {
    departureTime: yup.date().required('depature time is required'),
    arrivalTime: yup.date().required('arrival time is required'),
    flightNumber: yup.string().required('flight number is required'),
    airline: yup.string().required('airline is required'),
    ticket: yup.string().url().required()
  }; 

  if (trip.request.tripType === 'return') {
    schema = {
      ...schema,
      returnDepartureTime: yup.date().required('return depature time is required'),
      returnArrivalTime: yup.date().required('return arrival time is required'),
      returnFlightNumber: yup.string().required('retrun flight number is required'),
      returnAirline: yup.string().required('return airline is required'),
    };
  }

  return yup.object(schema);
};

export default tripValidator;

import {
  UPLOAD_FILE,
  UPLOAD_FILE_FAILURE,
  UPLOAD_FILE_SUCCESS
} from '../constants/actionTypes';

export const uploadFile = (file, { checklistItemId, tripId }, checkId, requestId)=> ({
  type: UPLOAD_FILE,
  file,
  submissionData: { checklistItemId, tripId },
  checkId,
  requestId
});

export const uploadFileSuccess = (
  {secure_url, firstFlightDate, returnFlightDate, flightTicketNumber, flightAirline },
  checkId) => ({
  type: UPLOAD_FILE_SUCCESS,
  cloudinaryUrl: secure_url,
  firstFlightDate,
  returnFlightDate,
  flightTicketNumber,
  flightAirline,
  checkId
});

export const uploadFileFailure = error => ({
  type: UPLOAD_FILE_FAILURE,
  error
});

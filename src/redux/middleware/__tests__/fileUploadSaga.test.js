import { call } from 'redux-saga/effects';
import toast from 'toastr';
import { expectSaga } from 'redux-saga-test-plan';
import { throwError } from 'redux-saga-test-plan/providers';
import * as  matchers from 'redux-saga-test-plan/matchers';
import { watchFileUpload } from '../fileUploadSaga';
import FileUploadAPI from '../../../services/FileUploadAPI';
import AccommodationAPI from '../../../services/AccommodationAPI';
import {
  UPLOAD_FILE, UPLOAD_FILE_FAILURE, UPLOAD_FILE_SUCCESS, POST_SUBMISSION
} from '../../constants/actionTypes';

describe('File Upload saga', () => {
  toast.error = jest.fn();
  AccommodationAPI.setToken = jest.fn();
  const uploadResponse = {
    data: {
      secure_url: 'image.com',
    }
  };
  const checkId = '345-1';
  const requestId = '65432';
  const checklistItemId = '1';
  const tripId = '345';
  const file = { name: 'test.png' };
  let firstFlightDate, returnFlightDate, flightTicketNumber, flightAirline;
  const data = {
    file, checkId, requestId,
    submissionData: { checklistItemId, tripId }
  };
  const data2 = {

  };

  it('successfully uploads file to cloudinary', () => {
    return expectSaga(watchFileUpload, FileUploadAPI)
      .provide([
        [matchers.call.fn(FileUploadAPI.uploadFile, file), uploadResponse]
      ]).put({
        type: POST_SUBMISSION,
        formData: { tripId, file: { url: 'image.com', fileName: file.name} },
        requestId,
        checklistItemId,
        checkId
      })
      .put({
        type: UPLOAD_FILE_SUCCESS,
        cloudinaryUrl: uploadResponse.data.secure_url,
        firstFlightDate,
        returnFlightDate,
        flightTicketNumber,
        flightAirline,
        checkId
      }).dispatch({
        type: UPLOAD_FILE,
        file: data.file,
        submissionData: data.submissionData,
        checkId: data.checkId,
        requestId: data.requestId
      }).silentRun();
  });

  it('fails to uploads file to cloudinary', () => {
    const error =  new Error('Server error, try again');
    error.response = { status: 500 };

    return expectSaga(watchFileUpload, FileUploadAPI)
      .provide([
        [matchers.call.fn(FileUploadAPI.uploadFile, file), throwError(error)]
      ]).put({
        type: UPLOAD_FILE_FAILURE,
        error: error.message
      }).dispatch({
        type: UPLOAD_FILE,
        file: data.file,
        submissionData: data.submissionData,
        checkId: data.checkId,
        requestId: data.requestId
      }).silentRun();
  });
});

import {
  UPLOAD_FILE,
  UPLOAD_FILE_FAILURE,
  UPLOAD_FILE_SUCCESS
} from '../../constants/actionTypes';

import {
  uploadFile,
  uploadFileSuccess,
  uploadFileFailure
} from '../fileUploadActions';

describe('Upload File Actions', () => {
  it('should return action type of UPLOAD_FILE', (done) => {
    const expectedAction = {
      type: UPLOAD_FILE,
      file: 'checklist.png',
      submissionData: { checklistItemId: '2', tripId: '33rr44' },
      checkId: '33rr44-2'
    };

    const action = uploadFile(
      'checklist.png', { checklistItemId: '2', tripId: '33rr44' }, '33rr44-2'
    );
    expect(action).toEqual(expectedAction);

    done();
  });

  it('should return action type of UPLOAD_FILE_SUCCESS', (done) => {
    const expectedAction = {
      type: UPLOAD_FILE_SUCCESS,
      cloudinaryUrl: 'image.cloudinary.com',
      checkId: '33rr44-2'
    };

    const action = uploadFileSuccess(
      { secure_url: 'image.cloudinary.com' }, '33rr44-2'
    );
    expect(action).toEqual(expectedAction);

    done();
  });

  it('should return action type of UPLOAD_FILE_FAILURE', (done) => {
    const expectedAction = {
      type: UPLOAD_FILE_FAILURE,
      error: 'Server error'
    };

    const action = uploadFileFailure('Server error');
    expect(action).toEqual(expectedAction);

    done();
  });
});

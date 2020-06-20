import fileUploadsReducer, { initialState } from '../fileUploads';
import {
  uploadFile,
  uploadFileSuccess,
  uploadFileFailure
} from '../../actionCreator/fileUploadActions';
import {
  postSubmission,
  postSubmissionSuccess,
  postSubmissionFailure
} from '../../actionCreator/checkListSubmissionActions';

describe('File Upload reducer', () => {
  it('should update `isUploading` state to 33rr44 while uploading file', (done) => {
    const action = uploadFile(
      'checklist.png', { checklistItemId: '2', tripId: '33rr44' }, '33rr44-2'
    );
    const newState = fileUploadsReducer(initialState, action);
    expect(newState.isUploading).toEqual('33rr44-2');
    done();
  });

  it('should update `isUploading` state to 33rr44 while posting file', (done) => {
    const action = postSubmission('', '33rr44-2');
    const newState = fileUploadsReducer(initialState, action);
    expect(newState.isUploading).toEqual('33rr44-2');
    done();
  });

  it('should add cloudinaryUrl to state on file post success', (done) => {
    const currentState = {
      ...initialState,
      isUploading: '33rr44-2'
    };

    const action = postSubmissionSuccess('', '33rr44-2');
      
    const newState = fileUploadsReducer(currentState, action);

    expect(newState.isUploading).toEqual('');
    expect(newState.uploadSuccess).toEqual('33rr44-2');
    done();
  });

  it('should add cloudinaryUrl to state on file upload success', (done) => {
    const currentState = {
      ...initialState,
      isUploading: '33rr44-2'
    };

    const action = uploadFileSuccess(
      { secure_url: 'image.cloudinary.com' }, '33rr44-2');
      
    const newState = fileUploadsReducer(currentState, action);

    expect(newState.isUploading).toEqual('');
    expect(newState.uploadSuccess).toEqual('33rr44-2');
    expect(newState.cloudinaryUrl).toEqual('image.cloudinary.com' );
    done();
  });

  it('should add error to state on unsuccessful file posting', (done) => {
    const currentState = {
      ...initialState,
      isUploading: '33rr44-2'
    };

    const error = 'Server Error';

    const action = uploadFileFailure(error);
    const newState = fileUploadsReducer(currentState, action);

    expect(newState.isUploading).toEqual('');
    expect(newState.uploadSuccess).toEqual('');
    expect(newState.cloudinaryUrl).toEqual('' );
    expect(newState.error).toEqual('Server Error');

    done();
  });

  it('should add error to state on unsuccessful upload', (done) => {
    const currentState = {
      ...initialState,
      isUploading: '33rr44-2'
    };

    const error = 'Server Error';

    const action = postSubmissionFailure(error);
    const newState = fileUploadsReducer(currentState, action);

    expect(newState.isUploading).toEqual('');
    expect(newState.uploadSuccess).toEqual('');

    done();
  });

  it('should return default state', (done) => {
    const newState = fileUploadsReducer(initialState, {});

    expect(newState).toMatchObject(initialState);
    done();
  });
});

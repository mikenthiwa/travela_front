import {
  FETCH_ATTACHMENTS,
  FETCH_ATTACHMENTS_SUCCESS,
  FETCH_ATTACHMENTS_FAILURE,
  DOWNLOAD_ATTACHMENTS,
  DOWNLOAD_ATTACHMENTS_SUCCESS,
  DOWNLOAD_ATTACHMENTS_FAILURE
} from '../constants/actionTypes';

export const fetchAttachments = query => {
  return {
    type: FETCH_ATTACHMENTS,
    query
  };
};

export const fetchAttachmentsSuccess = ({ submissions }) => ({
  type: FETCH_ATTACHMENTS_SUCCESS,
  payload: submissions
});

export const fetchAttachmentsFailure = error => ({
  type: FETCH_ATTACHMENTS_FAILURE,
  error
});

export const downloadAttachments = (url, name) => ({
  type: DOWNLOAD_ATTACHMENTS,
  url,
  name
});

export const downloadAttachmentsSuccess = response => ({
  type: DOWNLOAD_ATTACHMENTS_SUCCESS,
  response
});

export const downloadAttachmentsFailure = error => ({
  type: DOWNLOAD_ATTACHMENTS_FAILURE,
  error
});

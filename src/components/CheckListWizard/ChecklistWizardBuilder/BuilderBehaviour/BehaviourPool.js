import * as behaviourTypes from './behaviourActions';

const getBehaviours = (type, payload)  => {
  switch (type) {
  case behaviourTypes.UPLOAD_DOCUMENT:
    return { type };
  case behaviourTypes.SKIP_QUESTION:
    return { type, payload: payload || '' };
  case behaviourTypes.PREVIEW_DOCUMENT:
    return { type, payload: payload || '' };
  case behaviourTypes.NOTIFY_EMAIL:
    return { type, payload: payload || '' };
  default:
    return {};
  }
};
  
export default getBehaviours;

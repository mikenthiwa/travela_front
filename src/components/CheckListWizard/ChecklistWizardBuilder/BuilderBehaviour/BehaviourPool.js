import toast from 'toastr';

const getBehaviours = behaviour => {
  switch (behaviour.name) {
  case 'upload a document':
    return {
      name: 'upload a document',
      action: {
        type: 'UPLOAD_DOCUMENT'
      }
    };
  case 'skip to another question':
    if (!behaviour.payload.length) {
      toast.error('number must have a value');
    }
    return {
      name: 'skip to another question',
      action: {
        type: 'SKIP_QUESTION',
        payload: behaviour.payload
      }
    };
  case 'preview document':
    if (!behaviour.payload.length) {
      toast.error('url must be present');
    }
    return {
      name: 'preview document',
      action: {
        type: 'PREVIEW_DOCUMENT',
        payload: behaviour.payload
      }
    };
  case 'notify an email address':
    if (!behaviour.payload.length) {
      toast.error('email must be present');
    }
    return {
      name: 'notify an email address',
      action: {
        type: 'NOTIFY_EMAIL',
        payload: behaviour.payload
      }
    };
  default:
    return {
      name: 'no action'
    };
  }
};
  
export default getBehaviours;

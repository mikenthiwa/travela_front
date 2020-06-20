export default (requestData) => {
  if(requestData.status && requestData.status === 'Open') {
    return 'Manager Stage';
  } if (requestData.status && requestData.status === 'Approved') {
    return 'Travel Stage';
  } else if (requestData.status && requestData.status === 'Verified') {
    return 'Verified Stage';
  } 
  return '';
};

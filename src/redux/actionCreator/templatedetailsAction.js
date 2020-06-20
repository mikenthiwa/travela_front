import  {FETCH_TEMPLATE_DETAILS }
  from '../constants/actionTypes';

export const fetchTemplate = (id) => ({
  type: FETCH_TEMPLATE_DETAILS,
  id
});

export default fetchTemplate;
  

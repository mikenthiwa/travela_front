
import moment from 'moment';

const generateDynamicDate = (requestData, date) => {
  const returnDate = requestData && date ? moment(date).format('DD MMM YYYY') : 'N/A';
  return returnDate;
};

export default generateDynamicDate;


import moment from 'moment';

const generateDynamicTime = (date) => {
  // Validating date input before return https://momentjs.com/docs/#/parsing/special-formats/

  const validDate = moment(date, moment.ISO_8601).isValid();
  if(validDate){
    return moment(date).fromNow();
  }
};

export default generateDynamicTime;

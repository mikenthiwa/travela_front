export default (departureDate, returnDate) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  let returnArr, returnMonth;
  const departureArr = departureDate.split('-');
  if(returnDate) {
    returnArr = returnDate.split('-');
    returnMonth = months[returnArr[1]-1];
  }
  const departureMonth = months[departureArr[1]-1];
  if(!returnDate) {
    return `${departureArr[2]} ${departureMonth} ${departureArr[0]}`;
  }
  if(returnArr[0] === departureArr[0]) {
    return `${departureArr[2]} ${departureMonth} - ${returnArr[2]} ${returnMonth} ${returnArr[0]}`;
  }
  return `${departureArr[2]} ${departureMonth} ${departureArr[0]} - ${returnArr[2]} ${returnMonth} ${returnArr[0]}`;
};

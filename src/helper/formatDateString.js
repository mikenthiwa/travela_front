export default (date, status) =>  {
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const yy = date.getFullYear();
  const hh = date.getHours(); 
  const min = date.getMinutes() < 10 ? `0${date.getMinutes()}`: date.getMinutes();
  if (status)  return `${dd}-${mm}-${yy}`;    
  return `${dd}/${mm}/${yy}, ${hh}:${min}`;
};

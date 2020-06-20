export default tripType => {
  if (tripType === 'oneWay') {
    return 'One-way';
  }
  return tripType
    .charAt(0)
    .toUpperCase()
    .concat(tripType.toLowerCase().slice(1));
};

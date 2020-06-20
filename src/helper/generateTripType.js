export default (tripType) => {
  if (tripType === 'multi') return 'Multi-city Trip';
  if(tripType === 'oneWay') return 'One-way Trip';
  return 'Return Trip';
};

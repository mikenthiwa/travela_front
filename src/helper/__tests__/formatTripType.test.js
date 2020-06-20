import formatTripType from '../formatTripType';

test('it should return correctly formatted trip type', () => {
  const oneWayTrip = formatTripType('oneWay');
  const returnTrip = formatTripType('return');
  expect(oneWayTrip).toBe('One-way');
  expect(returnTrip).toBe('Return');
});

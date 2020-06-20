import getTripDuration from '../getTripDuration';

const trips = [{
  returnDate: '2019-03-29',
  departureDate: '2019-03-22',
}];

test('it should return 8 days', () => {
  const result = getTripDuration(trips);
  expect(result).toEqual('8 days');
});

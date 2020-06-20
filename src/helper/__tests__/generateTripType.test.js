import generateTripType from '../generateTripType';

describe('Test generateTripType() function', () => {
  it('should return Multi-city Trip', () => {
    expect(generateTripType('multi')).toEqual('Multi-city Trip');
  });

  it('should return One-way Trip', () => {
    expect(generateTripType('oneWay')).toEqual('One-way Trip');
  });

  it('should return Return Trip', () => {
    expect(generateTripType('anything else')).toEqual('Return Trip');
  });
});
